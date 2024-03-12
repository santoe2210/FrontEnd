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
const contributionData = [
  { id: 1, academicYear: "2022", faculty: "Medicine" },
  { id: 2, academicYear: "2022", faculty: "Engineering" },
  { id: 3, academicYear: "2022", faculty: "CS" },
  { id: 4, academicYear: "2022", faculty: "BS" },
  { id: 5, academicYear: "2022", faculty: "Electronics" },
  { id: 6, academicYear: "2022", faculty: "Computing" },
  { id: 7, academicYear: "2022", faculty: "Medicine" },
  { id: 8, academicYear: "2023", faculty: "Engineering" },
  { id: 9, academicYear: "2024", faculty: "CS" },
  { id: 10, academicYear: "2025", faculty: "BS" },
  { id: 11, academicYear: "2022", faculty: "Electronics" },
  { id: 12, academicYear: "2023", faculty: "Computing" },
  { id: 13, academicYear: "2022", faculty: "Medicine" },
  { id: 14, academicYear: "2023", faculty: "Engineering" },
  { id: 15, academicYear: "2024", faculty: "CS" },
  { id: 16, academicYear: "2025", faculty: "BS" },
  { id: 17, academicYear: "2022", faculty: "Electronics" },
  { id: 18, academicYear: "2023", faculty: "Computing" },
  { id: 1, academicYear: "2023", faculty: "Medicine" },
  { id: 2, academicYear: "2023", faculty: "Engineering" },
  { id: 3, academicYear: "2023", faculty: "CS" },
  { id: 4, academicYear: "2023", faculty: "BS" },
  { id: 5, academicYear: "2023", faculty: "Electronics" },
  { id: 6, academicYear: "2023", faculty: "Computing" },
  { id: 7, academicYear: "2023", faculty: "Medicine" },
  { id: 1, academicYear: "2024", faculty: "Medicine" },
  { id: 2, academicYear: "2024", faculty: "Engineering" },
  { id: 3, academicYear: "2024", faculty: "CS" },
  { id: 4, academicYear: "2024", faculty: "BS" },
  { id: 5, academicYear: "2024", faculty: "Electronics" },
  { id: 6, academicYear: "2024", faculty: "Computing" },
  { id: 7, academicYear: "2024", faculty: "Medicine" },
  { id: 1, academicYear: "2025", faculty: "Medicine" },
  { id: 2, academicYear: "2025", faculty: "Engineering" },
  { id: 3, academicYear: "2025", faculty: "CS" },
  { id: 4, academicYear: "2025", faculty: "BS" },
  { id: 5, academicYear: "2025", faculty: "Electronics" },
  { id: 6, academicYear: "2025", faculty: "Computing" },
  { id: 7, academicYear: "2025", faculty: "Medicine" },
];

const contributorData = [
  { id: 1, academicYear: "2022", faculty: "Medicine" },
  { id: 2, academicYear: "2022", faculty: "Engineering" },
  { id: 3, academicYear: "2022", faculty: "Engineering" },
  { id: 4, academicYear: "2022", faculty: "Engineering" },
  { id: 5, academicYear: "2022", faculty: "Electronics" },
  { id: 6, academicYear: "2022", faculty: "Computing" },
  { id: 7, academicYear: "2022", faculty: "Medicine" },
  { id: 8, academicYear: "2023", faculty: "Engineering" },
  { id: 9, academicYear: "2024", faculty: "CS" },
  { id: 10, academicYear: "2025", faculty: "BS" },
  { id: 11, academicYear: "2022", faculty: "Electronics" },
  { id: 12, academicYear: "2023", faculty: "Computing" },
  { id: 13, academicYear: "2022", faculty: "Medicine" },
  { id: 14, academicYear: "2023", faculty: "Engineering" },
  { id: 15, academicYear: "2024", faculty: "CS" },
  { id: 16, academicYear: "2025", faculty: "BS" },
  { id: 17, academicYear: "2022", faculty: "Electronics" },
  { id: 18, academicYear: "2023", faculty: "Computing" },
  { id: 1, academicYear: "2023", faculty: "Electronics" },
  { id: 2, academicYear: "2023", faculty: "Electronics" },
  { id: 3, academicYear: "2023", faculty: "CS" },
  { id: 4, academicYear: "2023", faculty: "BS" },
  { id: 5, academicYear: "2023", faculty: "Electronics" },
  { id: 6, academicYear: "2023", faculty: "Computing" },
  { id: 7, academicYear: "2023", faculty: "Medicine" },
  { id: 1, academicYear: "2024", faculty: "Medicine" },
  { id: 2, academicYear: "2024", faculty: "Electronics" },
  { id: 3, academicYear: "2024", faculty: "BS" },
  { id: 4, academicYear: "2024", faculty: "BS" },
  { id: 5, academicYear: "2024", faculty: "Electronics" },
  { id: 6, academicYear: "2024", faculty: "Computing" },
  { id: 7, academicYear: "2024", faculty: "Medicine" },
  { id: 1, academicYear: "2025", faculty: "Medicine" },
  { id: 2, academicYear: "2025", faculty: "Engineering" },
  { id: 3, academicYear: "2025", faculty: "Medicine" },
  { id: 4, academicYear: "2025", faculty: "BS" },
  { id: 5, academicYear: "2025", faculty: "Medicine" },
  { id: 6, academicYear: "2025", faculty: "Medicine" },
  { id: 7, academicYear: "2025", faculty: "Medicine" },
];

const AdminDashboard = () => {
  const [year, setYear] = useState("2024");
  // console.log(year);

  const yearlyContributions = contributionData.filter(
    (x) => x.academicYear === year
  );

  const yearlyContributors = contributorData.filter(
    (x) => x.academicYear === year
  );

  //unique faculties with count
  const uniqueFaculties = Array.from(
    new Set(contributionData.map((x) => x.faculty))
  );

  const newData = uniqueFaculties.map((faculty) => ({ faculty, total: 0 }));

  //unique faculties with count contributor
  const uniqueFacultiesContributors = Array.from(
    new Set(contributorData.map((x) => x.faculty))
  );

  const newDataContributor = uniqueFacultiesContributors.map((faculty) => ({
    faculty,
    total: 0,
  }));

  //add count
  yearlyContributions.forEach((contribution) => {
    const index = newData.findIndex(
      (entry) => entry.faculty === contribution.faculty
    );
    if (index !== -1) {
      newData[index].total++;
    }
  });

  yearlyContributors.forEach((contribution) => {
    const index = newDataContributor.findIndex(
      (entry) => entry.faculty === contribution.faculty
    );
    if (index !== -1) {
      newDataContributor[index].total++;
    }
  });

  // Filter data based on the selected academic year
  const filteredData = contributionData.filter(
    (item) => item.academicYear === year
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
          title="Total Staff"
          value="200"
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Students"
          value="100"
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Marketing Coordinator"
          value="50"
          info="20% more staff than last year"
          icon={faChartBar}
        />
        <DashboardCard
          title="Marketing Manager"
          value="50"
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
          dataArray={newDataContributor}
          dataKeyX="faculty"
          dataKeyY="total"
          year={year}
        />
        {/* <ClosureDateCard
          academicYear={year}
          closureDate={currentDateData[0].closureDate}
          finalClosureDate={currentDateData[0].finalClosureDate}
        /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
