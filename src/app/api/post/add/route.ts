import { DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { error, success } from "@/utils/apiResponse";
import { GetUserToken } from "@/utils/getUserToken";
import { withApiHandler } from "@/utils/withApiHandler";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const POST = withApiHandler(async (request: NextRequest) => {
  const userId = GetUserToken(request);
  const body = await request.json();
  const { title, content } = body;
  if (!title || !content) {
    return Response.json(error("請輸入標題或內容"), { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const users = db.collection("users");
  const userDoc = await users.findOne({ _id: new ObjectId(userId) });

  if (!userDoc) {
    return Response.json(error("請先登入"), { status: 401 });
  }

  const posts = db.collection("posts");
  const result = await posts.insertOne({
    title,
    content,
    userId: userDoc._id,
    username: userDoc.username,
    createdAt: new Date(),
  });
  return Response.json(success(result.insertedId));
});
