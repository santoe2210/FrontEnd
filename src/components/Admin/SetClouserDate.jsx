"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import InputFieldCalendar from "@/components/InputFieldCalendar";
import SelectField from "@/components/SelectField";
import callService from "@/app/utils/callService";
import { getYearNumberFromID, reformatListYear } from "@/app/utils/common";

const FormSchema = z.object({
  closureDate: z.date({
    required_error: "Closure date is required.",
  }),
  finalClosureDate: z.date({
    required_error: "Final closure date is required.",
  }),
  academicYear: z.string().min(1, { message: "This field is reqiured." }),
});

function SetClouserDate({ year, userToken }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      academicYear: "",
      closureDate: "",
      finalClosureDate: "",
    },
  });
  const { toast } = useToast();

  function isValidClosureDate({ closureDate, finalClosureDate, academicYear }) {
    const closureYear = new Date(closureDate).getFullYear();
    const finalClosureYear = new Date(finalClosureDate).getFullYear();

    // Check if the academic year is equal to the closure date year or the final closure date year
    if (
      Number(getYearNumberFromID(year, academicYear)) !== closureYear ||
      Number(getYearNumberFromID(year, academicYear)) !== finalClosureYear
    ) {
      return false;
    }

    // Check if closure date is greater than final closure date
    if (new Date(closureDate) > new Date(finalClosureDate)) {
      return false;
    }

    return true;
  }

  async function onSubmit(data) {
    if (!isValidClosureDate(data)) {
      toast({
        title: "Error Setting Academic Closure Dates",
        variant: "destructive",
        description:
          "Closure date cannot be greater than final closure date and both dates' years must be greater than or equal to academic year.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }

    const response = await callService(
      "POST",
      `${process.env.API_URL}/dateSetting/createDateSetting`,
      {
        academicYear: data.academicYear,
        closureDate: data.closureDate,
        finalClosureDate: data.finalClosureDate,
      },
      {
        Authorization: `Bearer ${userToken}`,
      }
    );
    if (response.status === 201) {
      toast({
        variant: "success",
        description: "Successfully set academic closure dates",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });

      router.push("/admin/closure-date");
    }
  }

  return (
    <div className="max-w-[550px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-8">
            <SelectField
              label="Academic Year"
              name="academicYear"
              form={form}
              data={reformatListYear(year)}
            />
            <InputFieldCalendar
              form={form}
              name="closureDate"
              label="Closure Date"
              placeholder="Select a closure date"
              desc="Set closure date for aricle submission"
              maxDate={new Date("2030-12-31")}
            />
            <InputFieldCalendar
              form={form}
              name="finalClosureDate"
              label="Final Closure Date"
              placeholder="Select a final closure date"
              desc="Set final closure date for aricle submission"
              maxDate={new Date("2030-12-31")}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SetClouserDate;
