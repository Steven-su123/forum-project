export const toggleLike = async (postId: string) => {
  const response = await fetch("/api/toggleLike/add", {
    method: "POST",
    body: JSON.stringify({ postId }),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData.data;
};
