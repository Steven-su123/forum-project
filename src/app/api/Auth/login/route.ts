import { DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { error, success } from "@/utils/apiResponse";
import { withApiHandler } from "@/utils/withApiHandler";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { account, password } = body;

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collections = db.collection("users");
  const user = await collections.findOne({ account });
  if (!user) {
    return NextResponse.json(error("無此帳號"), { status: 400 });
  }
  if (user.password !== password) {
    return NextResponse.json(error("密碼輸入錯誤"), { status: 400 });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  const res = NextResponse.json(success("登入成功"), { status: 200 });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
});
