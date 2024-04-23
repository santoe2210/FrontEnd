import React from "react";
import Link from "next/link";
import ArticleUpload from "@/components/Student/ArticleUpload";
import { getToken } from "@/app/utils/cookie";

const getArticleData = async (userToken, id) => {
  const res = await fetch(`${process.env.API_URL}/file/getFileViewer/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
};

async function ArticleEdit({ params }) {
  const token = await getToken();
  const articleId = params?.articleId;
  const artData = await getArticleData(token, articleId);

  return (
    <>
      <div className="h-[60px] smmx:h-auto bg-white w-full px-5 py-5 p3">
        <Link
          href="/student/articles"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Articles
        </Link>{" "}
        &gt;{" "}
        <Link
          href="/student/articles"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Update
        </Link>{" "}
        &gt; <span className="font-bold">{articleId}</span>{" "}
      </div>
      <div className="max-w-[600px] mx-auto mdmx:mx-4 my-12">
        <ArticleUpload userToken={token} data={artData?.updateData || []} />
      </div>
    </>
  );
}

export default ArticleEdit;
