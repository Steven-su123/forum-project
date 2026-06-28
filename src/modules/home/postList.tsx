"use client";
import Post from "@/component/post";
import Pagination from "./pagination";
import { useQueryPostList } from "@/hooks/useQueryPostList";
import Comment from "./comment";
import LikeButton from "./likeButton";
const PostList = () => {
  const { data, isLoading, error } = useQueryPostList();
  const { posts = [], totalPages } = data || {};
  return (
    <div className="max-w-3xl mx-auto">
      {isLoading && <div>載入中..</div>}
      {error && <div>錯誤:{error.message}</div>}
      <div className="space-y-4">
        {posts.map((post: Post) => (
          <div key={post._id}>
            <Post post={post} />
            <LikeButton
              postId={post._id}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
            />
            <Comment postId={post._id} comments={post.comments} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PostList;
