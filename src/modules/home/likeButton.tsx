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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", currentPage] });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onToggleLike = () => {
    toggleLikeMutate(postId);
  };
  return (
    <div className="mt-4 flex items-center gap-2 text-sm">
      <button
        className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        disabled={isPending}
        onClick={onToggleLike}
      >
        {isLiked ? "❤️" : "🤍"} {likeCount}
      </button>

      <span className="rounded-md px-2 py-1 text-gray-500">💬</span>
    </div>
  );
};

export default LikeButton;
