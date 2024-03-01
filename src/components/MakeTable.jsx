"use client";

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faCircleExclamation,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

export default function MakeTable({
  loading,
  propsToTable,
  style = null,
  noPagination = null,
  noOverflow = null,
}) {
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    // rows,
    pageIndex,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
  } = propsToTable;

  // console.log(rows);

  function filterPages(_visiblePages, totalPages) {
    return _visiblePages.filter((_page) => _page <= totalPages);
  }

  function getVisiblePages(_page, total) {
    if (total <= 5) {
      return filterPages(
        total === 5 ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6],
        total
      );
    }
    if (_page % 5 >= 0 && _page > 4 && _page + 2 < total) {
      return [1, _page - 1, _page, _page + 1, total];
    }
    if (_page % 5 >= 0 && _page > 4 && _page + 2 >= total) {
      return [1, 2, total - 3, total - 2, total - 1, total];
    }
    return [1, 2, 3, 4, 5, total];
  }

  const [visiblePages, setVisiblePages] = useState(
    noPagination ? null : getVisiblePages(null, pageOptions?.length)
  );

  useEffect(() => {
    setVisiblePages(getVisiblePages(null, pageOptions?.length));
  }, [pageOptions?.length]);

  function changePage(_page) {
    const activePage = pageIndex + 1;

    if (_page === activePage) {
      return;
    }

    const innerVisiblePages = getVisiblePages(_page, pageOptions.length);

    setVisiblePages(filterPages(innerVisiblePages, pageOptions.length));

    gotoPage(_page - 1);
  }

  function generateSortIcons(column) {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return (
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ml-2 after::color-gray-500"
          />
        );
      }
      return <FontAwesomeIcon icon={faCaretUp} className="ml-2" />;
    }

    if (column.canSort) {
      return <FontAwesomeIcon icon={faSort} className="ml-2" />;
    }

    return null;
  }

  function checkLoadingStatus() {
    if (!loading.show) {
      return <>Loading ...</>;
    }

    if (loading.show && loading.error) {
      return (
        <div>Something wrong while retreving data, please try again later</div>
      );
    }

    if (loading.show && !loading.error) {
      return (
        <>
          <div className="">
            <div
              className={cn(
                !noOverflow && "overflow-x-auto",
                page.length === 0 && "!rounded-t-[10px] !rounded-b-[0px]",
                "relative border-[2px] border-border rounded-[10px]"
              )}
            >
              <table
                {...getTableProps()}
                className="w-full text-sm text-left text-gray-500"
                style={style && style}
              >
                <thead
                  className={`text-xs text-gray-700 ${
                    !noOverflow ? "bg-gray-200" : ""
                  } h-[60px]`}
                >
                  {headerGroups.map((headerGroup, index) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className={cn(
                        noOverflow && "rounded-t-[10px]  w-full bg-gray-200",
                        "border-border"
                      )}
                      key={index}
                    >
                      {headerGroup.headers.map((column, index) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          style={{
                            width: column.width,
                            maxWidth: column.maxWidth,
                            minWidth: column.minWidth,
                            whiteSpace: "nowrap",
                            ...column.style,
                          }}
                          key={index}
                          scope="col"
                          className={cn(
                            column.canSort ? "cursor-pointer" : "",
                            noOverflow ? "py-4" : "py-3",
                            "px-6 text-gray-500 text-sm",
                            index === 0 ? "rounded-tl-[10px]" : "",
                            index === 5 ? "rounded-tr-[10px]" : ""
                          )}
                        >
                          {column.render("Header")}
                          <span>{generateSortIcons(column)}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()} className="relative">
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={cn(
                          i === page.length - 1
                            ? "border-none"
                            : "border-b-[2px] ",
                          "bg-white"
                        )}
                        key={i}
                      >
                        {row.cells.map((cell, index) => (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              width: cell.column.width,
                              maxWidth: cell.column.maxWidth,
                              minWidth: cell.column.minWidth,
                              ...cell.column.style,
                            }}
                            className={cn(
                              i === page.length - 1 ? "rounded-b-0" : "",
                              "px-6 py-4 text-gray-500 whitespace-nowrap p3"
                            )}
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {page.length === 0 && (
            <div className="border rounded-b-[10px] border-t-0 border-border bg-white py-6">
              <div className="flex space-x-3 justify-center items-center">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-primary text-[36px]"
                />
                <p className="p2 text-gray-500">There is no data to show.</p>
              </div>
            </div>
          )}
          {pageOptions?.length > 1 && !noPagination && (
            <div className="flex mt-8 justify-center mb-12">
              <button
                className={cn(
                  !canPreviousPage ? "cursor-not-allowed" : "",
                  "w-8 h-8 bg-gray-100 flex justify-center items-center p3 rounded-l-lg border border-border"
                )}
                onClick={() => changePage(pageIndex)}
                type="button"
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {visiblePages.map((_page, index, array) =>
                array[index - 1] + 1 < _page ? (
                  <div key={_page} className="inline-flex">
                    <span className="inline-flex w-8 h-8 bg-gray-100 justify-center items-center p3 border border-border">
                      ...
                    </span>

                    <button
                      className={cn(
                        pageIndex + 1 === _page
                          ? "border-none bg-primary text-white"
                          : " border border-border bg-gray-100 hover:bg-gray-100 text-gray-500",
                        "w-8 h-8 flex justify-center items-center p3 "
                      )}
                      type="button"
                      onClick={() => changePage(_page)}
                    >
                      {_page}
                    </button>
                  </div>
                ) : (
                  <button
                    key={_page}
                    className={cn(
                      pageIndex + 1 === _page
                        ? "border-none bg-primary text-white"
                        : " border border-border bg-gray-100 hover:bg-gray-100 text-gray-500",
                      "w-8 h-8 flex justify-center items-center p3"
                    )}
                    type="button"
                    onClick={() => changePage(_page)}
                  >
                    {_page}
                  </button>
                )
              )}
              <button
                className={cn(
                  !canNextPage ? "cursor-not-allowed" : "",
                  "w-8 h-8 bg-gray-100 flex justify-center items-center p3 rounded-r-lg border border-border"
                )}
                type="button"
                onClick={() => changePage(pageIndex + 2)}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </>
      );
    }

    return null;
  }

  return checkLoadingStatus();
}

MakeTable.propTypes = {
  loading: PropTypes.objectOf(Object).isRequired,
  propsToTable: PropTypes.objectOf(Object).isRequired,
  style: PropTypes.objectOf(Object),
  noPagination: PropTypes.bool,
  noOverflow: PropTypes.bool,
};

MakeTable.defaultProps = {
  noPagination: null,
  noOverflow: false,
};
