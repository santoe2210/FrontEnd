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
import MakeTable from "@/components/MakeTable";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFacultyFromID } from "@/app/utils/common";
import { useDataContext } from "@/app/context/ContextProvider";
import { cn } from "@/lib/utils";

function UserTable({ userData }) {
  const { facultyLists } = useDataContext();
  const loading = { show: true, error: "" };
  const [filters] = useState(["name", "email"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  console.log(userData);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const data = userData;

  const CellDate = (tableProps) => {
    const component = useMemo(
      () =>
        moment(tableProps.row.original.createdAt).format("DD MMM YYYY HH:mm"),
      [tableProps]
    );

    return component;
  };

  const CellFaculty = (tableProps) => {
    const facultydata = tableProps.row.original.faculty;
    const component = useMemo(
      () => <p>{getFacultyFromID(facultyLists?.faculty, facultydata)}</p>,
      [tableProps]
    );

    return component;
  };

  const CellVerified = (tableProps) => {
    const verify = tableProps.row.original.verified;
    const component = useMemo(
      () => (
        <p className={cn(verify ? "text-positive" : "text-warning")}>
          {verify ? "Verified" : "Not Verified"}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Joined Date",
      accessor: "createdAt",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDate(tableProps),
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Username",
      accessor: "name",
      width: 134,
      maxWidth: 134,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Email",
      accessor: "email",
      width: 124,
      maxWidth: 124,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Role",
      accessor: "role",
      width: 104,
      maxWidth: 104,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Faculty Type",
      accessor: "faculty",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellFaculty(tableProps),
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Status",
      accessor: "verified",
      width: 94,
      maxWidth: 94,
      Cell: (tableProps) => CellVerified(tableProps),
      style: { whiteSpace: "unset" },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const ourGlobalFilterFunction = useCallback(
    (rows, _, query) =>
      rows.filter((row) =>
        filters.find((columnName) => {
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
            id: "joined_date",
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

  return (
    <>
      <div className="mb-8 flex mdmx:flex-col justify-between items-end mdmx:items-start mdmx:space-y-5">
        <form
          noValidate
          onSubmit={handleOnSubmitInput}
          autoComplete="off"
          className="flex items-end"
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
              className="default-input min-w-[350px] smmx:min-w-[150px]"
              placeholder="Name, Email"
            />
          </div>
          <Button type="submit" className="mr-9 smmx:mr-0">
            Search
          </Button>
        </form>
        <div className="flex justify-end">
          <Link href="/admin/system-users/add-user">
            <Button>Add User</Button>
          </Link>
        </div>
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default UserTable;
