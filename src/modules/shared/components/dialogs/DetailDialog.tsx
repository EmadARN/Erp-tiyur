import { Button } from "@/modules/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/Dialog";
import TextInput from "../ui/TextInput";

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  data: Record<string, any>;
}

// تابع بازگشتی برای فلت کردن آبجکت
const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey} ${key}` : key;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

// تابع قشنگ‌کردن متن لیبل + حذف تکراری‌ها
const formatKey = (key: string) => {
  // آندرلاین به فاصله
  const words = key.replace(/_/g, " ").split(" ");

  // حذف کلمات تکراری پشت سر هم
  const uniqueWords = words.filter(
    (word, index, arr) => word && word !== arr[index - 1]
  );

  // حروف اول بزرگ
  return uniqueWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function DetailDialog({ open, onClose, data }: DetailDialogProps) {
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
