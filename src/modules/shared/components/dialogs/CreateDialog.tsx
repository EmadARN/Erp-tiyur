import React, { useState, useEffect } from "react";
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

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
}

export function CreateDialog({
  open,
  onClose,
  onConfirm,
  configs,
}: CreateDialogProps) {
  // ساخت state اولیه براساس configs و defaultValue ها
  const initialState = React.useMemo(() => {
    const obj: Record<string, any> = {};
    configs.forEach((cfg) => {
      if (cfg.defaultValue !== undefined) obj[cfg.name] = cfg.defaultValue;
      else
        obj[cfg.name] =
          cfg.type === "multi-select" ? [] : cfg.type === "switch" ? false : "";
    });
    return obj;
  }, [configs]);

  const [formData, setFormData] = useState<Record<string, any>>(initialState);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  // هندل تغییر مقدار در ورودی‌ها
  function handleChange(name: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // هندل submit فرم
  function handleSubmit(e: React.FormEvent) {

    
    e.preventDefault();
    console.log("formData",formData)
    onConfirm(formData);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-6 max-w-lg w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Create Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {configs.map((cfg) => {
            const options: OptionType[] = (cfg.options ?? []).map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            );

            switch (cfg.type) {
              case "string-input":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label
                      htmlFor={cfg.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {cfg.label}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <TextInput
                      id={cfg.name}
                      placeholder={cfg.label}
                      inputType="text"
                      value={formData[cfg.name] || ""}
                      onChange={(e) => handleChange(cfg.name, e)}
                      className="w-full"
                    />
                  </div>
                );

              case "select-box":
                return (
                  <div key={cfg.name} className="space-y-1">
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
                    className="flex items-center justify-between space-x-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {cfg.label}
                    </span>
                    <Switch
                      checked={formData[cfg.name] || false}
                      onChange={(val) => handleChange(cfg.name, val)}
                    />
                  </div>
                );

              case "multi-select":
                return (
                  <div key={cfg.name} className="space-y-1">
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

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
