export const addPost = async (data: { title: string; content: string }) => {
  const response = await fetch("/api/post/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData.data;
};

export const getPostList = async (page: string) => {
  const response = await fetch(`/api/post/list?page=${page}&limit=10`);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData.data;
};
