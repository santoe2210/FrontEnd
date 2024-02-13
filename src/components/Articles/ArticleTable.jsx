"use client";

import React, { useMemo } from "react";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";

import { useRouter } from "next/navigation";

import MakeTable from "../MakeTable";
import { Button } from "../ui/button";
import { deleteToken } from "@/app/utils/cookie";

export default function ArticleTable() {
  const loading = { show: true, error: "" };
  const router = useRouter();

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const ex = [
    {
      id: "m5gr84i9",
      article_name: "Example 1 test kdfjdof dl jdofjdo dfodfd9d df fdsf fd d",
      date: "12-2-2020",
      aritcle_type: "WOR",
      facility: "Faculty of Engineering",
      comment: "",
      status: "Approved",
    },
    {
      id: "m5gr8429",
      article_name: "Example 2",
      date: "1-2-2023",
      aritcle_type: "WER",
      facility: "Faculty of Art",
      comment: "good job",
      status: "Approved",
    },
    {
      id: "m5ge8429",
      article_name: "Example 3",
      date: "12-5-2023",
      aritcle_type: "WER",
      facility: "Faculty of Science",
      comment: "",
      status: "",
    },
    {
      id: "m42ge8429",
      article_name: "Example 4",
      date: "12-2-2023",
      aritcle_type: "WAR",
      facility: "Faculty of Medicine",
      comment: "",
      status: "Approved",
    },
  ];

  const data = useMemo(() => ex || [], []);

  const cellInfo = (tableProps) => {
    const component = useMemo(
      () => (
        <div>
          <p className="text-md">
            {tableProps.row.original.status ? "Approved" : "Edit"}
          </p>
        </div>
      ),
      [tableProps]
    );

    return component;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        width: 164,
        maxWidth: 164,
        // Cell: (tableProps) => CellDate(tableProps),
      },
      {
        Header: "Article Name",
        accessor: "article_name",
        width: 164,
        maxWidth: 164,
        // Cell: (tableProps) => CellNameDate(tableProps),
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Article Type",
        accessor: "aritcle_type",
        width: 104,
        maxWidth: 104,
      },
      {
        Header: "Comment",
        accessor: "comment",
        filter: "equals",
        width: 84,
        maxWidth: 84,
        // Cell: (tableProps) => cellStatus(tableProps),
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        width: 170,
        maxWidth: 170,
        style: { whiteSpace: "unset" },
        Cell: (tableProps) => cellInfo(tableProps),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageSize: 2,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const propsToTable = {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
  };

  async function handleCookie() {
    await deleteToken();
    router.push("/login");
  }

  return (
    <>
      <div className="mb-8 mt-10">
        <p>hey</p>
        <Button onClick={handleCookie}>Delete Cookies</Button>
        <MakeTable loading={loading} propsToTable={propsToTable} />
      </div>
    </>
  );
}
