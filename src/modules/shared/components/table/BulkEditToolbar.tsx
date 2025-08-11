import React from "react";
import { Button } from "../ui/Button";
import { FiEdit2 } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

type BulkEditToolbarProps = {
  bulkMode: "edit" | null;
  onEnterBulkMode: () => void;
  onCancel: () => void;
  onEdit: () => void;
};

export const BulkEditToolbar: React.FC<BulkEditToolbarProps> = ({
  bulkMode,
  onEnterBulkMode,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="pl-4 min-h-[90px] flex flex-col justify-center">
      {bulkMode !== "edit" ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2 justify-start px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
          onClick={onEnterBulkMode}
        >
          <FiEdit2 className="w-4 h-4" />
          Bulk Edit
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center gap-2 justify-start px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
            onClick={onCancel}
          >
            <MdCancel className="w-4 h-4" />
            Cancel
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center gap-2 justify-start px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition"
            onClick={onEdit}
          >
            <FiEdit2 className="w-4 h-4" />
            Edit This
          </Button>
        </>
      )}
    </div>
  );
};
