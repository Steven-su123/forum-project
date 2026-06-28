import { DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { success } from "@/utils/apiResponse";
import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb"; // 確保引入 ObjectId
import { GetUserToken } from "@/utils/getUserToken";

export const GET = withApiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const currentUserId = GetUserToken(request);
  const currentUserObjectId = currentUserId
    ? new ObjectId(currentUserId)
    : null;

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");


  const total = await collection.countDocuments();


  const posts = await collection
    .aggregate([
      { $sort: { createdAt: -1 } }, 
      { $skip: skip }, 
      { $limit: limitNum }, 


      {
        $lookup: {
          from: "comments", 
          localField: "_id", 
          foreignField: "postId",
          as: "comments", 
        },
      },

      {
        $lookup: {
          from: "userLikes", 
          localField: "_id",
          foreignField: "postId",
          as: "likes", 
        },
      },

      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          username: 1,

          comments: 1,

          likeCount: { $size: "$likes" },

          isLiked: {
            $cond: {
              if: { $eq: [currentUserObjectId, null] }, 
              then: false,
              else: {
                $in: [
                  currentUserObjectId, 
                  "$likes.userId",
                ],
              },
            },
          },
        },
      },
    ])
    .toArray();

  return Response.json(
    success({
      posts,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    }),
    { status: 200 },
  );
});
