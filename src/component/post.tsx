interface PostProps {
  post?: Post;
}

const Post = ({ post }: PostProps) => {
  const {
    title = "--",
    username = "-",
    content = "-",
    createdAt = 0,
  } = post || {};

  return (
    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-lg font-semibold text-black">
          {username}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-black">
        {title}
      </h3>

      <p className="mt-3 text-base leading-7 text-gray-800">
        {content}
      </p>
    </div>
  );
};

export default Post;