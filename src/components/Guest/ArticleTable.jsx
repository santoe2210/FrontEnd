"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
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
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDataContext } from "@/app/context/ContextProvider";
import { getClouserDateName } from "@/app/utils/common";

//filter faculty

const CellDate = (tableProps) => {
  const component = useMemo(
    () =>
      moment(tableProps.row.original.submittedDate).format("DD MMM YYYY HH:mm"),
    [tableProps]
  );

  return component;
};

const CellArticle = (tableProps) => {
  const component = useMemo(
    () => <p>{tableProps.row.original.article}</p>,
    [tableProps]
  );

  return component;
};

const CellComment = (tableProps) => {
  const component = useMemo(
    () => (
      <p className="p3">
        {!tableProps.row.original.comments
          ? "-"
          : tableProps.row.original.comments}
      </p>
    ),
    [tableProps]
  );

  return component;
};

const CellStatus = (tableProps) => {
  const component = useMemo(
    () => (
      <p>
        {tableProps.row.original.status === "approved" ? (
          <span className="text-positive">Approved</span>
        ) : (
          <span>Submitted</span>
        )}
      </p>
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

const CellInfo = (tableProps) => {
  const component = useMemo(
    () => (
      <div className="flex space-x-5">
        <Link href={`/guest/articles/${tableProps.row.original._id}`} passHref>
          <FontAwesomeIcon icon={faEye} className="text-info" />
        </Link>
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
    width: 95,
    maxWidth: 95,
    Cell: (tableProps) => CellDate(tableProps),
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Student Name",
    accessor: "documentOwner",
    width: 134,
    maxWidth: 134,
  },
  {
    Header: "Article Title",
    accessor: "title",
    width: 134,
    maxWidth: 134,
    style: { whiteSpace: "unset" },
  },
  {
    Header: "Article",
    accessor: "article",
    width: 124,
    maxWidth: 124,
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
    width: 134,
    maxWidth: 134,
    Cell: (tableProps) => CellComment(tableProps),
  },
  {
    Header: "Publish",
    accessor: "status",
    width: 104,
    maxWidth: 104,
    Cell: (tableProps) => CellStatus(tableProps),
  },
  {
    Header: "",
    accessor: "info",
    disableSortBy: true,
    width: 80,
    maxWidth: 80,
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
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
};

export default ArticleTable;
