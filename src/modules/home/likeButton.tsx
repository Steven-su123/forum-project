import { toggleLike } from "@/service/toggleLike";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
interface LikeButtonProps {
  postId: string;
  likeCount: number;
  isLiked: boolean;
}

const LikeButton = ({ postId, likeCount, isLiked }: LikeButtonProps) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const queryClient = useQueryClient();
  const { mutate: toggleLikeMutate, isPending } = useMutation({
    mutationFn: toggleLike,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts", currentPage] });
      const previousPostData = queryClient.getQueryData(["posts", currentPage]);
      queryClient.setQueryData(["posts", currentPage], (old: any) => {
        if (!old || !old.posts) return old;
        return {
          ...old,
          posts: old.posts.map((post: any) => {
            if (post._id === postId) {
              return {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
              };
            }
            return post;
          }),
        };
      });
      return { previousPostData };
    },
    onError: (error: Error, _, context) => {
      if (context?.previousPostData) {
        queryClient.setQueryData(
          ["posts", currentPage],
          context.previousPostData,
        );
      }
      alert(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", currentPage] });
    },
  });

  const onToggleLike = () => {
    toggleLikeMutate(postId);
  };
  return (
    <div className="mt-4 flex items-center gap-2 text-sm">
      <button
        className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        onClick={onToggleLike}
      >
        {isLiked ? "❤️" : "🤍"} {likeCount}
      </button>

      <span className="rounded-md px-2 py-1 text-gray-500">💬</span>
    </div>
  );
};

export default LikeButton;
