import React from "react";
import Link from "next/link";
import ArticleTable from "@/components/MarketingCoordinator/ArticleTable";
import { getToken } from "@/app/utils/cookie";

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

async function Articles() {
  const token = await getToken();
  const contributionLists = await getAllContribution(token);

  // const academicData = await getAcademicData(token);
  // const academicYerLists = await getAcademicYearLists(token);
  return (
    <>
      <div className="h-[60px] smmx:h-auto bg-white w-full px-5 py-5 p3">
        <Link
          href="/marketing-manager"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Marketing Coordinator
        </Link>{" "}
        &gt; <span className="font-bold">Articles</span>{" "}
      </div>
      <div className="py-9 px-12 mdmax992:px-5">
        <ArticleTable lists={contributionLists?.data || []} usrToken={token} />
      </div>
    </>
  );
}

export default Articles;
