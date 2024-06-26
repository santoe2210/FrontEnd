import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({ title, value, info, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <FontAwesomeIcon
          icon={icon}
          className="ml-auto h-4 w-4 opacity-50"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{info}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
