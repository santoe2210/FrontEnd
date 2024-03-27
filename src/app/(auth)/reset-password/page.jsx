"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import { Form } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import callService from "@/app/utils/callService";

const formSchema = z
  .object({
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
    confirmpassword: z.string().min(1, { message: "This field is required." }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords does not match",
  });

const renderCheckValidatePassword = (values, validate) => {
  const regexMinMax = /^.{8,32}$/g;
  const regexDigit = /(?=.*?[0-9])/g;
  const regexUpper = /(?=.*?[A-Z])/g;
  const regexLower = /(?=.*?[a-z])/g;
  const regexSpecialCharacter = /[^A-Za-z0-9]/g;
  // check password not blank
  if (validate === "One number" && regexDigit.test(values)) {
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />;
  }
  // check min-max
  if (validate === "8-32 characters" && regexMinMax.test(values)) {
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />;
  }
  // check at least one uppercase
  if (validate === "One uppercase character" && regexUpper.test(values)) {
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />;
  }
  // check at least one lowercase
  if (validate === "One lowercase character" && regexLower.test(values)) {
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />;
  }
  // check one special characters
  if (
    validate === "One special character" &&
    regexSpecialCharacter.test(values)
  ) {
    return <FontAwesomeIcon icon={faCheck} className="text-sm text-positive" />;
  }
  return <FontAwesomeIcon icon={faCheck} className="text-sm text-gray-300" />;
};
function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchtk = searchParams.get("token");
  const searchid = searchParams.get("id");

  const handlePasswordSubmit = async (values) => {
    const response = await callService(
      "POST",
      `${process.env.API_URL}/user/${searchid}/forgot-password/${searchtk}`,
      { password: values.password },
      null
    );
    console.log(response);
    if (response.status === 201) {
      router.push("/login");
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });
  return (
    <div className="max-w-[600px] mx-auto">
      <h3 className="text-primary font-bold">Change Your Password</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordSubmit)}
          className="space-y-8 w-full "
        >
          <InputField
            label="New password"
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

          <InputField
            label="Confirm New Password"
            name="confirmpassword"
            form={form}
            type="password"
            placeholder="xxxx"
          />

          <Button disabled={apiLoading} type="submit" className="w-full mt-8">
            {apiLoading ? "Please wait" : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
