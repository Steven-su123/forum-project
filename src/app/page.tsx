import Content from "@/modules/home/content";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense>
      <Content></Content>;
    </Suspense>
  );
}
