"use client";
import { useQueryMe } from "@/hooks/useQueryMe";
import { userLogout } from "@/service/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const AuthButton = () => {
  const { data } = useQueryMe();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
  const router = useRouter();
  return data ? (
    <div className="flex flex-col items-end text-sm">
      <span className="font-medium">{data.username}</span>
      <button
        onClick={() => logout()}
        className="text-gray-500 hover:text-black"
      >
        登出
      </button>
    </div>
  ) : (
    <div className="flex gap-2">
      <button
        onClick={() => router.push("/login")}
        className="px-4 py-2 border rounded"
      >
        登入
      </button>
      <button
        onClick={() => router.push("/register")}
        className="px-4 py-2 bg-black text-white rounded"
      >
        註冊
      </button>
    </div>
  );
};

export default AuthButton;
