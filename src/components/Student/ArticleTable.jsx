"use client";

import React, { useCallback, useMemo, useState, useRef } from "react";
import Link from "next/link";
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import moment from "moment";
import MakeTable from "../MakeTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDataContext } from "@/app/context/ContextProvider";
import {
  checkAcademicPassed,
  getClouserDateDetail,
  getClouserDateName,
} from "@/app/utils/common";

//filter faculty

const CellDate = (tableProps) => {
  const component = useMemo(
    () => moment(tableProps.row.original.createdAt).format("DD MMM YYYY HH:mm"),
    [tableProps]
  );

  return component;
};
const CellStatus = (tableProps) => {
  const status = tableProps.row.original.status;
  const listStatus = {
    approved: "text-positive",
    pending: "text-warning",
    submitted: "text-warning",
    draft: "text-disable",
  };

  const component = useMemo(
    () => (
      <div>
        <p className={listStatus[status]}>
          {status[0].toUpperCase() + status.slice(1)}
        </p>
      </div>
    ),
    [tableProps]
  );

  return component;
};
const CellInfo = (tableProps) => {
  const { date } = useDataContext();
  const clouserdate = getClouserDateDetail(
    date?.date,
    tableProps.row.original?.chosenAcademicYear
  );
  const passed = checkAcademicPassed(clouserdate);
  const status = tableProps.row.original.status === "approved";
  const component = useMemo(
    () => (
      <div className="flex space-x-5">
        <Link
          href={`/student/articles/${tableProps.row.original._id}`}
          passHref
        >
          <FontAwesomeIcon icon={faEye} className="text-info" />
        </Link>
        {!status && !passed ? (
          <Link
            href={`/student/articles/edit/${tableProps.row.original._id}`}
            passHref
          >
            <FontAwesomeIcon icon={faEdit} className="text-info" />
          </Link>
        ) : (
          <FontAwesomeIcon icon={faEdit} className="text-gray-400 mt-1" />
        )}
      </div>
    ),
    [tableProps]
  );

  return component;
};

const CellArticle = (tableProps) => {
  const component = useMemo(
    () => (
      <div>
        <Link
          href={tableProps.row.original.article}
          className="text-info underline"
        >
          {tableProps.row.original.article}
        </Link>
      </div>
    ),
    [tableProps]
  );

  return component;
};

const CellAcademic = (tableProps) => {
  const { date } = useDataContext();
  const component = useMemo(
    () => (
      <div>
        <p>
          {getClouserDateName(
            date?.date,
            tableProps.row.original?.chosenAcademicYear
          ) || "-"}
        </p>
      </div>
    ),
    [tableProps]
  );

  return component;
};

const COLUMNS = [
  {
    Header: "Date",
    accessor: "createdAt",
    width: 94,
    maxWidth: 94,
    Cell: (tableProps) => CellDate(tableProps),
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Author",
    accessor: "documentOwner",
    width: 134,
    maxWidth: 134,
  },
  {
    Header: "Title",
    accessor: "title",
    width: 124,
    maxWidth: 124,
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Article",
    accessor: "article",
    disableSortBy: true,
    width: 134,
    maxWidth: 134,
    Cell: (tableProps) => CellArticle(tableProps),
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Academic Date",
    accessor: "chosenAcademicYear",
    disableSortBy: true,
    width: 134,
    maxWidth: 134,
    Cell: (tableProps) => CellAcademic(tableProps),
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Comment",
    accessor: "comments",
    width: 104,
    maxWidth: 104,
    disableSortBy: true,
  },
  {
    Header: "Status",
    accessor: "status",
    width: 94,
    maxWidth: 94,
    Cell: (tableProps) => CellStatus(tableProps),
  },
  {
    Header: "",
    disableSortBy: true,
    accessor: "info",
    width: 64,
    maxWidth: 64,
    Cell: (tableProps) => CellInfo(tableProps),
  },
];

const ArticleTable = ({ lists }) => {
  const [loading, setLoading] = useState({ show: true, error: "" });

  const [filters] = useState(["title", "documentOwner"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = lists;

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const handleOnSubmitInput = (e) => {
    e.preventDefault();

    const value = searchInputRef.current.value || "";

    setGlobalFilter(value);

    setFilterInput(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value || "";

    if (value === "") {
      setGlobalFilter(value);
      setSearchData([]);
    }

    setFilterInput(value);
  };

  const ourGlobalFilterFunction = useCallback(
    (rows, _, query) =>
      rows.filter((row) =>
        filters.find((columnName) => {
          console.log(columnName);
          if (
            row.values[columnName].toLowerCase().includes(query.toLowerCase())
          ) {
            return row;
          }

          return null;
        })
      ),
    [filters]
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
    setGlobalFilter,
    previousPage,
    setPageSize,

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: searchData.length > 0 ? searchData : data,

      defaultColumn,
      globalFilter: ourGlobalFilterFunction,
      initialState: {
        sortBy: [
          {
            id: "createdAt",
            desc: true,
          },
        ],
        pageSize: 10,
      },
    },
    useGlobalFilter,
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
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mb-8 flex justify-between items-end">
          <form
            noValidate
            onSubmit={handleOnSubmitInput}
            autoComplete="off"
            className="flex items-end xlmx:flex-col"
          >
            <div className="mt-1 mr-4 relative rounded-md">
              <label
                htmlFor="searchUser"
                className="block p2 font-bold text-gray-500"
              >
                Search
              </label>
              <Input
                type="text"
                name="searchUser"
                id="searchUser"
                value={filterInput}
                ref={searchInputRef}
                onChange={handleFilterChange}
                className="default-input min-w-[350px]"
                placeholder="Title, Author"
              />
            </div>
            <Button type="submit" className="mr-9">
              Search
            </Button>
          </form>
        </div>
        <div>
          <Link href="/student/articles/upload">
            <Button>Upload Article</Button>
          </Link>
        </div>
      </div>

      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
};

export default ArticleTable;
