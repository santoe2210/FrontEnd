import React from "react";

import MainDashboard from "./MainDashboard";
import { getToken } from "@/app/utils/cookie";

async function getContributions(userToken) {
  const res = await fetch(
    `${process.env.API_URL}/overview/contributionOverview`,
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

async function getUserLists(userToken) {
  const res = await fetch(`${process.env.API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  return res.json();
}

const AdminDashboard = async () => {
  const token = getToken();
  const contributions = await getContributions(token);
  const userLists = await getUserLists(token);

  return <MainDashboard lists={contributions} userLists={userLists?.data} />;
};

export default AdminDashboard;
