import { useCallback } from "react";
import Slider from "../ui/Slider";
import SelectBox from "../ui/Selecbox";
import Switch from "../ui/Switch";
import AutoComplete from "../ui/Autocomplete";
import { InputRangeBox } from "../ui/InputRangeBox";
import MotionMultiSelect from "../ui/MotionMultiSelect";
import { type FiltersRecord } from "@/modules/buys/model/buysProduct";
import { type OptionType } from "../../types/common";

type FilterItem = {
  label: string;
  type:
    | "range"
    | "autocomplete"
    | "select-box"
    | "switch"
    | "multi-select"
    | "range-box";
  name: string;
  options?: OptionType[];
  placeholder?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
};

interface DynamicFiltersProps {
  filtersConfig: FilterItem[];
  data: FiltersRecord;
  setData: React.Dispatch<React.SetStateAction<FiltersRecord>>;
}

export const DynamicFilters = ({
  filtersConfig,
  data,
  setData,
}: DynamicFiltersProps) => {
  const handleChange = useCallback(
    (
      name: string,
      value: any,
      type: FilterItem["type"] // ← اینجا به جای string
    ) => {
      const isEmpty =
        value === "" ||
        value === null ||
        (Array.isArray(value) && value.length === 0);

      setData((prev) => {
        const updated = { ...prev };
        if (isEmpty) {
          delete updated[name];
        } else {
          updated[name] = { name, value, type };
        }
        return updated;
      });
    },
    [setData]
  );

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {filtersConfig.map((filter) => {
        const storedValue = data[filter.name]?.value;

        // اگر مقدار ذخیره شده نباشه، اولویت با defaultValue هست
        const value =
          storedValue !== undefined
            ? storedValue
            : filter.defaultValue !== undefined
            ? filter.defaultValue
            : filter.type === "range" || filter.type === "range-box"
            ? [0, 0]
            : filter.type === "switch"
            ? false
            : filter.type === "multi-select"
            ? []
            : "";

        switch (filter.type) {
          case "range":
            return (
              <div key={filter.name}>
                <label className="block text-sm font-medium mb-2">
                  {filter.label}
                </label>
                <Slider
                  value={value}
                  min={filter.min ?? 0}
                  max={filter.max ?? 10000000}
                  step={filter.step ?? 1000}
                  onChange={(val) =>
                    handleChange(filter.name, val, filter.type)
                  }
                />
              </div>
            );

          case "autocomplete":
            return (
              <div key={filter.name}>
                <label className="block text-sm font-medium mb-2">
                  {filter.label}
                </label>
                <AutoComplete
                  fetchSuggestions={(query) =>
                    Promise.resolve(
                      (filter.options ?? [])
                        .map((opt) =>
                          typeof opt === "string" ? opt : opt.label
                        )
                        .filter((label) =>
                          label.toLowerCase().includes(query.toLowerCase())
                        )
                    )
                  }
                  onSelect={(val) =>
                    handleChange(filter.name, val, filter.type)
                  }
                  placeholder={filter.placeholder ?? ""}
                />
              </div>
            );

          case "select-box":
            return (
              <div key={filter.name}>
                <label className="block text-sm font-medium mb-2">
                  {filter.label}
                </label>
                <SelectBox
                  options={(filter.options ?? []).map((opt) =>
                    typeof opt === "string" ? { value: opt, label: opt } : opt
                  )}
                  value={value}
                  onChange={(val) =>
                    handleChange(filter.name, val, filter.type)
                  }
                />
              </div>
            );

          case "switch":
            return (
              <div
                key={filter.name}
                className="flex items-center justify-between"
              >
                <span>{filter.label}</span>
                <Switch
                  checked={value}
                  onChange={(val) =>
                    handleChange(filter.name, val, filter.type)
                  }
                />
              </div>
            );

          case "multi-select":
            return (
              <div key={filter.name}>
                <label className="block text-sm font-medium mb-2">
                  {filter.label}
                </label>
                <MotionMultiSelect
                  options={(filter.options ?? []).map((opt) =>
                    typeof opt === "string" ? { value: opt, label: opt } : opt
                  )}
                  value={value}
                  onChange={(val) =>
                    handleChange(filter.name, val, filter.type)
                  }
                  placeholder={filter.placeholder ?? ""}
                />
              </div>
            );

          case "range-box":
            return (
              <div key={filter.name}>
                <InputRangeBox
                  label={filter.label}
                  valueFrom={value[0]}
                  valueTo={value[1]}
                  onChangeFrom={(val) =>
                    handleChange(filter.name, [val, value[1]], filter.type)
                  }
                  onChangeTo={(val) =>
                    handleChange(filter.name, [value[0], val], filter.type)
                  }
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
