import React, { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/Button";
import { SearchInput } from "../ui/SearchInput";
import { Pagination } from "../ui/Pagination";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import CustomCheckbox from "../ui/Checkbox";
import Tooltip from "../ui/Tooltip";
import { UpdateDialog } from "@/modules/shared/components/dialogs/UpdateDialog";
import type { TableColumn, TableFilter } from "../../types";
import { TableFilterDrawer } from "./TableFilterDrawer";
import { MdRemoveRedEye } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { LuTrash2 } from "react-icons/lu";
import { DetailDialog } from "../dialogs/DetailDialog";

type DynamicTableProps = {
  tableHead: TableColumn[];
  tableFilters: TableFilter[];
  data: Record<string, any>[];
  filterData?: any;
  setFilterData?: React.Dispatch<React.SetStateAction<any>>;
  updateDialogConfigs?: any;
  existingData?: any;
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
  onCreate?: () => void;
  showSearch?: boolean;
  handleSearch?: (query: string) => void;
  deleteHandler?: (index: number | null) => void;
  bulkDeleteHandler?: (index: number | null) => void;
  onUpdateConfirm?: () => void;
  applyFilter?: () => void;
};

export const DataTable: React.FC<DynamicTableProps> = ({
  tableHead,
  tableFilters,
  filterData,
  setFilterData,
  applyFilter,
  data,
  onDelete,
  onEdit,
  deleteHandler,
  bulkDeleteHandler,
  showSearch = true,
  handleSearch,
  updateDialogConfigs,
  onUpdateConfirm,
  existingData,
}) => {
  const [page, setPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<Record<string, any>>({});
  const [bulkMode, setBulkMode] = useState<"edit" | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [editRowData, setEditRowData] = useState<Record<string, any> | null>(
    null
  );

  // تعداد آیتم‌های هر صفحه
  const itemsPerPage = 10;

  // محاسبه داده‌های صفحه‌بندی‌شده
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, page]);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const isAllSelected = data?.length > 0 && selectedRows.length === data.length;

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
    const delete_list = selectedRows.map((index) => data[index].id);
    console.log(delete_list, "jjjjjj");
    bulkDeleteHandler(delete_list);

    setSelectedRows([]);
    setBulkMode(null);
  };

  const detailConfigs = tableHead.map((col) => {
    let type: "string-input" | "select-box" | "switch" | "multi-select" =
      "string-input";
    if (col.options && col.options.length > 0) {
      type = col.type === "string" ? "select-box" : (col.type as any);
    }
    return {
      name: col.row_id,
      label: col.columnName,
      type,
      options: col.options,
    };
  });

  const openDetailDialog = (row: Record<string, any>) => {
    setDetailData(row);
    setDetailOpen(true);
  };

  function getNestedValue(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }

  // هنگام تغییر صفحه، انتخاب‌های ردیف‌ها را ریست کنیم
  useEffect(() => {
    setSelectedRows([]);
  }, [page]);

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-4">
        {showSearch && handleSearch && (
          <div className="w-full md:w-auto">
            <SearchInput
              value={filterData.search || ""}
              onSearch={handleSearch}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <TableFilterDrawer
            open={showFilters}
            onClose={() => setShowFilters(!showFilters)}
            tableFilters={tableFilters}
            filterData={filterData}
            setFilterData={setFilterData}
            onApply={applyFilter}
          />
          {/* <BulkEditToolbar
            bulkMode={bulkMode}
            onEnterBulkMode={() => setBulkMode("edit")}
            onCancel={() => setBulkMode(null)}
            onEdit={() => console.log("Edit clicked")}
          /> */}
        </div>
      </div>

      {/* Table Wrapper with horizontal scroll */}
      <div className="w-full overflow-x-auto px-6">
        <table className="min-w-max w-full text-left border-collapse">
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
                    className="p-4 text-sm text-blue-gray-900 opacity-70 whitespace-nowrap"
                  >
                    {col.columnName}
                  </th>
                ))}
                {!bulkMode && (
                  <th className="p-4 text-sm text-blue-gray-900 opacity-70 whitespace-nowrap">
                    Actions
                  </th>
                )}
              </tr>
            )}
          </thead>

          <tbody>
            {paginatedData.map((row, rowIndex) => {
              // محاسبه اندیس واقعی ردیف در آرایه اصلی
              const originalIndex = (page - 1) * itemsPerPage + rowIndex;
              return (
                <tr
                  key={originalIndex}
                  className={
                    selectedRows.includes(originalIndex) ? "bg-blue-50" : ""
                  }
                >
                  <td className="p-4 border-b border-blue-gray-50">
                    <CustomCheckbox
                      checked={selectedRows.includes(originalIndex)}
                      onChange={() => toggleRowSelection(originalIndex)}
                      color="blue"
                      size="sm"
                    />
                  </td>

                  {tableHead.map((col, colIndex) => {
                    const value = getNestedValue(row, col.row_id);
                    let displayType = col.type;

                    if (bulkMode === "edit" && col.type === "string") {
                      displayType = "input";
                    }

                    return (
                      <td
                        key={colIndex}
                        className="p-4 border-b border-blue-gray-50 whitespace-nowrap"
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
                    <td className="p-4 border-b border-blue-gray-50 space-x-2 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditIndex(originalIndex);
                          setEditRowData(row);
                        }}
                      >
                        <HiOutlinePencil className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteIndex(row.id)}
                      >
                        <LuTrash2 className="w-4 h-4 text-red-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetailDialog(row)}
                      >
                        <MdRemoveRedEye className="w-4 h-4 text-gray-500" />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 px-6 pb-4 pt-2">
        <div className="text-sm text-gray-500 whitespace-nowrap">
          Showing {paginatedData.length} of {data.length} items | Current page:{" "}
          {page}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      {/* Dialogs */}

      <UpdateDialog
        open={editIndex !== null}
        onClose={() => {
          setEditIndex(null);
          setEditRowData(null);
        }}
        onConfirm={onUpdateConfirm}
        configs={updateDialogConfigs}
        data={editRowData ?? {}}
      />

      <DeleteDialog
        open={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={() => deleteHandler && deleteHandler(deleteIndex)}
      />

      <DetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        configs={detailConfigs}
        data={detailData}
      />
    </div>
  );
};
