
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
import type { ConfigItem, InputTypes } from "../../types";
import { type BuyProduct } from "@/modules/buys/model/buysProduct";
import { flattenObject, formatKey } from "../../helpers/dialogUtils";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Record<string, any>) => void;
  configs: ConfigItem[];
  data: BuyProduct | null;
  useGetBuyProductDetailsQuery: (
    params: { id: string },
    options: { skip?: boolean }
  ) => {
    data?: BuyProduct;
    isLoading: boolean;
    isFetching: boolean;
    error?: any;
  };
}

export function UpdateDialog({
  open,
  onClose,
  onConfirm,
  useGetBuyProductDetailsQuery,
  configs,
  data,
}: UpdateDialogProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const { data: detailData } = useGetBuyProductDetailsQuery(
    { id: data?.id || "" },
    { skip: !data?.id }
  );

  React.useEffect(() => {
    if (detailData) {
      setFormData(flattenObject(detailData));
    } else if (data) {
      setFormData(flattenObject(data));
    }
  }, [detailData, data]);

  function handleChange(
    name: string,
    value: string | string[] | boolean,
    type?: InputTypes
  ) {
    let parsedValue: string | number | string[] | boolean = value;

    if (type === "int-input" && typeof value === "string") {
      parsedValue = value === "" ? "" : parseInt(value, 10);
      if (isNaN(parsedValue as number)) parsedValue = "";
    } else if (type === "float-input" && typeof value === "string") {
      parsedValue =
        value !== "" && !isNaN(Number(value)) ? parseFloat(value) : value;
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

  // پیشوندهایی که باید گروه‌بندی شوند
  const groupPrefixes = [
    "verified",
    "Received",
    "Finished",
    "Done",
    "Cancelled",
  ];

  // دسته‌بندی configs بر اساس پیشوند
  const grouped = configs.reduce((acc, cfg) => {
    const prefix = groupPrefixes.find((p) =>
      cfg.name.toLowerCase().startsWith(p.toLowerCase())
    );
    if (prefix) {
      if (!acc[prefix]) acc[prefix] = [];
      acc[prefix].push(cfg);
    } else {
      if (!acc._others) acc._others = [];
      acc._others.push(cfg);
    }
    return acc;
  }, {} as Record<string, ConfigItem[]>);

  // تابع رندر هر آیتم
  function renderConfigItem(cfg: ConfigItem) {
    const isFullWidth = cfg.type === "multi-select" || cfg.fullWidth;

    const options: { value: string; label: string }[] = (cfg.options ?? []).map(
      (opt) =>
        typeof opt === "string"
          ? { value: opt, label: opt }
          : { value: String(opt.value), label: opt.label }
    );

    const value = formData[cfg.name];

    switch (cfg.type) {
      case "string-input":
      case "int-input":
      case "float-input":
        return (
          <div
            key={cfg.name}
            className={`space-y-1 ${isFullWidth ? "md:col-span-2" : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700">
              {formatKey(cfg.label || cfg.name)}
              {cfg.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <TextInput
              id={cfg.name}
              placeholder={cfg.label}
              inputType={cfg.type === "string-input" ? "text" : "number"}
              isFloat={cfg.type === "float-input"}
              value={String(value ?? "")}
              onChange={(val) =>
                handleChange(cfg.name, val, cfg.type as InputTypes)
              }
              className="w-full"
            />
          </div>
        );

      case "select-box":
        return (
          <div
            key={cfg.name}
            className={`space-y-1 ${isFullWidth ? "md:col-span-2" : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700">
              {formatKey(cfg.label || cfg.name)}
              {cfg.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <SelectBox
              id={cfg.name}
              options={options}
              value={String(value ?? "")}
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
          <div
            key={cfg.name}
            className={`space-y-1 ${isFullWidth ? "md:col-span-2" : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700">
              {formatKey(cfg.label || cfg.name)}
              {cfg.required && <span className="text-red-500 ml-1">*</span>}
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
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      maxWidthClass="max-w-xl"
    >
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Information</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* رندر فیلدهای معمولی */}
          {grouped._others?.map((cfg) => renderConfigItem(cfg))}

          {/* رندر گروه‌های خاص */}
          {Object.entries(grouped).map(([prefix, items]) => {
            if (prefix === "_others") return null;
            return (
              <div
                key={prefix}
                className="md:col-span-2 border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <h3 className="font-semibold text-gray-700">{prefix} Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((cfg) => renderConfigItem(cfg))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end gap-3 pt-4 md:col-span-2">
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
