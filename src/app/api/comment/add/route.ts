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
  const { postId, commentContent } = body;
  if (!postId || !ObjectId.isValid(postId)) {
    return Response.json(error("postId 錯誤"), { status: 400 });
  }
  if (!commentContent) {
    return Response.json(error("請輸入內容"), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const users = db.collection("users");
  const userDoc = await users.findOne({ _id: new ObjectId(userId) });
  if (!userDoc) {
    return Response.json(error("請先登入"), { status: 401 });
  }
  const comments = db.collection("comments");
  const result = await comments.insertOne({
    userId: new ObjectId(userId),
    postId: new ObjectId(postId),
    commentContent,
    createdAt: new Date(),
    username: userDoc.username,
  });
  return Response.json(success(result.insertedId));
});
