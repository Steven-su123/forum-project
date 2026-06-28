import { DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { error, success } from "@/utils/apiResponse";
import { GetUserToken } from "@/utils/getUserToken";
import { withApiHandler } from "@/utils/withApiHandler";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const GET = withApiHandler(async (request: NextRequest) => {
  const userId = GetUserToken(request);

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const users = db.collection("users");
  const user = await users.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    return Response.json(error("查無使用者"), { status: 401 });
  }

  return Response.json(success({ username: user.username }));
});
