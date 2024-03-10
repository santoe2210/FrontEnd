"use client";

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
import Link from "next/link";

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
const SetClosureDatePage = () => {
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
      Number(academicYear) !== closureYear ||
      Number(academicYear) !== finalClosureYear
    ) {
      return false;
    }

    // Check if closure date is greater than final closure date
    if (new Date(closureDate) > new Date(finalClosureDate)) {
      return false;
    }

    return true;
  }

  function onSubmit(data) {
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

    toast({
      variant: "success",
      description: "Successfully set academic closure dates",
      action: <ToastAction altText="OK">OK</ToastAction>,
    });

    router.push("/admin/closure-date");
  }
  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/admin"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Admin
        </Link>{" "}
        &gt;{" "}
        <Link
          href="/admin/closure-date"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Academic Closure Dates
        </Link>{" "}
        &gt; <span className="font-bold"> Set Closure Date</span>{" "}
      </div>
      <div className="py-9 px-12">
        <div className="max-w-[550px] mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mt-8">
                <SelectField
                  label="Academic Year"
                  name="academicYear"
                  form={form}
                  data={year}
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
      </div>
    </>
  );
};

export default SetClosureDatePage;
