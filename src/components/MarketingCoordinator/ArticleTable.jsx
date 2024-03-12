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
import MakeTable from "@/components/MakeTable";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "../Modal";
import { Switch } from "../ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Label } from "../ui/label";

function ArticleTable() {
  const [loading, setLoading] = useState({ show: true, error: "" });
  const [apiLoading, setApiLoading] = useState({ state: false, msg: "" });
  const [filters] = useState(["name", "article_name"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [oriData, setOriData] = useState([]);

  const [modalVerify, setModalVerify] = useState(false);
  const [publshData, setPublishData] = useState({
    state: false,
    itemData: null,
  });

  const [commentmodalVerify, setCommentModalVerify] = useState(false);
  const [commentData, setCommentData] = useState({
    text: "",
    itemData: null,
  });

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
      name: "Studen 1",
      article_name: "test.doc",
      article_link: "https://www.google.com",
      comment: "good one",
      approve: true,
    },
    {
      id: 1,
      joined_date: "12-3-2023",
      name: "Studen 2",
      article_name: "test.doc",
      article_link: "https://www.google.com",
      comment: "wow wow",
      approve: true,
    },
    {
      id: 2,
      joined_date: "2-3-2023",
      name: "Studen 3",
      article_name: "test3.doc",
      article_link: "https://www.google.com",
      comment: "",
      approve: false,
    },
    {
      id: 3,
      joined_date: "12-6-2023",
      name: "Studen 4",
      article_name: "test4.doc",
      article_link: "https://www.google.com",
      comment: "",
      approve: false,
    },
    {
      id: 4,
      joined_date: "1-3-2023",
      name: "Studen 5",
      article_name: "test5.doc",
      article_link: "https://www.google.com",
      comment: "good one try lah",
      approve: true,
    },
    {
      id: 5,
      joined_date: "12-3-2023",
      name: "Studen 6",
      article_name: "test6.doc",
      article_link: "https://www.google.com",
      comment: "",
      approve: false,
    },
  ];

  // temp adding
  useEffect(() => {
    setOriData(DATA);
  }, []);

  const data = useMemo(() => oriData, [oriData]);

  // open publish modal
  const openPublishModal = (checkPublish, item) => {
    setPublishData({
      state: checkPublish,
      itemData: item,
    });
    setModalVerify(true);
  };

  // open comment modal
  const openCommentModal = (item) => {
    setCommentData({
      text: item.comment,
      itemData: item,
    });
    setCommentModalVerify(true);
  };

  const CellDate = (tableProps) => {
    const component = useMemo(
      () =>
        moment(tableProps.row.original.joined_date).format("DD MMM YYYY HH:mm"),
      [tableProps]
    );

    return component;
  };

  const CellArticle = (tableProps) => {
    const component = useMemo(
      () => (
        <div>
          <Link
            href={tableProps.row.original.article_link}
            className="text-info underline"
          >
            {tableProps.row.original.article_name}
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
          {!tableProps.row.original.comment
            ? "-"
            : tableProps.row.original.comment}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const CellStatus = (tableProps) => {
    const component = useMemo(
      () => (
        <div>
          <Switch
            checked={tableProps.row.original.approve}
            onCheckedChange={(value) =>
              openPublishModal(value, tableProps.row.original)
            }
          />
        </div>
      ),
      [tableProps]
    );

    return component;
  };

  const CellInfo = (tableProps) => {
    const component = useMemo(
      () => (
        <div>
          <Button
            variant="ghost"
            onClick={() => openCommentModal(tableProps.row.original)}
          >
            <FontAwesomeIcon icon={faEdit} className="text-[18px] text-info" />
          </Button>
        </div>
      ),
      [tableProps]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Date",
      accessor: "joined_date",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDate(tableProps),
    },
    {
      Header: "Student Name",
      accessor: "name",
      width: 134,
      maxWidth: 134,
    },
    {
      Header: "Article",
      accessor: "article_name",
      width: 124,
      maxWidth: 124,
      Cell: (tableProps) => CellArticle(tableProps),
    },
    {
      Header: "Comment",
      accessor: "comment",
      width: 134,
      maxWidth: 134,
      Cell: (tableProps) => CellComment(tableProps),
    },
    {
      Header: "Publish",
      accessor: "approve",
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

  const dialogImageIcon = useMemo(
    () => (
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="text-[100px] text-warning"
      />
    ),
    []
  );

  const changePublishStatus = async () => {
    const newData = [];
    oriData.forEach((entry) => {
      if (entry.id === publshData.itemData.id) {
        const singleItem = entry;
        singleItem.approve = publshData.state;
        newData.push(singleItem);
      } else {
        newData.push(entry);
      }
    });
    setOriData(newData);
    setModalVerify(false);
  };

  const changeComment = async () => {
    const newData = [];
    oriData.forEach((entry) => {
      if (entry.id === commentData.itemData.id) {
        const singleItem = entry;
        singleItem.comment = commentData.text;
        newData.push(singleItem);
      } else {
        newData.push(entry);
      }
    });
    setOriData(newData);
    setCommentModalVerify(false);
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
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
      {/* publish modal */}
      <Modal
        open={modalVerify}
        setOpen={setModalVerify}
        bannerIcon={() => dialogImageIcon}
        title={
          publshData.state
            ? "Confirm to Publish this Article?"
            : "Confirm to Unpublish this Article?"
        }
      >
        <div className="mt-2">
          <p className="text-gray-500 p3">
            Are you sure you want to{" "}
            {publshData.state ? "publish" : "unpublish"} this article on the
            website? <br />
            To confirm, please click the button below.
          </p>
        </div>
        <div className="flex space-x-5 mt-5 justify-center">
          <Button variant="outline" onClick={() => setModalVerify(false)}>
            Cancel
          </Button>
          <Button onClick={changePublishStatus}>Confirm</Button>
        </div>
        {/* <p className="p3 negative">{apiLoading.error && apiLoading.error}</p> */}
      </Modal>
      {/* comment modal */}
      <Modal
        open={commentmodalVerify}
        setOpen={setCommentModalVerify}
        title="Update the Comment?"
      >
        <div className="!text-left max-w-[70%] mx-auto">
          <Label>Comment</Label>
          <Input
            value={commentData.text}
            onChange={(e) =>
              setCommentData({ ...commentData, text: e.target.value })
            }
            placeholder="Comment"
          />

          <div className="flex space-x-5 mt-5 justify-center">
            <Button
              variant="outline"
              onClick={() => setCommentModalVerify(false)}
            >
              Cancel
            </Button>
            <Button onClick={changeComment} disabled={!commentData.text}>
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ArticleTable;
