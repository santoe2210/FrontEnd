"use client";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "./Chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const dateData = [
  {
    id: "0",
    academicYear: "2022",
    closureDate: "2022-1-16",
    finalClosureDate: "2022-5-20",
  },
  {
    id: "1",
    academicYear: "2023",
    closureDate: "2023-11-16",
    finalClosureDate: "2023-12-18",
  },
  {
    id: "2",
    academicYear: "2024",
    closureDate: "2024-1-16",
    finalClosureDate: "2024-3-11",
  },
  {
    id: "3",
    academicYear: "2025",
    closureDate: "2025-1-16",
    finalClosureDate: "2025-3-11",
  },
];

const MainDashboard = ({ lists, userLists }) => {
  const [year, setYear] = useState("2024");

  const yearlyContributions = lists?.contribution.filter(
    (x) => String(x.academicYear) === year
  );

  //unique faculties with count and contributor count
  const uniqueFaculties = Array.from(
    new Set(lists?.contribution.map((x) => x.faculty))
  );

  const newData = uniqueFaculties.map((faculty) => ({
    faculty,
    total: 0,
    totalContributor: new Set(),
  }));

  //add count and contributor count
  yearlyContributions.forEach((contribution) => {
    const index = newData.findIndex(
      (entry) => entry.faculty === contribution.faculty
    );

    if (index !== -1) {
      newData[index].total++;
      newData[index].totalContributor.add(contribution.user);
    }
  });
  newData.forEach((entry) => {
    entry.totalContributor = Array.from(entry.totalContributor).length;
  });

  // Filter data based on the selected academic year
  const filteredData = lists?.contribution.filter(
    (item) => String(item.academicYear) === year
  );

  // Calculate total contributions for each faculty for the selected academic year
  const facultyContributions = filteredData.reduce((acc, item) => {
    acc[item.faculty] = (acc[item.faculty] || 0) + 1;
    return acc;
  }, {});

  // Calculate total contributions for the selected academic year
  const totalContributions = Object.values(facultyContributions).reduce(
    (acc, value) => acc + value,
    0
  );

  // Calculate percentage contributions for each faculty for the selected academic year
  const data = Object.keys(facultyContributions).map((faculty) => ({
    faculty,
    percentage: (
      (facultyContributions[faculty] / totalContributions) *
      100
    ).toFixed(2),
  }));

  return (
    <div className="container py-5">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="w-[150px]">
          <Label>Academic Year</Label>
          <Select onValueChange={(year) => setYear(year)}>
            <SelectTrigger>
              <SelectValue placeholder={year} />
            </SelectTrigger>
            <SelectContent>
              {dateData.map((x) => (
                <SelectItem key={x.id} value={x.academicYear}>
                  {x.academicYear}{" "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Guest"
          value={userLists?.guest}
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Students"
          value={userLists?.student}
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Marketing Coordinator"
          value={userLists["marketing coordinator"]}
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Marketing Manager"
          value={userLists["marketing manager"]}
          info="20% more staff than last year"
          icon={faChartBar}
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <Chart
          title="Contributions"
          dataArray={newData}
          dataKeyX="faculty"
          dataKeyY="total"
          year={year}
        />
        <Chart
          title="Contributions Percentage"
          dataArray={data}
          dataKeyX="faculty"
          dataKeyY="percentage"
          year={year}
        />
        <Chart
          title="Contributors"
          dataArray={newData}
          dataKeyX="faculty"
          dataKeyY="totalContributor"
          year={year}
        />
        <Card className="">
          <CardHeader>
            <CardTitle>Most View Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-3">
              <p className="p2 font-bold">Name</p>
              <p className="p2 font-bold">Count</p>
            </div>
            <div className="overflow-y-scroll h-[350px]">
              {lists?.viewLists?.map((article) => (
                <div
                  key={article.id}
                  className="flex justify-between items-center py-3"
                >
                  <p>{article.article_title}</p>
                  <p>{article.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainDashboard;
