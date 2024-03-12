"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function Chart({ title, dataArray, dataKeyX, dataKeyY, year }) {
  const CustomLegend = () => {
    return (
      <div className="text-center">
        <p className="p3 font-bold">{year} Academic Year</p>
      </div>
    );
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title} Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={dataArray}
            margin={{
              left: -30,
            }}
          >
            <XAxis dataKey={dataKeyX} stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Legend content={<CustomLegend />} />

            <Bar
              dataKey={dataKeyY}
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
