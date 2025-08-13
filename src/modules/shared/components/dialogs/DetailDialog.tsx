import { Button } from "@/modules/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/Dialog";
import TextInput from "../ui/TextInput";
import { type BuyProduct } from "@/modules/buys/model/buysProduct";
import { type ConfigItem } from "../../types";
import { flattenObject, formatKey } from "../../helpers/dialogUtils";
interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  data: BuyProduct | null;
  configs: ConfigItem[];
}

export function DetailDialog({
  open,
  onClose,
  data,
  configs,
}: DetailDialogProps) {
  if (!data) {
    return null;
  }
  const flatData = flattenObject(data);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Details View</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(flatData).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {formatKey(key)}
              </label>
              <TextInput
                value={String(value ?? "")}
                inputType="text"
                disabled
                className="w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 md:col-span-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
