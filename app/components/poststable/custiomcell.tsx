import {
  Chip,
  ChipProps,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { Link } from "react-router";
import { EditIcon } from "./EditIcon";
import { EyeIcon } from "./EyeIcon";
import "./customcell.css";
import { columns } from "./customuser";
import PopDelete from "./popDelete";
import { SearchIcon } from "./searchIcon";
import { TablePropsTypes } from "./types";

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "warning",
};

export default function CustomCells({ posts }: { posts: TablePropsTypes[] }) {
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const hasSearchFilter = Boolean(filterValue);
  // console.log("🚀 ~ CustomCells ~ hasSearchFilter:", hasSearchFilter);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...posts];
    // console.log("🚀 ~ filteredItems ~ filteredUsers:", filteredUsers);

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
      // console.log("🚀 ~ filteredItems ~ filteredUsers:", filteredUsers);
    }
    // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status),
    //   );
    // }

    return filteredUsers;
  }, [filterValue, hasSearchFilter, posts]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // const pages = Math.ceil(users.length / rowsPerPage);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // return users.slice(start, end);
    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);

  const topContent = React.useMemo(() => {
    return (
      <Input
        isClearable
        type="search"
        placeholder="Search By Name..."
        variant="bordered"
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      ></Input>
    );
  }, [filterValue, onSearchChange, onClear]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-12">
          <span className="text-small text-default-400">
            Total {posts.length} posts
          </span>
          <label className="flex items-center text-small text-default-800">
            Rows per page
            <select
              className="m-2 rounded bg-transparent px-1 py-2 text-small text-default-600 shadow outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  }, [posts.length, onRowsPerPageChange, page, pages]);

  const renderCell = React.useCallback(
    (posts: TablePropsTypes, columnKey: React.Key) => {
      const cellValue = posts[columnKey as keyof TablePropsTypes];
      switch (columnKey) {
        case "thumbnail":
          return (
            <div>
              <img className="rounded size-16" src={posts.thumbnail} alt={posts.title} />
            </div>
          );
        case "title":
          return (
            <div>
              <h1 className="font-semibold capitalize">{posts.title}</h1>
            </div>
          );
        case "author":
          return (
            <div className="flex flex-col">
              <p className="text-base font-bold capitalize text-default-800">
                {posts.author}
              </p>
              <p className="text-bold text-sm lowercase text-default-400">
                {posts.email}
              </p>
            </div>
          );
        case "published":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[posts.published === true ? "true" : "false"]
              }
              size="sm"
              variant="shadow"
            >
              <span className="text-white">
                {cellValue === true ? "PUBLISHED" : "DRAFT"}
              </span>
            </Chip>
          );
        // case "thumbnail":
        //   return (
        //     <div>
        //       <img src={String(cellValue)} alt=""></img>
        //     </div>
        //   );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <Link
                  to={`/blog/${posts.slug ? posts.slug : posts.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Edit post">
                <Link
                  to={`/admin/edit/${posts.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </Link>
              </Tooltip>
              <PopDelete postid={posts.id!}></PopDelete>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      classNames={{
        wrapper: "bg-neutral-300 text-black shadow-lg",
        th: "bg-slate-200 shadow-sm",
      }}
      aria-label="posts"
      bottomContent={bottomContent}
      topContent={topContent}
    >
      <TableHeader columns={columns} className="bg-blue-300">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.name === "actions" ? "end" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items ?? []} emptyContent="No Data to show">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
