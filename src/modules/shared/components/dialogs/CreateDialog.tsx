import React from "react";
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
import type { ConfigItem, InputTypes } from "../../types";

export function CreateDialog({
  open,
  onClose,
  onConfirm,
  configs,
  customMessage,
  isConfirmDisabled = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
  customMessage?: string;
  isConfirmDisabled?: boolean;
}) {
  const initialState = React.useMemo(() => {
    const obj: Record<string, any> = {};
    configs.forEach((cfg) => {
      if (cfg.defaultValue !== undefined) {
        obj[cfg.name] =
          cfg.type === "float-input"
            ? String(cfg.defaultValue)
            : cfg.defaultValue;
      } else if (cfg.type === "multi-select") {
        obj[cfg.name] = [];
      } else if (cfg.type === "switch") {
        obj[cfg.name] = false;
      } else {
        obj[cfg.name] = "";
      }
    });
    return obj;
  }, [configs]);

  const [formData, setFormData] = React.useState(initialState);

  React.useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  function handleChange(
    name: string,
    value: string | string[] | boolean,
    type?: InputTypes
  ) {
    let parsedValue: string | number | string[] | boolean = value;

    if (type === "int-input") {
      if (typeof value === "string") {
        parsedValue = value === "" ? "" : parseInt(value, 10);
        if (isNaN(parsedValue as number)) parsedValue = "";
      }
    } else if (type === "float-input") {
      if (typeof value === "string") {
        parsedValue = value;
        if (value !== "" && !isNaN(Number(value))) {
          parsedValue = parseFloat(value);
        }
      }
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Information</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {configs.map((cfg) => {
            const isFullWidth = cfg.type === "multi-select" || cfg.fullWidth;
            const options = cfg.options;

            switch (cfg.type) {
              case "string-input":
              case "int-input":
              case "float-input":
                return (
                  <div
                    key={cfg.name}
                    className={`space-y-1 ${
                      isFullWidth ? "md:col-span-2" : ""
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {cfg.label}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <TextInput
                      id={cfg.name}
                      placeholder={cfg.label}
                      inputType={
                        cfg.type === "string-input" ? "text" : "number"
                      }
                      isFloat={cfg.type === "float-input"}
                      value={String(formData[cfg.name] ?? "")} // تبدیل به رشته
                      onChange={(value) =>
                        handleChange(cfg.name, value, cfg.type as InputTypes)
                      }
                      className="w-full"
                    />
                  </div>
                );

              case "select-box":
                return (
                  <div
                    key={cfg.name}
                    className={`space-y-1 ${
                      isFullWidth ? "md:col-span-2" : ""
                    }`}
                  >
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <SelectBox
                      key={cfg.name}
                      id={cfg.name}
                      options={options}
                      value={formData[cfg.name]}
                      onChange={(val) => handleChange(cfg.name, val)}
                    />
                  </div>
                );

              case "switch":
                return (
                  <div
                    key={cfg.name}
                    className={`flex items-center justify-between space-x-2 ${
                      isFullWidth ? "md:col-span-2" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {cfg.label}
                    </span>
                    <Switch
                      key={cfg.name}
                      checked={formData[cfg.name] || false}
                      onChange={(val) => handleChange(cfg.name, val)}
                    />
                  </div>
                );

              case "multi-select":
                return (
                  <div
                    key={cfg.name}
                    className={`space-y-1 ${
                      isFullWidth ? "md:col-span-2" : ""
                    }`}
                  >
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <MotionMultiSelect
                      key={cfg.name}
                      id={cfg.name}
                      options={options}
                      value={formData[cfg.name] || []}
                      onChange={(val) => handleChange(cfg.name, val)}
                      placeholder=""
                    />
                  </div>
                );

              default:
                return null;
            }
          })}

          {customMessage && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md md:col-span-2">
              {customMessage}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 md:col-span-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isConfirmDisabled}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
