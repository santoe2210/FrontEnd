"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import InputField from "@/components/InputField";
import CheckField from "@/components/CheckField";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams } from "next/navigation";
import FileUploadField from "@/components/FileUploadField";
import callService from "@/app/utils/callService";
import SelectField from "../SelectField";
import { useDataContext } from "@/app/context/ContextProvider";
import {
  checkAcademicPassed,
  getClouserDateDetail,
  reformatClouserDate,
} from "@/app/utils/common";

const FormSchema = z.object({
  articleName: z.string().min(1, { message: "Please give an aritcle a name." }),
  // article: z.array().min(1, { message: "Please upload an article." }),
  academicYear: z.string().min(1, { message: "This field is reqiured." }),
  termsAggred: z.boolean().refine((value) => value === true, {
    message: "Please agree before uploading.",
  }),
});

function ArticleUpload({ userToken, data = {} }) {
  const [apiLoading, setApiLoading] = useState(false);
  const params = useParams();
  const id = params.articleId;

  const { academicYearLists, date } = useDataContext();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      articleName: data?.data?.title || "",
      academicYear: data?.data?.chosenAcademicYear || "",
      articles: data?.data?.article
        ? [
            {
              name: data?.data?.article,
              nochange: true,
            },
          ]
        : [],
      termsAggred: false,
    },
  });

  const { toast } = useToast();
  const onSubmit = async () => {
    const values = form.getValues();

    const choseYear = getClouserDateDetail(date?.date, values.academicYear);
    const passAcademic = checkAcademicPassed(choseYear);
    if (passAcademic) {
      toast({
        variant: "destructive",
        title: `Error submitting article! The academic year is already passed.`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    setApiLoading(true);

    if (id) {
      const response = await callService(
        "POST",
        `${process.env.API_URL}/file/update/${id}/`,
        {
          chosenAcademicYear: values.academicYear,
          title: values.articleName,
          files:
            values.articles.length === 1 && values.articles[0]?.nochange
              ? []
              : values.articles,
          termsAgreed: true,
        },
        {
          Authorization: `Bearer ${userToken}`,
        }
      );
      if (response.status === 200) {
        router.push("/student/articles");
        router.refresh();
        toast({
          variant: "success",
          title: `Article updated!`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    } else {
      const response = await callService(
        "POST",
        `${process.env.API_URL}/file/uploadFile`,
        {
          chosenAcademicYear: values.academicYear,
          title: values.articleName,
          files: values.articles,
          termsAgreed: true,
        },
        {
          Authorization: `Bearer ${userToken}`,
        }
      );
      if (response.status === 201) {
        router.push("/student/articles");
        router.refresh();
        toast({
          variant: "success",
          title: `Article submitted!`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }
    }

    setApiLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectField
          label="Academic Year"
          name="academicYear"
          form={form}
          data={reformatClouserDate(date?.date, academicYearLists?.year)}
        />
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
        <Button className="mt-8 w-full" type="submit" disabled={apiLoading}>
          {apiLoading ? "Please wait" : <span>{id ? "Update" : "Submit"}</span>}{" "}
        </Button>
      </form>
    </Form>
  );
}

export default ArticleUpload;
