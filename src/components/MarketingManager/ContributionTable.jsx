"use client";

import React, { useState, useRef, useMemo } from "react";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MakeTable from "../MakeTable";
import moment from "moment";

function ContributionTable() {
  const loading = { show: true, error: "" };
  const [filterInput, setFilterInput] = useState("");
  const searchInputRef = useRef(null);

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
      faculty_type: "Faculty of Engineering",
      comment: "",
      status: "Approved",
    },
    {
      id: "m5gr8429",
      article_name: "Example 2",
      date: "1-2-2023",
      aritcle_type: "WER",
      faculty_type: "Faculty of Art",
      comment: "good job",
      status: "Approved",
    },
    {
      id: "m5ge8429",
      article_name: "Example 3",
      date: "12-5-2023",
      aritcle_type: "WER",
      faculty_type: "Faculty of Science",
      comment: "",
      status: "",
    },
    {
      id: "m42ge8429",
      article_name: "Example 4",
      date: "12-2-2023",
      aritcle_type: "WAR",
      faculty_type: "Faculty of Medicine",
      comment: "",
      status: "Approved",
    },
  ];

  const data = useMemo(() => ex || [], []);

  const CellDate = (tableProps) => {
    const component = useMemo(
      () => moment(tableProps.row.original.date).format("DD MMM YYYY HH:mm"),
      [tableProps]
    );

    return component;
  };

  const CellComment = (tableProps) => {
    const component = useMemo(
      () => (
        <p className="p3">
          {!tableProps.row.original.comment
            ? "-"
            : tableProps.row.original.comment}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const cellInfo = (tableProps) => {
    const component = useMemo(
      () => (
        <p className="p3">
          {tableProps.row.original.status ? "Approved" : "Edit"}
        </p>
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
        width: 124,
        maxWidth: 124,
        Cell: (tableProps) => CellDate(tableProps),
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
        Header: "Faculty Type",
        accessor: "faculty_type",
        width: 154,
        maxWidth: 154,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Comment",
        accessor: "comment",
        filter: "equals",
        width: 84,
        maxWidth: 84,
        Cell: (tableProps) => CellComment(tableProps),
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

  const handleOnSubmitInput = () => {};

  const handleFilterChange = (e) => {};

  return (
    <>
      <div className="pb-12 flex justify-between xlmx:flex-col">
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

          <Button>Export .CSV</Button>

          {/* {toDownloadCSV && (
            <CSVLink
              data={toDownloadCSV}
              filename="user-list.csv"
              ref={csvRef}
            />
          )} */}
        </form>
        {/* <div className="mr-8 w-40">
          <Select
            values={dropdownOptions}
            selectedValue={dropdownFilter}
            setSelectedValue={setDropdownFilter}
            label="User Status"
            setFilter={setFilter}
            callback={handleFilterDropdown}
          />
        </div> */}
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default ContributionTable;
