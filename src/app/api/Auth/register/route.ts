import { DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { error, success } from "@/utils/apiResponse";
import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { username, account, password, confirmPassword } = body;
  if (!username || !account || !password || !confirmPassword) {
    return Response.json(error("資料必填"), { status: 400 });
  }
  if (password !== confirmPassword) {
    return Response.json(error("兩次密碼輸入不一致"), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collections = db.collection("users");
  const user = await collections.findOne({ account });
  if (user) {
    return Response.json(error("帳號已存在"), { status: 400 });
  }
  const result = await collections.insertOne({
    username,
    account,
    password,
    createdAt: Date.now(),
  });
  return Response.json(success({ id: result.insertedId }), { status: 200 });
});
