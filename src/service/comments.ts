export const addComment = async (data: {
  postId: string;
  commentContent: string;
}) => {
  const response = await fetch("/api/comment/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData.data;
};
