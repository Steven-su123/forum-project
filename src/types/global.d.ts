interface Post {
  _id: string;
  username: string;
  title: string;
  content: string;
  createdAt: number;
  likeCount: number;
  isLiked: boolean;
  comments: CommentItem[];
}
