"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import SelectField from "@/components/SelectField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField";
import { userRoles } from "@/app/utils/constant";
import { reformatListFaculty, reformatListYear } from "@/app/utils/common";
import callService from "@/app/utils/callService";
import { useDataContext } from "@/app/context/ContextProvider";

const FormSchema = z.object({
  role: z.string().min(1, { message: "Please select role." }),
  academicYear: z.string().min(1, { message: "This field is reqiured." }),
  faculty: z.string().min(1, { message: "Please select faculty" }),
  name: z.string().trim().min(1, { message: "This field is required." }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password should not exceed 32 characters." })
    .regex(/[A-Z]/, { message: "One uppercase character is required." })
    .regex(/[a-z]/, { message: "One lowercase character is required." })
    .regex(/[0-9]/, { message: "One number is required." })
    .regex(/[^A-Za-z0-9]/, {
      message: "One special character is required.",
    })
    .regex(/^[~`!@#$%^&*()_+=[\]\\{}|;':",.<>?a-zA-Z0-9-]+$/, {
      message: "Password must be English letters.",
    }),
});

function AddUserForm() {
  const { facultyLists, academicYearLists } = useDataContext();

  const [apiLoading, setApiLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: "",
      academicYear: "",
      faculty: "",
      name: "",
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values) => {
    setApiLoading(true);
    const jsonData = {
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
      faculty: values.faculty,
      academicYear: values.academicYear,
      termsAgreed: true,
    };

    const response = await callService(
      "POST",
      `${process.env.API_URL}/register/`,
      jsonData,
      null
    );

    if (response.status === 201) {
      router.back();
    } else if (response.status === 400) {
      setErrMsg("Email is already registered.");
    }
    setApiLoading(false);

    toast({
      title: `New ${values.role} account created!`,
      description: `Username : ${values.name}`,
      action: <ToastAction altText="OK">OK</ToastAction>,
    });
  };
  const renderCheckValidatePassword = (values, validate) => {
    const regexMinMax = /^.{8,32}$/g;
    const regexDigit = /(?=.*?[0-9])/g;
    const regexUpper = /(?=.*?[A-Z])/g;
    const regexLower = /(?=.*?[a-z])/g;
    const regexSpecialCharacter = /[^A-Za-z0-9]/g;
    // check password not blank
    if (validate === "One number" && regexDigit.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check min-max
    if (validate === "8-32 characters" && regexMinMax.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check at least one uppercase
    if (validate === "One uppercase character" && regexUpper.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check at least one lowercase
    if (validate === "One lowercase character" && regexLower.test(values)) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    // check one special characters
    if (
      validate === "One special character" &&
      regexSpecialCharacter.test(values)
    ) {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />
      );
    }
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-gray-300" />;
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectField label="Role" name="role" form={form} data={userRoles} />
        <SelectField
          label="Academic Year"
          name="academicYear"
          form={form}
          data={reformatListYear(academicYearLists?.year)}
        />
        <SelectField
          label="Faculty"
          name="faculty"
          form={form}
          data={reformatListFaculty(facultyLists?.faculty)}
        />
        <InputField
          label="Username"
          name="name"
          form={form}
          placeholder="username"
        />
        <InputField
          label="Email"
          name="email"
          form={form}
          placeholder="abc@gmail.com"
        />
        <InputField
          label="Password"
          name="password"
          form={form}
          type="password"
          placeholder="xxxx"
        />
        <div className="mt-4 md:grid md:grid-cols-2">
          <div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "8-32 characters"
              )}
              <p className="ml-3 inline p3">8-32 characters</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One uppercase character"
              )}
              <p className="ml-3 inline p3">One uppercase character</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One lowercase character"
              )}
              <p className="ml-3 inline p3">One lowercase character</p>
            </div>
          </div>
          <div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One number"
              )}
              <p className="ml-3 inline p3">One number</p>
            </div>
            <div className="mb-1">
              {renderCheckValidatePassword(
                form.getValues("password"),
                "One special character"
              )}
              <p className="ml-3 inline p3">One special character</p>
            </div>
          </div>
        </div>

        <Button disabled={apiLoading} type="submit" className="w-full mt-4">
          {apiLoading ? "Please wait" : "Submit"}
        </Button>
        <p className="text-center text-[12px] text-negative mt-2">
          {errMsg && errMsg}
        </p>
      </form>
    </Form>
  );
}

export default AddUserForm;
