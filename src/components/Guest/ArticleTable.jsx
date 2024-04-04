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

const DATA = [
  {
    id: 1,
    title: "Solarbreeze",
    article: "Volutpat.avi",
    user: "Dulce Wrightham",
    academicYear: 2022,
    submittedDate: "1/22/2024",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 2,
    title: "Zoolab",
    article: "Pretium.xls",
    user: "Johanna Feild",
    academicYear: 2023,
    submittedDate: "7/5/2022",
    faculty: "Computing",
    status: "approved",
  },
  {
    id: 3,
    title: "Opela",
    article: "Nulla.avi",
    user: "Hansiain Castellanos",
    academicYear: 2025,
    submittedDate: "1/24/2023",
    faculty: "BS",
    status: "approved",
  },
  {
    id: 4,
    title: "Span",
    article: "BibendumMorbi.mov",
    user: "Chase Lovegrove",
    academicYear: 2023,
    submittedDate: "9/22/2022",
    faculty: "CS",
    status: "approved",
  },
  {
    id: 5,
    title: "Gembucket",
    article: "EleifendDonecUt.tiff",
    user: "Kurt Allum",
    academicYear: 2024,
    submittedDate: "4/10/2022",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 6,
    title: "Otcom",
    article: "Proin.xls",
    user: "Juli Slowcock",
    academicYear: 2022,
    submittedDate: "8/1/2023",
    faculty: "Computing",
    status: "approved",
  },
  {
    id: 7,
    title: "Treeflex",
    article: "Urna.mp3",
    user: "Ulrick Lansbury",
    academicYear: 2025,
    submittedDate: "12/5/2022",
    faculty: "BS",
    status: "approved",
  },
  {
    id: 8,
    title: "Cardguard",
    article: "AcNibh.xls",
    user: "Eryn Parkin",
    academicYear: 2024,
    submittedDate: "9/2/2022",
    faculty: "CS",
    status: "approved",
  },
  {
    id: 9,
    title: "Zathin",
    article: "InHacHabitasse.tiff",
    user: "Mac Bocock",
    academicYear: 2023,
    submittedDate: "4/30/2023",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 10,
    title: "Subin",
    article: "Dolor.mp3",
    user: "Trumaine Duding",
    academicYear: 2022,
    submittedDate: "3/9/2023",
    faculty: "Medicine",
    status: "approved",
  },
];

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
    width: 104,
    maxWidth: 104,
    Cell: (tableProps) => CellDate(tableProps),
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
  },
  {
    Header: "Article",
    accessor: "article",
    width: 124,
    maxWidth: 124,
    Cell: (tableProps) => CellArticle(tableProps),
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
  const [apiLoading, setApiLoading] = useState({ state: false, msg: "" });
  const [filters] = useState(["user", "title", "article"]);
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
            id: "submittedDate",
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
