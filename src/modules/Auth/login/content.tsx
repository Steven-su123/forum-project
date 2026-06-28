"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/service/auth";
const Content = () => {
  const [account, setaccount] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const onChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setaccount(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const { mutate: LoginUser, isPending } = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      alert("登入成功");
      router.push("/");
    },
    onError: (error: Error) => alert(error.message),
  });

  const OnLoginUser = () => {
    if (!account || !password) {
      alert("請輸入帳號密碼");
      return;
    }
    LoginUser({ account, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <Image
          src="/images/avatar.png"
          width={1584}
          height={396}
          alt="avatar"
        />
        <h1 className="mb-6 text-center text-2xl font-bold">登入</h1>

        <div className="space-y-4">
          <input
            value={account}
            type="text"
            placeholder="帳號"
            onChange={onChangeAccount}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          />

          <input
            value={password}
            type="password"
            placeholder="密碼"
            onChange={onChangePassword}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          />

          <button
            className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.98]"
            disabled={isPending}
            onClick={OnLoginUser}
          >
            {isPending ? "登入中" : "登入"}
          </button>

          <button
            className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.98]"
            onClick={() => router.push("/register")}
          >
            建立新帳號
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
