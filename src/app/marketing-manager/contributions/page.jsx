import Link from "next/link";
import React from "react";
import ContributionTable from "@/components/MarketingManager/ContributionTable";
import { getToken } from "@/app/utils/cookie";
import { getFacultyFromID } from "@/app/utils/common";

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

async function getAllFaculty() {
  const res = await fetch(`${process.env.API_URL}/faculty/getAllFaculty`, {});

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

async function ContributionsLists() {
  const token = await getToken();
  const contributionLists = await getAllContribution(token);
  const facultyTypes = await getAllFaculty();

  const newData = contributionLists?.data?.map((item) => ({
    ...item,
    faculty: getFacultyFromID(facultyTypes?.faculty, item.faculty),
  }));

  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/marketing-manager"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Marketing Manager
        </Link>{" "}
        &gt; <span className="font-bold">Contributions</span>{" "}
      </div>
      <div className="py-9 px-12">
        <ContributionTable lists={newData || []} usrToken={token} />
      </div>
    </>
  );
}

export default ContributionsLists;
