import { getToken } from "@/app/utils/cookie";
import ArticleTable from "@/components/Guest/ArticleTable";
import Link from "next/link";
import React from "react";

async function getAllContribution(userToken) {
  const res = await fetch(`${process.env.API_URL}/file/getAllFiles`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const GuestArticlePage = async () => {
  const token = await getToken();
  const contributionLists = await getAllContribution(token);
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
      <div className="py-9 px-12 mdmax992:px-5">
        <ArticleTable lists={contributionLists?.data || []} />
      </div>
    </>
  );
};

export default GuestArticlePage;
