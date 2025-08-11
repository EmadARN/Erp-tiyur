import { Button } from "@/modules/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/Dialog";
import SelectBox from "@/modules/shared/components/ui/Selecbox";
import Switch from "@/modules/shared/components/ui/Switch";
import MotionMultiSelect from "@/modules/shared/components/ui/MotionMultiSelect";
import TextInput from "../ui/TextInput";
import type { ConfigItem, OptionType } from "../../types";

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  configs: ConfigItem[];
  data: Record<string, any>;
}

export function DetailDialog({
  open,
  onClose,
  configs,
  data,
}: DetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-6 max-w-lg w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Details View</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {configs.map((cfg) => {
            const value = data[cfg.name];

            const options: OptionType[] = (cfg.options ?? []).map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            );

            switch (cfg.type) {
              case "string-input":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {cfg.label}
                    </label>
                    <TextInput
                      value={value ?? ""}
                      inputType="text"
                      disabled
                      className="w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                );

              case "select-box":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {cfg.label}
                    </label>
                    <SelectBox
                      options={options}
                      value={value}
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                );

              case "switch":
                return (
                  <div
                    key={cfg.name}
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {cfg.label}
                    </span>
                    <Switch checked={!!value} />
                  </div>
                );

              case "multi-select":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {cfg.label}
                    </label>
                    <MotionMultiSelect
                      options={options}
                      value={value}
                      disabled
                      placeholder=""
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
