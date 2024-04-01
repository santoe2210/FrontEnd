"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import MakeTable from "../MakeTable";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useDataContext } from "@/app/context/ContextProvider";

function ClosureDateTable({ oriData }) {
  const { academicYearLists } = useDataContext();
  const loading = { show: true, error: "" };
  const [dropdownFilter, setDropdownFilter] = useState("All");
  const [filters] = useState(["academicYear"]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const data = oriData;

  const CellDate = (tableProps, x) => {
    const component = useMemo(
      () =>
        moment(
          x === "closureDate"
            ? tableProps.row.original.closureDate
            : tableProps.row.original.finalClosureDate
        ).format("DD MMM YYYY"),
      [tableProps]
    );

    return component;
  };
  const COLUMNS = [
    {
      Header: "Academic Year",
      accessor: "academicYear",
      width: 124,
      maxWidth: 124,
    },
    {
      Header: "Closure Date",
      accessor: "closureDate",
      width: 164,
      maxWidth: 164,
      Cell: (tableProps) => CellDate(tableProps, "closureDate"),
    },
    {
      Header: "Final Closure Date",
      accessor: "finalClosureDate",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDate(tableProps, "finalClosureDate"),
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
    setFilter,
    preGlobalFilteredRows,
    previousPage,
    setPageSize,

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      globalFilter: ourGlobalFilterFunction,
      initialState: {
        sortBy: [
          {
            id: "date",
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

  const dropdownOptions = useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      options.add(row.values.academicYear);
    });
    return ["All", ...options.values()];
  }, [preGlobalFilteredRows]);

  const handleFilterDropdown = useCallback((value) => {
    if (value === "All") {
      setFilter("academicYear", undefined);
      setDropdownFilter("All");
    } else {
      setFilter("academicYear", value || undefined);
      setDropdownFilter(value);
    }
  }, []);

  return (
    <>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="p3 font-bold mb-1">Academic Year</p>
          <Select value={dropdownFilter} onValueChange={handleFilterDropdown}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dropdownOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Link href="/admin/closure-date/set-closure-date">
            <Button>Set Closure Date</Button>
          </Link>
        </div>
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default ClosureDateTable;
