import AuthButton from "@/component/authButton";
import PostBtn from "./postBtn";
import PostList from "./postList";
const Content = () => {
  return (
    <>
      <header className="flex justify-end p-6">
        <AuthButton />
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <PostBtn />
        <PostList />
      </main>
    </>
  );
};

export default Content;
