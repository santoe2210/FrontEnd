"use client";
/* eslint-disable */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from "react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MakeTable from "../MakeTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import Link from "next/link";
import { getClouserDateName, getFacultyFromID } from "@/app/utils/common";
import { useDataContext } from "@/app/context/ContextProvider";
import callService from "@/app/utils/callService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ContributionTable({ lists, usrToken }) {
  const { facultyLists } = useDataContext();
  const loading = { show: true, error: "" };
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState("All");
  const [filters] = useState(["title", "documentOwner"]);
  const searchInputRef = useRef(null);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const data = lists;
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <label>
          <input
            type="checkbox"
            className="default__check"
            ref={resolvedRef}
            {...rest}
          />
          <span className="custom__check" />
        </label>
      );
    }
  );

  function CustomCheckboxHeader(modifiedOnChange, checked, disabled) {
    const component = useMemo(() => (
      <div>
        <IndeterminateCheckbox
          onChange={modifiedOnChange}
          checked={checked}
          disabled={disabled}
        />
      </div>
    ));

    return component;
  }

  function CustomCheckboxCell(row) {
    useEffect(() => {
      if (row.original.status === "APR") {
        toggleRowSelected(row.id, true);
      }
    }, [row.original.status]);
    const component = useMemo(() => (
      <div>
        <IndeterminateCheckbox
          {...row.getToggleRowSelectedProps()}
          disabled={row.original.disabled || row.original.status === "APR"}
        />
      </div>
    ));

    return component;
  }

  const CellDate = (tableProps) => {
    const component = useMemo(
      () =>
        moment(tableProps.row.original.createdAt).format("DD MMM YYYY HH:mm"),
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

  const CellInfo = (tableProps) => {
    const component = useMemo(
      () => (
        <div className="flex space-x-2 items-center">
          <Link
            href={`/marketing-manager/contributions/${tableProps.row.original._id}`}
            passHref
          >
            <FontAwesomeIcon icon={faEye} className=" text-info mt-2" />
          </Link>
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
        accessor: "createdAt",
        width: 94,
        maxWidth: 94,
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
        // Cell: (tableProps) => CellNameDate(tableProps),
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Article",
        accessor: "article",
        width: 124,
        maxWidth: 124,
        Cell: (tableProps) => CellArticle(tableProps),
      },
      {
        Header: "Faculty Type",
        accessor: "faculty",
        width: 134,
        maxWidth: 134,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Comment",
        accessor: "comments",
        width: 134,
        maxWidth: 134,
        Cell: (tableProps) => CellComment(tableProps),
        style: { whiteSpace: "unset" },
      },
      {
        Header: "",
        accessor: "info",
        disableSortBy: true,
        width: 80,
        maxWidth: 80,
        Cell: (tableProps) => CellInfo(tableProps),
      },
    ],
    []
  );

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
    previousPage,
    setPageSize,
    setFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: searchData.length > 0 ? searchData : data,
      globalFilter: ourGlobalFilterFunction,
      defaultColumn,
      initialState: {
        pageSize: 10,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((_columns) => [
        {
          id: "selection",
          Header: ({
            toggleRowSelected: headertoggleRowSelected,
            isAllPageRowsSelected,
            page: headerpage,
          }) => {
            const modifiedOnChange = (event) => {
              headerpage.forEach((row) => {
                if (!row.original.disabled && row.original.status !== "APR") {
                  headertoggleRowSelected(row.id, event.currentTarget.checked);
                }
              });
            };

            let selectableRowsInCurrentPage = 0;
            let selectedRowsInCurrentPage = 0;
            headerpage.forEach((row) => {
              if (row.isSelected) selectedRowsInCurrentPage += 1;
              if (!row.original.disabled) selectableRowsInCurrentPage += 1;
            });

            const disabled =
              headerpage.every(
                (row) => row.original.status === "APR" || row.original.disabled
              ) || selectableRowsInCurrentPage === 0;
            const checked =
              (isAllPageRowsSelected ||
                selectableRowsInCurrentPage === selectedRowsInCurrentPage) &&
              !disabled;

            return CustomCheckboxHeader(modifiedOnChange, checked, disabled);
          },

          width: 0,
          maxWidth: 0,
          minWidth: 0,
          Cell: ({ row }) => CustomCheckboxCell(row),
        },
        ..._columns,
      ]);
    }
  );

  const dropdownOptions = useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      options.add(row.values.faculty);
    });
    return ["All", ...options.values()];
  }, [preGlobalFilteredRows]);

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

  const handleFilterDropdown = useCallback((value) => {
    if (value === "All") {
      setFilter("faculty", undefined);
      setDropdownFilter("All");
    } else {
      setFilter("faculty", value || undefined);
      setDropdownFilter(value);
    }
  }, []);

  const handleDownload = async () => {
    const selectedFiles = page.filter((pg) => pg.isSelected);

    if (selectedFiles.length > 0) {
      const payload = selectedFiles.map((file) => file.original._id);

      const response = await callService(
        "POST",
        `${process.env.API_URL}/file/download`,
        {
          fileIds: payload,
        },
        {
          Authorization: `Bearer ${usrToken}`,
        }
      );
      // if(response.status ){

      // }
    }
  };

  return (
    <>
      <div className="pb-12 flex justify-between items-end xlmx:flex-col">
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

          <Button type="button" onClick={handleDownload}>
            Export .CSV
          </Button>
        </form>

        <div>
          <p className="p3 font-bold mb-1">Faculty Type</p>
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
      </div>

      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default ContributionTable;
