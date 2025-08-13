import { GoPlus } from "react-icons/go";
import Breadcrumb from "../ui/Breadcrumb";
import { Button } from "../ui/Button";

interface PageHeaderProps {
  title: string;
  breadcrumbItems: any[];
  onCreate?: () => void;
  createLabel?: string;
  isCreatingDisabled?: boolean;
}

export default function PageHeader({
  title,
  breadcrumbItems,
  onCreate,
  createLabel = "Add",
  isCreatingDisabled = false,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {onCreate && (
        <Button
          onClick={onCreate}
          disabled={isCreatingDisabled}
          className="flex items-center justify-center gap-1 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors w-full sm:w-auto"
        >
          <GoPlus className="w-5 h-5" />
          <span className="text-sm">{createLabel}</span>
        </Button>
      )}
    </div>
  );
}
