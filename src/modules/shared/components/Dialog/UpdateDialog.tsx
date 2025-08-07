import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  defaultValues?: any;
}

export function UpdateDialog({
  open,
  onClose,
  onConfirm,
  defaultValues = {},
}: UpdateDialogProps) {
  const [formState, setFormState] = React.useState(defaultValues);

  React.useEffect(() => {
    setFormState(defaultValues);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(formState);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>ویرایش اطلاعات</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="block text-sm font-medium">عنوان</label>
          <input
            type="text"
            name="title"
            value={formState.title || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            انصراف
          </Button>
          <Button onClick={handleSubmit}>ذخیره</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
