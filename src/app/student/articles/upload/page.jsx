import { getToken } from "@/app/utils/cookie";
import ArticleUpload from "@/components/Student/ArticleUpload";
import Link from "next/link";
import React from "react";

const UplaodArticlePage = async () => {
  const token = await getToken();
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/student/articles"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Articles
        </Link>{" "}
        &gt; <span className="font-bold">Upload</span>{" "}
      </div>
      <div className="max-w-[600px] mx-auto my-12">
        <ArticleUpload userToken={token} />
      </div>
    </>
  );
};

export default UplaodArticlePage;
