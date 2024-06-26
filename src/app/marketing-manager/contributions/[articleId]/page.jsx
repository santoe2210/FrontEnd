import { getToken } from "@/app/utils/cookie";
import ArticleView from "@/components/Student/ArticleView";
import Link from "next/link";
import React from "react";

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

async function ArticleDetail({ params }) {
  const articleId = params?.articleId;
  const token = await getToken();
  const artData = await getArticleData(token, articleId);

  return (
    <>
      <div className="h-[60px] smmx:h-auto bg-white w-full px-5 py-5 p3">
        <Link
          href="/marketing-manager"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Marketing Manager
        </Link>{" "}
        &gt;{" "}
        <Link
          href="/marketing-manager/contributions"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Contributions
        </Link>{" "}
        &gt; <span className="font-bold">{articleId}</span>{" "}
      </div>
      <div className="py-9 px-12 mdmx:px-5">
        <ArticleView data={artData?.updateData || []} />
      </div>
    </>
  );
}

export default ArticleDetail;
