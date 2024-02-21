"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import InputFieldCalendar from "@/components/InputFieldCalendar";
import SelectField from "@/components/SelectField";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FormSchema = z.object({
  closureDate: z.date({
    required_error: "Closure date is required.",
  }),
  finalClosureDate: z.date({
    required_error: "Final closure date is required.",
  }),
  academicYear: z.string().min(1, { message: "This field is reqiured." }),
});
const year = [
  { id: 0, name: "2024", value: "2024" },
  { id: 1, name: "2025", value: "2025" },
  { id: 2, name: "2026", value: "2026" },
  { id: 3, name: "2027", value: "2027" },
  { id: 4, name: "2028", value: "2028" },
];
const ClosureDatePage = () => {
  const [academicDates, setAcademicDates] = useState({
    academicYear: "",
    closureDate: "",
    finalClosureDate: "",
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  function onSubmit(data) {
    const { academicYear, closureDate, finalClosureDate } = data;
    if (
      Number(academicYear) > closureDate.getFullYear() ||
      Number(academicYear) > finalClosureDate.getFullYear() ||
      closureDate.getDate() >= finalClosureDate.getDate()
    ) {
      toast({
        title: "Error Setting Academic Closure Dates",
        description:
          "Closure date cannot be greater than final closure date and both dates' years must be greater than or equal to academic year.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    setAcademicDates((prevDates) => ({
      ...prevDates,
      academicYear: academicYear,
      closureDate: closureDate.toDateString(),
      finalClosureDate: finalClosureDate.toDateString(),
    }));
    toast({
      description: "Successfully set academic closure dates",
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
  }
  return (
    <div className="container flex items-center justify-between">
      <div className="flex-1 w-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mt-8">
              <div className="max-w-[200px]">
                <SelectField
                  label="Academic Year"
                  name="academicYear"
                  form={form}
                  data={year}
                />
              </div>
              <InputFieldCalendar
                form={form}
                name="closureDate"
                label="Closure Date"
                placeholder="Select a closure date"
                desc="Set closure date for aricle submission"
              />
              <InputFieldCalendar
                form={form}
                name="finalClosureDate"
                label="Final Closure Date"
                placeholder="Select a final closure date"
                desc="Set final closure date for aricle submission"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Separator orientation="vertical" className=" h-96 m-8" />
      <div className="flex-1 w-64">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Academic Year</h4>
          <p className="text-sm text-muted-foreground">
            {academicDates.academicYear !== ""
              ? academicDates.academicYear
              : "----"}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Closure Date</h4>
          <p className="text-sm text-muted-foreground">
            {academicDates.closureDate !== ""
              ? academicDates.closureDate
              : "----"}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">
            Final Closure Date
          </h4>
          <p className="text-sm text-muted-foreground">
            {academicDates.finalClosureDate !== ""
              ? academicDates.finalClosureDate
              : "----"}
          </p>
        </div>
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default ClosureDatePage;
