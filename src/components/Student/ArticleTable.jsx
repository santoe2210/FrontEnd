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
import { Badge } from "../ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

const DATA = [
  {
    id: 1,
    title: "Solarbreeze",
    article: "Volutpat.avi",
    articleType: "DOC",
    comment: "excellent",
    user: "Phonemyat Khant",
    academicYear: 2022,
    submittedDate: "1/22/2024",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 2,
    title: "Zoolab",
    article: "Pretium.xls",
    articleType: "DOC",
    comment: "great job",
    user: "Phonemyat Khant",
    academicYear: 2023,
    submittedDate: "7/5/2022",
    faculty: "Computing",
    status: "approved",
  },
  {
    id: 3,
    title: "Opela",
    article: "Nulla.avi",
    articleType: "JPG",
    comment: "",
    user: "Phonemyat Khant",
    academicYear: 2025,
    submittedDate: "1/24/2023",
    faculty: "BS",
    status: "approved",
  },
  {
    id: 4,
    title: "Span",
    article: "BibendumMorbi.mov",
    articleType: "DOC",
    comment: "need to improve",
    user: "Phonemyat Khant",
    academicYear: 2023,
    submittedDate: "9/22/2022",
    faculty: "CS",
    status: "approved",
  },
  {
    id: 5,
    title: "Gembucket",
    article: "EleifendDonecUt.tiff",
    articleType: "DOC",
    comment: "please fix",
    user: "Phonemyat Khant",
    academicYear: 2024,
    submittedDate: "4/10/2022",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 6,
    title: "Otcom",
    article: "Proin.xls",
    articleType: "PNG",
    comment: "",
    user: "Phonemyat Khant",
    academicYear: 2022,
    submittedDate: "8/1/2023",
    faculty: "Computing",
    status: "approved",
  },
  {
    id: 7,
    title: "Treeflex",
    article: "Urna.mp3",
    articleType: "DOC",
    comment: "superb",
    user: "Phonemyat Khant",
    academicYear: 2025,
    submittedDate: "12/5/2022",
    faculty: "BS",
    status: "approved",
  },
  {
    id: 8,
    title: "Cardguard",
    article: "AcNibh.xls",
    articleType: "DOC",
    comment: "excellent",
    user: "Phonemyat Khant",
    academicYear: 2024,
    submittedDate: "9/2/2022",
    faculty: "CS",
    status: "approved",
  },
  {
    id: 9,
    title: "Zathin",
    article: "InHacHabitasse.tiff",
    articleType: "DOC",
    comment: "good work",
    user: "Phonemyat Khant",
    academicYear: 2023,
    submittedDate: "4/30/2023",
    faculty: "Medicine",
    status: "approved",
  },
  {
    id: 10,
    title: "Subin",
    article: "Dolor.mp3",
    articleType: "JPEG",
    comment: "",
    user: "Phonemyat Khant",
    academicYear: 2022,
    submittedDate: "3/9/2023",
    faculty: "Medicine",
    status: "pending",
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
const CellStatus = (tableProps) => {
  const status = tableProps.row.original.status;
  const listStatus = {
    approved: "text-positive",
    pending: "text-warning",
    draft: "text-disable",
  };

  const component = useMemo(
    () => (
      <div>
        <p className={listStatus[status]}>{status}</p>
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
        <Link href="/" passHref>
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <Link href="/" passHref>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
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

const COLUMNS = [
  {
    Header: "Date",
    accessor: "submittedDate",
    width: 104,
    maxWidth: 104,
    Cell: (tableProps) => CellDate(tableProps),
  },
  {
    Header: "Author",
    accessor: "user",
    width: 134,
    maxWidth: 134,
  },
  {
    Header: "Title",
    accessor: "title",
    width: 124,
    maxWidth: 124,
  },

  {
    Header: "Article",
    accessor: "article",
    disableSortBy: true,
    width: 134,
    maxWidth: 134,
    Cell: (tableProps) => CellArticle(tableProps),
  },
  {
    Header: "Comment",
    accessor: "comment",
    width: 134,
    maxWidth: 134,
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

const ArticleTable = () => {
  const [loading, setLoading] = useState({ show: true, error: "" });
  const [apiLoading, setApiLoading] = useState({ state: false, msg: "" });
  const [filters] = useState(["user", "title", "article"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

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
