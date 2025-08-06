import React, { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { UpdateDialog } from "../Dialog/UpdateDialog";
import { DeleteDialog } from "../Dialog/DeleteDialog";

// types
type TableRow = {
  avatar: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "online" | "offline";
  employedDate: string;
};

type DataTableProps = {
  data: TableRow[];
  handleSearch?: (query: string) => void;
  showSearch?: boolean;
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
};

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onDelete,
  onEdit,
  handleSearch,
  showSearch = true,
}) => {
  const [page, setPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      {/* Header */}
      {showSearch && handleSearch && (
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between gap-8 mb-8">
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="p-6 px-0 overflow-auto">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            <tr className="bg-blue-gray-50/50 border-y border-blue-gray-100">
              {["Member", "Function", "Status", "Employed", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="p-4 text-sm text-blue-gray-900 opacity-70"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-blue-gray-900">{row.name}</p>
                      <p className="text-sm text-blue-gray-900 opacity-70">
                        {row.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div>
                    <p className="text-sm text-blue-gray-900">{row.position}</p>
                    <p className="text-sm text-blue-gray-900 opacity-70">
                      {row.department}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div
                      className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${
                        row.status === "online"
                          ? "bg-green-500/20 text-green-900"
                          : "bg-blue-gray-500/20 text-blue-gray-900"
                      }`}
                    >
                      {row.status}
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-sm text-blue-gray-900">
                    {row.employedDate}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditIndex(idx)}
                    className="text-gray-900 hover:bg-gray-100"
                  >
                    <LuPencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteIndex(idx)}
                  >
                    <LuTrash2 className="text-red-500 w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Pagination */}
      <div className="flex justify-between items-center px-6 pb-4 pt-2">
        <div className="text-sm text-gray-500">صفحه فعلی: {page}</div>
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
