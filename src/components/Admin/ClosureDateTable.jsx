"use client";

import React, { useMemo } from "react";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";
import MakeTable from "../MakeTable";
import moment from "moment";

function ClosureDateTable() {
  const loading = { show: true, error: "" };

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
      id: "0",
      academicYear: "2022",
      closureDate: "2022-1-16",
      finalClosureDate: "2022-5-20",
    },
    {
      id: "1",
      academicYear: "2023",
      closureDate: "2023-11-16",
      finalClosureDate: "2023-12-18",
    },
    {
      id: "2",
      academicYear: "2024",
      closureDate: "2024-1-16",
      finalClosureDate: "2024-3-11",
    },
  ];

  const data = useMemo(() => DATA || [], []);

  const CellDate = (tableProps, x) => {
    let component;
    if (x === "closureDate") {
      component = useMemo(
        () => moment(tableProps.row.original.closureDate).format("DD MMM YYYY"),
        [tableProps]
      );
    } else if (x === "finalClosureDate") {
      component = useMemo(
        () =>
          moment(tableProps.row.original.finalClosureDate).format(
            "DD MMM YYYY"
          ),
        [tableProps]
      );
    }

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
  return (
    <>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default ClosureDateTable;
