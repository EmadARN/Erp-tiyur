import React, { useEffect, useState, useMemo } from "react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import CustomCheckbox from "../ui/Checkbox";
import Tooltip from "../ui/Tooltip";
import { UpdateDialog } from "@/modules/shared/components/dialogs/UpdateDialog";
import type { ConfigItem, TableColumn, TableFilter } from "../../types";
import { TableFilterDrawer } from "./tableFilter/TableFilterDrawer";
import { MdRemoveRedEye } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { LuTrash2 } from "react-icons/lu";
import { DetailDialog } from "../dialogs/DetailDialog";
import SelectBox from "@/modules/shared/components/ui/Selecbox";
import { FiFilter } from "react-icons/fi";
import type {
  BuyProduct,
  FiltersRecord,
} from "@/modules/buys/model/buysProduct";

interface DataTableProps {
  tableHead: TableColumn[];
  tableFilters: TableFilter[];
  data: BuyProduct[];
  filterData: FiltersRecord;
  setFilterData: React.Dispatch<React.SetStateAction<FiltersRecord>>;
  updateDialogConfigs: ConfigItem[];
  deleteHandler: (id: string) => Promise<void>;
  bulkDeleteHandler: (arrayIndex: string[]) => Promise<void>;
  onUpdateConfirm: (data: Record<string, any>) => Promise<void>;
  applyFilter: () => void;
  useGetBuyProductDetailsQuery: (
    params: { id: string },
    options: { skip?: boolean }
  ) => {
    data?: BuyProduct;
    isLoading: boolean;
    isFetching: boolean;
    error?: any;
  };
  showFilterButton?: boolean;
  isFilterDrawerOpen?: boolean;
  onFilterDrawerClose?: () => void;
  onFilterIconClick?: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  tableHead,
  tableFilters,
  filterData,
  setFilterData,
  useGetBuyProductDetailsQuery,
  applyFilter,
  data,
  deleteHandler,
  bulkDeleteHandler,
  updateDialogConfigs,
  onUpdateConfirm,
  showFilterButton = true,
  isFilterDrawerOpen,
  onFilterDrawerClose,
  onFilterIconClick,
}) => {
  const [page, setPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null | string>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<BuyProduct | null>(null);
  const [bulkMode, setBulkMode] = useState<"edit" | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editRowData, setEditRowData] = useState<BuyProduct | null>(null);

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
    const delete_list: string[] = selectedRows.map((index) => data[index].id);
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

  const openDetailDialog = (row: BuyProduct) => {
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
        <div className="flex items-center gap-2">
          {showFilterButton && (
            <Button variant="outline" size="sm" onClick={onFilterIconClick}>
              <FiFilter />
            </Button>
          )}
          <TableFilterDrawer
            open={isFilterDrawerOpen ?? false}
            onClose={onFilterDrawerClose ?? (() => {})}
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
      <div className="w-full overflow-x-auto px-2 sm:px-4 md:px-6">
        <table className="min-w-[700px] w-full text-left border-collapse">
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
                            case "boolean":
                              return (
                                  <span className="text-sm">
                                     {value ? "✅" : "❌"}
                                  </span>
                              );
                            case "input":
                              return (
                                <input
                                  className="border rounded p-1 text-sm w-full"
                                  defaultValue={value}
                                />
                              );
                            case "select":
                              // آماده‌سازی گزینه‌ها برای SelectBox
                              const optionsForSelect = (col.options ?? []).map(
                                (opt) =>
                                  typeof opt === "string"
                                    ? { value: opt, label: opt }
                                    : {
                                        value: String(opt.value),
                                        label: opt.label,
                                      }
                              );

                              return (
                                <SelectBox
                                  id={col.row_id}
                                  options={optionsForSelect}
                                  value={String(value ?? "")}
                                  onChange={(val) => {
                                    // اگر نیاز داری مقدار انتخاب‌شده رو به editRowData ذخیره کنی
                                    if (editRowData) {
                                      setEditRowData({
                                        ...editRowData,
                                        [col.row_id]: val,
                                      });
                                    }
                                  }}
                                />
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
        useGetBuyProductDetailsQuery={useGetBuyProductDetailsQuery}
        onClose={() => {
          setEditIndex(null);
          setEditRowData(null);
        }}
        onConfirm={onUpdateConfirm}
        configs={updateDialogConfigs}
        data={editRowData}
      />

      <DeleteDialog
        open={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={() => deleteHandler && deleteHandler(String(deleteIndex))}
        deleteIndex={deleteIndex}
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
