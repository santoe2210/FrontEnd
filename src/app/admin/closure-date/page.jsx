import { getYearNumberFromID } from "@/app/utils/common";
import { getToken } from "@/app/utils/cookie";
import ClosureDateTable from "@/components/Admin/ClosureDateTable";
import Link from "next/link";
import React from "react";

async function getAcademicData(userToken) {
  const res = await fetch(`${process.env.API_URL}/dateSetting/dates`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

async function getAcademicYearLists(userToken) {
  const res = await fetch(
    `${process.env.API_URL}/academicYear/getAllacademicYear`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const token = await getToken();
  const academicData = await getAcademicData(token);
  const academicYerLists = await getAcademicYearLists(token);

  const newData = academicData?.date.map((item) => ({
    ...item,
    academicYear: getYearNumberFromID(
      academicYerLists?.year,
      item.academicYear
    ),
  }));

  if (!academicData) {
    return <p>There is no information.</p>;
  }

  return (
    <>
      {" "}
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt; <span className="font-bold">Academic Closure Dates</span>{" "}
      </div>
      <div className="py-9 px-12">
        <ClosureDateTable
          oriData={newData || {}}
          academicyearLists={academicYerLists?.year || []}
        />
      </div>
    </>
  );
};

export default page;
