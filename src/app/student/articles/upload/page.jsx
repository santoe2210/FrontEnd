"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import CheckField from "@/components/CheckField";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FileUploadField from "@/components/FileUploadField";
import callService from "@/app/utils/callService";

const FormSchema = z.object({
  articleName: z.string().min(1, { message: "Please give an aritcle a name." }),
  // article: z.string().min(1, { message: "Please upload an article." }),
  termsAggred: z.boolean().refine((value) => value === true, {
    message: "Please agree before uploading.",
  }),
});

const UplaodArticlePage = () => {
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhlZTMyMmVlMmY0ZTQ3YWEzYTE1YiIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzExOTc4NTQwLCJleHAiOjE3MTIxNTEzNDB9.CqpeiSCJrvCoSMwpz28X12q_rZO3Xu5OjuYKk5y2ix4";
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      articleName: "",
      articles: [],
      termsAggred: false,
    },
  });

  const { toast } = useToast();
  const onSubmit = async () => {
    const values = form.getValues();
    console.log(values, values.articles);
    const response = await callService(
      "POST",
      `${process.env.API_URL}/file/uploadFile`,
      {
        title: values.articleName,
        files: values.articles,
        termsAgreed: true,
      },

      {
        Authorization: `Bearer ${userToken}`,
      }
    );
    if (response.status === 201) {
      router.back();
    }
    //POST
    // const error = new Error();
    // if (error) {
    //   toast({
    //     variant: "destructive",
    //     title: `Error submitting article!`,
    //     action: <ToastAction altText="OK">OK</ToastAction>,
    //   });
    // } else {
    //   toast({
    //     title: `Article submitted!`,
    //     action: <ToastAction altText="OK">OK</ToastAction>,
    //   });
    //   console.log(values);
    //   router.push("/student/articles");
    // }
  };

  return (
    <>
      <div className="h-[60px] bg-white w-full px-5 py-5 p3">
        <Link
          href="/student/articles"
          className="hover:text-info hover:underline transition"
          passHref
        >
          Articles
        </Link>{" "}
        &gt; <span className="font-bold">Upload</span>{" "}
      </div>
      <div className="max-w-[600px] mx-auto my-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              label="Article Name"
              name="articleName"
              form={form}
              placeholder="Article Name"
            />
            <FileUploadField
              label="Article"
              name="articles"
              form={form}
              placeholder="Article"
              type="file"
            />
            <CheckField
              name="termsAggred"
              form={form}
              label="Please accept the terms before uploading the article."
              className="mt-6"
            />
            <Button className="mt-8 w-full" type="submit">
              {isEditing ? "Update" : "Submit"}{" "}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UplaodArticlePage;
