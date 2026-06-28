"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginatopnProp {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginatopnProp) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          href={`?page=${index + 1}`}
          key={index}
          className={
            currentPage === `${index + 1}`
              ? "bg-gray text-white px-3 py-1 rounded"
              : "bg-white text-black border px-3 py-1 rounded hover:bg-gray-100"
          }
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
