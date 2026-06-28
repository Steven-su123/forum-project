"use client";
import { useState } from "react";
import PostEdit from "./postEdit";

const postBtn = () => {
  const [open, setopen] = useState(false);

  return (
    <>
      <button
        onClick={() => setopen(true)}
        className="mb-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-white"
      >
        有什麼想說的嗎？
      </button>

      <PostEdit open={open} setopen={setopen} />
    </>
  );
};

export default postBtn;
