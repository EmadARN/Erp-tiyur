import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string | number) => void;
  deleteIndex: string | number | null;
}

export function DeleteDialog({
  open,
  onClose,
  onConfirm,
  deleteIndex,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (deleteIndex !== null) {
                onConfirm(deleteIndex);
              }
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
