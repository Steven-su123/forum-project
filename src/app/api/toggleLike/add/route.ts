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
  const { postId } = body;
  if (!postId) {
    return Response.json(error("缺少postId"), { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const likes = db.collection("userLikes");
  const userLike = await likes.findOne({
    userId: new ObjectId(userId),
    postId: new ObjectId(postId),
  });
  if (userLike) {
    await likes.deleteOne({ _id: userLike._id });
    return Response.json(success({ liked: false }));
  }

  const result = await likes.insertOne({
    userId: new ObjectId(userId),
    postId: new ObjectId(postId),
    createdAt: new Date(),
  });
  return Response.json(success({ id: result.insertedId, liked: true }));
});
