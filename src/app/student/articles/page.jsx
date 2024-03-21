import ArticleTable from "@/components/Student/ArticleTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const StudentArticlesPage = () => {
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        {/* <Link
          href="/student"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Student
        </Link>{" "} */}
        &gt; <span className="font-bold">Articles</span>{" "}
      </div>

      <div className="py-9 px-12">
        <ArticleTable />
      </div>
    </>
  );
};

export default StudentArticlesPage;
