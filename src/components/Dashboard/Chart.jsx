"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function Chart({ title, dataArray, dataKeyX, dataKeyY }) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title} Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dataArray}>
            <XAxis
              dataKey={dataKeyX}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
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
