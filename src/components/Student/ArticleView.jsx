"use client";

import React from "react";
import FileViewer from "react-file-viewer";

function ArticleView({ data }) {
  return (
    <div className="bg-white p-10 mdmx:p-4 rounded-md">
      <h6 className="font-bold">Article Title</h6>
      <p className="p2-regular-16 mb-5">{data?.data?.title}</p>
      <h6 className="font-bold">Article Author</h6>
      <p className="p2-regular-16 mb-5">{data?.author}</p>
      <h6 className="font-bold">Article's Status</h6>
      <p className="p2-regular-16 mb-5">{data?.data?.status}</p>
      <h6 className="font-bold">Article's View</h6>

      {data?.data?.fileType?.includes("image") ? (
        <img
          src={data?.data?.fileBuffer}
          alt="article"
          className="w-full h-[500px] object-contain"
        />
      ) : (
        <FileViewer
          fileType={data?.data?.fileType?.includes("pdf") ? "pdf" : "docx"}
          filePath={data?.data?.fileBuffer}
        />
      )}
    </div>
  );
}

export default ArticleView;
