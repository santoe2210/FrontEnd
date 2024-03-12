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

function UserTable() {
  const loading = { show: true, error: "" };
  const [filters] = useState(["username", "email"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const DATA = [
    {
      id: 0,
      joined_date: "12-2-2023",
      email: "test@gmail.com",
      username: "Tester 1",
      role: "Student",
      faculty_type: "Faculty of Engineering",
    },
    {
      id: 1,
      joined_date: "12-3-2023",
      email: "test1@gmail.com",
      username: "Tester 2",
      role: "Student",
      faculty_type: "Faculty of Engineering",
    },
    {
      id: 2,
      joined_date: "2-3-2023",
      email: "3@gmail.com",
      username: "Tester 3",
      role: "Marketing Manager",
      faculty_type: "Faculty of Engineering",
    },
    {
      id: 3,
      joined_date: "12-6-2023",
      email: "test4@gmail.com",
      username: "Tester 4",
      role: "Guest",
      faculty_type: "Faculty of Science",
    },
    {
      id: 4,
      joined_date: "1-3-2023",
      email: "test5@gmail.com",
      username: "Tester 5",
      role: "Guest",
      faculty_type: "Faculty of Medicine",
    },
    {
      id: 5,
      joined_date: "12-3-2023",
      email: "test6@gmail.com",
      username: "Tester 6",
      role: "Student",
      faculty_type: "Faculty of Engineering",
    },
  ];

  const data = useMemo(() => DATA || [], []);

  const CellDate = (tableProps) => {
    const component = useMemo(
      () =>
        moment(tableProps.row.original.joined_date).format("DD MMM YYYY HH:mm"),
      [tableProps]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Joined Date",
      accessor: "joined_date",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDate(tableProps),
    },
    {
      Header: "Username",
      accessor: "username",
      width: 134,
      maxWidth: 134,
    },
    {
      Header: "Email",
      accessor: "email",
      width: 124,
      maxWidth: 124,
    },
    {
      Header: "Role",
      accessor: "role",
      width: 104,
      maxWidth: 104,
    },
    {
      Header: "Faculty Type",
      accessor: "faculty_type",
      width: 104,
      maxWidth: 104,
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
              placeholder="Name, Email"
            />
          </div>
          <Button type="submit" className="mr-9">
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
