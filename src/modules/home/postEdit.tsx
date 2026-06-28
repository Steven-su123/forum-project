"use client";

import { addPost } from "@/service/posts";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DiaProps {
  open: boolean;
  setopen: (open: boolean) => void;
}

const PostEdit = ({ open, setopen }: DiaProps) => {
  const router = useRouter();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const queryClient = useQueryClient();
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    settitle(e.target.value);

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setcontent(e.target.value);

  const { mutate: addPostMutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      setopen(false);
      settitle("");
      setcontent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("?page=1");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onAddPost = () => {
    if (isPending) return;
    if (!title || !content) {
      alert("請輸入標題與內容");
      return;
    }
    addPostMutate({ title, content });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setopen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="mb-6 text-2xl font-bold">
            有什麼想說的嗎？
          </DialogTitle>

          <div className="space-y-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="文章標題"
              type="text"
              value={title}
              onChange={onTitleChange}
            />

            <textarea
              className="min-h-[200px] w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="今天在想什麼呢？"
              value={content}
              onChange={onContentChange}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setopen(false)}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                取消
              </button>

              <button
                disabled={isPending}
                onClick={onAddPost}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                {isPending ? "發送中" : "發送"}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PostEdit;
