import React, { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { UpdateDialog } from "../Dialog/UpdateDialog";
import { DeleteDialog } from "../Dialog/DeleteDialog";
import CustomCheckbox from "./Checkbox";
import Tooltip from "./Tooltip";
import { FiEdit2 } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
type ColumnType = "string" | "button" | "input" | "select";

type TableColumn = {
  columnName: string;
  row_id: string;
  type: ColumnType;
  onClick?: (row: any) => void;
  options?: string[];
};

type DynamicTableProps = {
  tableHead: TableColumn[];
  data: Record<string, any>[];
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
  showSearch?: boolean;
  handleSearch?: (query: string) => void;
};

export const DataTable: React.FC<DynamicTableProps> = ({
  tableHead,
  data,
  onDelete,
  onEdit,
  showSearch = true,
  handleSearch,
}) => {
  const [page, setPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [bulkMode, setBulkMode] = useState<"edit" | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;

  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((_, index) => index));
  };

  const handleBulkDelete = () => {
    selectedRows.forEach((i) => onDelete?.(i));
    setSelectedRows([]);
    setBulkMode(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        {showSearch && handleSearch && <SearchInput onSearch={handleSearch} />}

        <div className="ml-auto mt-4  bg-white border border-gray-200 rounded-lg shadow-lg p-1.5">
          {bulkMode !== "edit" ? (
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 justify-start py-2 px-3 text-sm text-slate-700 hover:bg-slate-100 transition"
              onClick={() => {
                setBulkMode("edit");
              }}
              size="sm"
            >
              <FiEdit2 className="w-4 h-4" />
              Bulk Edit
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 justify-start py-2 px-3 text-sm text-red-500 hover:bg-red-50 transition"
              onClick={() => {
                setBulkMode(null);
              }}
              size="sm"
            >
              <MdCancel className="w-4 h-4" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="p-6 px-0 overflow-auto">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            {selectedRows.length > 0 ? (
              <tr className="bg-blue-100 border-y border-blue-200">
                <th colSpan={tableHead.length + 2} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CustomCheckbox
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        color="blue"
                        size="sm"
                        className="mr-2"
                      />
                      <span className="text-blue-800 font-medium">
                        {selectedRows.length} selected
                      </span>
                    </div>
                    <Tooltip content="Delete" position="bottom">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBulkDelete}
                        className="text-blue-700 hover:text-red-500 hover:bg-transparent"
                      >
                        <LuTrash2 className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </th>
              </tr>
            ) : (
              <tr className="bg-blue-gray-50/50 border-y border-blue-gray-100">
                <th className="p-4">
                  <CustomCheckbox
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    color="blue"
                    size="sm"
                  />
                </th>
                {tableHead.map((col, idx) => (
                  <th
                    key={idx}
                    className="p-4 text-sm text-blue-gray-900 opacity-70"
                  >
                    {col.columnName}
                  </th>
                ))}
                {!bulkMode && (
                  <th className="p-4 text-sm text-blue-gray-900 opacity-70">
                    Actions
                  </th>
                )}
              </tr>
            )}
          </thead>

          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={selectedRows.includes(rowIndex) ? "bg-blue-50" : ""}
              >
                <td className="p-4 border-b border-blue-gray-50">
                  <CustomCheckbox
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => toggleRowSelection(rowIndex)}
                    color="blue"
                    size="sm"
                  />
                </td>

                {tableHead.map((col, colIndex) => {
                  const value = row[col.row_id];
                  let displayType: ColumnType = col.type;

                  if (bulkMode === "edit" && col.type === "string") {
                    displayType = "input";
                  }

                  return (
                    <td
                      key={colIndex}
                      className="p-4 border-b border-blue-gray-50"
                    >
                      {(() => {
                        switch (displayType) {
                          case "string":
                            return <span>{value}</span>;

                          case "button":
                            return (
                              <Button
                                onClick={() => col.onClick?.(row)}
                                variant="outline"
                                size="sm"
                              >
                                {value}
                              </Button>
                            );

                          case "input":
                            return (
                              <input
                                className="border rounded p-1 text-sm w-full"
                                defaultValue={value}
                              />
                            );

                          case "select":
                            return (
                              <select
                                className="border rounded p-1 text-sm w-full"
                                defaultValue={value}
                              >
                                {col.options?.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            );

                          default:
                            return <span>{value}</span>;
                        }
                      })()}
                    </td>
                  );
                })}

                {!bulkMode && (
                  <td className="p-4 border-b border-blue-gray-50 space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditIndex(rowIndex)}
                    >
                      <LuPencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteIndex(rowIndex)}
                    >
                      <LuTrash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 pb-4 pt-2">
        <div className="text-sm text-gray-500">Current page: {page}</div>
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      {/* Dialogs */}
      <UpdateDialog
        open={editIndex !== null}
        onClose={() => setEditIndex(null)}
        onConfirm={() => {
          if (editIndex !== null) onEdit?.(editIndex);
          setEditIndex(null);
        }}
      />
      <DeleteDialog
        open={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={() => {
          if (deleteIndex !== null) onDelete?.(deleteIndex);
          setDeleteIndex(null);
        }}
      />
    </div>
  );
};
