import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const GetUserToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    throw new Error("請先登入");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return payload.userId;
  } catch {
    throw new Error("token已失效,請重新登入");
  }
};
