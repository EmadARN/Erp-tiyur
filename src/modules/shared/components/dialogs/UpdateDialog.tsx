import { Button } from "@/modules/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/Dialog";
import * as React from "react";
import SelectBox from "@/modules/shared/components/ui/Selecbox";
import Switch from "@/modules/shared/components/ui/Switch";
import MotionMultiSelect from "@/modules/shared/components/ui/MotionMultiSelect";
import TextInput from "../ui/TextInput";
import type { ConfigItem, InputTypes, OptionType } from "../../types";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
  data: Record<string, any>;
}

// همون تابع flattenObject از DetailDialog
const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
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

// تابع قشنگ کردن متن لیبل مثل DetailDialog
const formatKey = (key: string) => {
  const words = key.replace(/_/g, " ").split(" ");
  const uniqueWords = words.filter(
    (word, index, arr) => word && word !== arr[index - 1]
  );
  return uniqueWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function UpdateDialog({
  open,
  onClose,
  onConfirm,
  useGetBuyProductDetailsQuery,
  configs,
  data,
}: UpdateDialogProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const { data: detailData} = useGetBuyProductDetailsQuery(
    { id: data.id },
    {
      skip: !data?.id, 
    }
  );

  React.useEffect(() => {
    console.log("detao;",detailData)
    if (detailData) {
      const flat = flattenObject(detailData);
      setFormData(flat);
    }
  }, [detailData]);
  

  function handleChange(
    name: string,
    value: string | string[] | boolean,
    type?: InputTypes
  ) {
    let parsedValue: string | number | string[] | boolean = value;

    if (type === "int-input") {
      console.log("1");
      if (typeof value === "string") {
        console.log("2");
        parsedValue = value === "" ? "" : parseInt(value, 10);

        if (isNaN(parsedValue as number)) parsedValue = "";
      }
      console.log("3");
    } else if (type === "float-input") {
      console.log("4");
      if (typeof value === "string") {
        parsedValue = value;
        if (value !== "" && !isNaN(Number(value))) {
          parsedValue = parseFloat(value);
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="space-y-6 max-w-lg w-full px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {configs.map((cfg) => {
            const options: OptionType[] = (cfg.options ?? []).map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            );

            const value = formData[cfg.name];

            switch (cfg.type) {
              case "string-input":
              case "int-input":
              case "float-input":
                return (
                  <div key={cfg.name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {formatKey(cfg.label || cfg.name)}
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
                      value={String(value ?? "")}
                      onChange={(value) =>
                        handleChange(cfg.name, value, cfg.type as InputTypes)
                      }
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
                      {formatKey(cfg.label || cfg.name)}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <SelectBox
                      id={cfg.name}
                      options={options}
                      value={value ?? ""}
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
                      {formatKey(cfg.label || cfg.name)}
                    </span>
                    <Switch
                      checked={Boolean(value)}
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
                      {formatKey(cfg.label || cfg.name)}
                      {cfg.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <MotionMultiSelect
                      id={cfg.name}
                      options={options}
                      value={value ?? []}
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
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
