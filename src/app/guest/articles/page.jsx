import ArticleTable from "@/components/Guest/ArticleTable";
import Link from "next/link";
import React from "react";

const GuestArticlePage = () => {
  return (
    <>
    <div className="h-[60px] bg-white w-full px-5 py-5 p3">
      <Link
        href="/guest"
        className="hover:text-info hover:underline transition"
        passHref
      >
        Guest
      </Link>{" "}
      &gt; <span className="font-bold">Articles</span>{" "}
    </div>
    <div className="py-9 px-12">
      <ArticleTable />
    </div>
  </>
  );
};

export default GuestArticlePage;
