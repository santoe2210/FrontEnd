"use client";

import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  faEye,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Label } from "../ui/label";
import callService from "@/app/utils/callService";
import { useDataContext } from "@/app/context/ContextProvider";
import {
  checkAcademicPassed,
  getClouserDateDetail,
  getClouserDateName,
} from "@/app/utils/common";

function ArticleTable({ lists, usrToken }) {
  const [loading, setLoading] = useState({ show: true, error: "" });

  const [filters] = useState(["title", "documentOwner"]);
  const searchInputRef = useRef(null);
  const [filterInput, setFilterInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [oriData, setOriData] = useState([]);
  const [dropdownFilter, setDropdownFilter] = useState("All");

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

  // temp adding
  useEffect(() => {
    setOriData(lists);
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
      text: item.comments,
      itemData: item,
    });
    setCommentModalVerify(true);
  };

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
      () => <p>{tableProps.row.original?.article || "-"}</p>,
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

  const CellStatus = (tableProps) => {
    const { date } = useDataContext();
    const clouserdate = getClouserDateDetail(
      date?.date,
      tableProps.row.original?.chosenAcademicYear
    );
    const passed = checkAcademicPassed(clouserdate);
    const component = useMemo(
      () => (
        <div>
          <Switch
            disabled={passed}
            checked={tableProps.row.original.status === "approved" || false}
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

  const CellAcademic = (tableProps) => {
    const { date } = useDataContext();
    const component = useMemo(
      () => (
        <div>
          <p>
            {getClouserDateName(
              date?.date,
              tableProps.row.original?.chosenAcademicYear
            ) || "-"}
          </p>
        </div>
      ),
      [tableProps]
    );

    return component;
  };

  const CellInfo = (tableProps) => {
    const { date } = useDataContext();
    const clouserdate = getClouserDateDetail(
      date?.date,
      tableProps.row.original?.chosenAcademicYear
    );
    const passed = checkAcademicPassed(clouserdate);

    const component = useMemo(
      () => (
        <div className="flex space-x-2 items-center">
          <Link
            href={`/marketing-coordinator/articles/${tableProps.row.original._id}`}
            passHref
          >
            <FontAwesomeIcon icon={faEye} className=" text-info mt-2" />
          </Link>
          <Button
            variant="ghost"
            disabled={passed}
            onClick={() => openCommentModal(tableProps.row.original)}
          >
            <FontAwesomeIcon icon={faEdit} className=" text-info" />
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
      accessor: "createdAt",
      width: 95,
      maxWidth: 95,
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
    },
    {
      Header: "Article",
      accessor: "article",
      width: 124,
      maxWidth: 124,
      Cell: (tableProps) => CellArticle(tableProps),
    },
    {
      Header: "Academic Date",
      accessor: "chosenAcademicYear",
      disableSortBy: true,
      width: 134,
      maxWidth: 134,
      Cell: (tableProps) => CellAcademic(tableProps),
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Comment",
      accessor: "comments",
      width: 134,
      maxWidth: 134,
      Cell: (tableProps) => CellComment(tableProps),
    },
    {
      Header: "Publish",
      accessor: "status",
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
    setFilter,

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
            id: "createdAt",
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

  const handleFilterDropdown = useCallback((value) => {
    if (value === "All") {
      setFilter("comments", undefined);
      setOriData(lists);
      setDropdownFilter("All");
    } else if (value === "Without Comment") {
      setOriData(lists.filter((item) => !item.comments));
      setDropdownFilter("Without Comment");
    } else if (value === "Without Comment 14 Days") {
      const cutoffDate = moment(); // Get today's date

      setOriData(
        lists.filter(
          (item) =>
            !item.comments && cutoffDate.diff(item.createdAt, "days") <= 14
        )
      );

      setDropdownFilter("Without Comment 14 Days");
    }
  }, []);

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
    const response = await callService(
      "PATCH",
      `${process.env.API_URL}/file/updateFileStatus/${publshData?.itemData?._id}/`,
      {
        title: publshData.itemData?.title,
        status: publshData?.state ? "approved" : "submitted",
      },
      {
        Authorization: `Bearer ${usrToken}`,
      }
    );
    if (response.status === 200) {
      const newData = [];
      oriData.forEach((entry) => {
        if (entry.id === publshData.itemData.id) {
          const singleItem = entry;
          singleItem.approve = publshData.state ? "approved" : "submitted";
          newData.push(singleItem);
        } else {
          newData.push(entry);
        }
      });
      setOriData(newData);
      setModalVerify(false);
    }
  };

  const changeComment = async () => {
    if (commentData?.itemData?.commentId) {
      const response = await callService(
        "PATCH",
        `${process.env.API_URL}/comment/editComment/${commentData?.itemData?.commentId}/`,
        {
          comment: commentData.text,
          contributionId: commentData.itemData?._id,
        },
        {
          Authorization: `Bearer ${usrToken}`,
        }
      );
      if (response.status === 200) {
        const newData = [];
        oriData.forEach((entry) => {
          if (entry._id === commentData.itemData._id) {
            const singleItem = entry;
            singleItem.comments = commentData.text;
            newData.push(singleItem);
          } else {
            newData.push(entry);
          }
        });
        setOriData(newData);
        setCommentModalVerify(false);
      } else {
      }
    } else {
      const response = await callService(
        "POST",
        `${process.env.API_URL}/comment/createComment/${commentData.itemData?._id}/`,
        {
          commentOwner: commentData.itemData?.documentOwnerId,
          comment: commentData.text,
        },
        {
          Authorization: `Bearer ${usrToken}`,
        }
      );
      if (response.status === 201) {
        const newData = [];
        oriData.forEach((entry) => {
          if (entry._id === commentData.itemData._id) {
            const singleItem = entry;
            singleItem.comments = commentData.text;
            newData.push(singleItem);
          } else {
            newData.push(entry);
          }
        });
        setOriData(newData);
        setCommentModalVerify(false);
      } else {
      }
    }
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
        <div>
          <p className="p3 font-bold mb-1">Comments</p>
          <Select value={dropdownFilter} onValueChange={handleFilterDropdown}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["All", "Without Comment", "Without Comment 14 Days"].map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
