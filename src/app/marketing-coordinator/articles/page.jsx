import React from "react";
import Link from "next/link";
import ArticleTable from "@/components/MarketingCoordinator/ArticleTable";

function Articles() {
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/marketing-manager"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Marketing Coordinator
        </Link>{" "}
        &gt; <span className="font-bold">Articles</span>{" "}
      </div>
      <div className="py-9 px-12">
        <ArticleTable />
      </div>
    </>
  );
}

export default Articles;
