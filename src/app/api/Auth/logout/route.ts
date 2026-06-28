import { success } from "@/utils/apiResponse";
import { NextResponse } from "next/server";

export const POST = () => {
  const res = NextResponse.json(success("登出成功"));
  res.cookies.set("token", "", { maxAge: 0, path: "/" });

  return res;
};
