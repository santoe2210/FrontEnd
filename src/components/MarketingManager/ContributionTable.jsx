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

function ContributionTable() {
  const loading = { show: true, error: "" };
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState("All");
  const [filters] = useState(["article_name"]);
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
      options.add(row.values.faculty_type);
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
      setFilter("faculty_type", undefined);
      setDropdownFilter("All");
    } else {
      setFilter("faculty_type", value || undefined);
      setDropdownFilter(value);
    }
  }, []);

  const handleDownload = () => {
    console.log(page);
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
