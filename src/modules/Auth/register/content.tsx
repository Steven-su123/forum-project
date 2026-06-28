"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "@/service/auth";
const Content = () => {
  const [username, setusername] = useState("");
  const [account, setaccount] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const router = useRouter();
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };

  const onChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setaccount(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };
  const onChangeComfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(e.target.value);
  };

  const { mutate: addUserContent, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      alert("註冊成功");
      router.push("/login");
    },
    onError: (error: Error) => alert(error.message),
  });

  const onAddUserContent = () => {
    if (isPending) return;
    if (!username || !account || !password || !confirmPassword) {
      alert("資料必填");
      return;
    }
    if (password !== confirmPassword) {
      alert("兩次密碼輸入不一致");
      return;
    }
    addUserContent({ username, account, password, confirmPassword });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">建立帳號</h1>

        <div className="space-y-4">
          <input
            value={username}
            type="text"
            placeholder="姓名"
            onChange={onChangeUsername}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          />

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

          <input
            value={confirmPassword}
            type="password"
            placeholder="確認密碼"
            onChange={onChangeComfirmPassword}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
          />

          <button
            className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.98]"
            onClick={onAddUserContent}
          >
            提交
          </button>

          <button
            className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.98]"
            onClick={() => router.push("/login")}
          >
            我已經有帳號
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
