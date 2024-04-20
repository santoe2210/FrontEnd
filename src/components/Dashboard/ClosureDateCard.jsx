import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

const ClosureDateCard = ({ academicYear, closureDate, finalClosureDate }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Academic Closure Date</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 p-6">
        <h1 className="text-lg font-medium leading-none">
          {`Academic Year`}
          <p className="text-sm text-muted-foreground">{academicYear}</p>
        </h1>
        <Separator className="my-3" />
        <h1 className="text-lg font-medium leading-none">
          {`Closure Date`}
          <p className="text-sm text-muted-foreground">{closureDate}</p>
        </h1>
        <Separator className="my-3" />
        <h1 className="text-lg font-medium leading-none">
          {`Final Closure Date`}
          <p className="text-sm text-muted-foreground">{finalClosureDate}</p>
        </h1>
        <Separator className="my-3" />
      </CardContent>
    </Card>
  );
};

export default ClosureDateCard;
