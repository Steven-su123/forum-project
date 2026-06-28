import { addComment } from "@/service/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface CommentItem {
  _id: string;
  commentContent: string;
  createdAt?: string; // 或是 number，根據你 comments 表存的格式
  username: string;
}
interface commentProps {
  postId: string;
  comments: CommentItem[];
}
const Comment = ({ postId, comments }: commentProps) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const [commentContent, setCommentContent] = useState("");
  const onCommentContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };
  const { mutate: addCommentMutate, isPending } = useMutation({
    mutationFn: addComment,
    onError: (error: Error) => alert(error.message),
    onSuccess: () => {
      setCommentContent("");
      queryClient.invalidateQueries({ queryKey: ["posts", currentPage] });
    },
  });
  const onAddComment = () => {
    if (isPending) return;
    if (!commentContent) {
      alert("請輸入內容");
      return;
    }
    addCommentMutate({ commentContent, postId });
  };
  return (
    <div className="mt-3 space-y-2">
      {/* 留言內容 */}
      {comments && comments.length > 0 ? (
        comments.map((item) => (
          // 🚀 修正 2：加深背景色，與網頁灰色大背景做出區隔
          <div key={item._id} className="   p-3 ">
            {/* 🚀 修正 3：提升文字對比度，username 改回深灰 (text-gray-700)，content 改成主要黑 (text-gray-900) */}
            <p className="text-xs font-semibold text-gray-700 pl-1">
              {item.username}
            </p>
            <p className="mt-1 text-sm text-gray-900 pl-1">
              {item.commentContent}
            </p>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-400 pl-1">尚無留言...</p>
      )}

      {/* 輸入區 */}
      <div className="mt-3 flex gap-2">
        <input
          onChange={onCommentContentChange}
          value={commentContent}
          type="text"
          placeholder="留下你的留言..."
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
        />

        <button
          disabled={isPending}
          onClick={onAddComment}
          className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          {isPending ? "傳送中..." : "送出"}
        </button>
      </div>
    </div>
  );
};

export default Comment;
