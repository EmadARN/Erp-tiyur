// import { useState } from "react";
// import Slider from "../ui/Slider";
// import SelectBox from "../ui/Selecbox";
// import Switch from "../ui/Switch";
// import AutoComplete from "../ui/Autocomplete";
// import { InputRangeBox } from "../ui/InputRangeBox";
// import MotionMultiSelect from "../ui/MotionMultiSelect";
// // import log = require("eslint-plugin-react/lib/util/log");
// //
// //
// // const tableHead = [
// //   { columnName: "Member", row_id: "username", type: "string" },
// //   { columnName: "First Name", row_id: "first_name", type: "string" },
// //   {
// //     columnName: "Last Name",
// //     row_id: "last_name",
// //     type: "string",
// //     onClick: (row: any) => {
// //       setSelectedItem(row);
// //     },
// //   },
// //   {
// //     columnName: "Role",
// //     row_id: "role",
// //     type: "string",
// //     options: ["Admin", "User", "Guest"],
// //   },
// // ];
// //
//
//
//
// const TableFilters = [
//
//   {
//     label:'price (Toman)',
//     type:'range',
//         name:'price',
//
//   },
//   {
//         name:'price',
//     label:'location',
//     type:'autocomplete',
//     options:[
//         'vanak',
//         'zanjan',
//         'fereshte'
//     ],
//     placeholder:'search for location'
//
//   },
//   {
//     name:'sort-by',
//
//     label:'sort by',
//     type: 'select-box',
//     options: ['max-price', 'low-price']
//
//   },
//
//   {
//     name:'price-based',
//
//     label:'price-based',
//     type: 'switch'
//
//   },
//
//   {
//     name:'construction-based',
//     label:'costruction select',
//     type:'multi-select',
//     options: ['iran', 'dubai']
//   },
//
//   {
//
//     name:'price',
//     label: 'price',
//     type:'range-box'
//   }
//
//
// ]
// type Filters = {
//   price: [number, number];
//   area: [number, number];
//   year: [number, number];
//   location: string;
//   sortBy: string;
//   hasPhoto: boolean;
//   hasVideo: boolean;
//   pricePerMeter: [number, number];
// };
//
//
// export const DataTableFilters = (
//     {
//       tableFilters
//     }
// ) => {
//   const [filters, setFilters] = useState<Filters>({
//     price: [0, 100000000],
//     area: [0, 300],
//     year: [1380, 1404],
//     location: "",
//     sortBy: "",
//     hasPhoto: false,
//     hasVideo: false,
//     pricePerMeter: [0, 1000000],
//   });
//   const [priceFrom, setPriceFrom] = useState("");
//   const [priceTo, setPriceTo] = useState("");
//   const [directions, setDirections] = useState<string[]>([]);
//
//   const options = [
//     { value: "east", label: "شرقی" },
//     { value: "west", label: "غربی" },
//     { value: "north", label: "شمالی" },
//     { value: "south", label: "جنوبی" },
//   ];
//   const sortOptions = [
//     { value: "newest", label: "Newest" },
//     { value: "cheapest", label: "Cheapest" },
//     { value: "expensive", label: "Most Expensive" },
//   ];
//
//   const handleSliderChange = (
//     name: keyof Pick<Filters, "price" | "area" | "year">,
//     value: [number, number]
//   ) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const handleSwitchChange = (
//     name: keyof Pick<Filters, "hasPhoto" | "hasVideo">,
//     value: boolean
//   ) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const handleSelectChange = (
//     name: keyof Pick<Filters, "location" | "sortBy">,
//     value: string
//   ) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const handleInputRangeChange = (
//     name: keyof Pick<Filters, "pricePerMeter">,
//     value: [number, number]
//   ) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//
//   const fetchLocationSuggestions = async (query: string, options:any): Promise<string[]> => {
//     const allLocations = options;
//     return allLocations.filter((loc) =>
//       loc.toLowerCase().includes(query.toLowerCase())
//     );
//   };
//
//   const applyFilters = () => {
//     console.log(filters);
//   };
//
//   return (
//     <div className="space-y-6 p-4 bg-white rounded-lg shadow">
//       {/* همه فیلترها به صورت ستونی */}
//       <div className="flex flex-col gap-6">
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Price (Toman)
//           </label>
//           <Slider
//             value={filters.price}
//             min={0}
//             max={100000000}
//             step={1000000}
//             onChange={(val) =>
//               handleSliderChange("price", val as [number, number])
//             }
//             formatNumber={(val) => val.toLocaleString("en-US")}
//           />
//         </div>
//
//         <div>
//           <label className="block text-sm font-medium mb-2">Area (m²)</label>
//           <Slider
//             value={filters.area}
//             min={0}
//             max={300}
//             step={5}
//             onChange={(val) =>
//               handleSliderChange("area", val as [number, number])
//             }
//             formatNumber={(val) => val.toString()}
//           />
//         </div>
//
//         <div>
//           <label className="block text-sm font-medium mb-2">Build Year</label>
//           <Slider
//             value={filters.year}
//             min={1360}
//             max={1404}
//             step={1}
//             onChange={(val) =>
//               handleSliderChange("year", val as [number, number])
//             }
//           />
//         </div>
//
//         <div>
//           <label className="block text-sm font-medium mb-2">Location</label>
//           <AutoComplete
//             fetchSuggestions={(query)=>fetchLocationSuggestions(query, ['vanak', 'gdgd'])}
//             onSelect={(value) => handleSelectChange("location", value)}
//             placeholder="Search for location..."
//           />
//         </div>
//
//         <div>
//           <label className="block text-sm font-medium mb-2">Sort by</label>
//           <SelectBox
//             options={sortOptions}
//             value={filters.sortBy}
//             onChange={(val) => handleSelectChange("sortBy", val)}
//           />
//         </div>
//
//         <div>
//           <label className="text-sm font-medium mb-2">Media Options</label>
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <span>Has Photo</span>
//               <Switch
//                 checked={filters.hasPhoto}
//                 onChange={(val) => handleSwitchChange("hasPhoto", val)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <span>Has Video</span>
//               <Switch
//                 checked={filters.hasVideo}
//                 onChange={(val) => handleSwitchChange("hasVideo", val)}
//               />
//             </div>
//           </div>
//         </div>
//
//         <div>
//           <MotionMultiSelect
//             options={options}
//             value={directions}
//             onChange={setDirections}
//             placeholder="انتخاب جهت ساختمان"
//           />
//         </div>
//
//         <div>
//           <InputRangeBox
//             label="Price"
//             valueFrom={priceFrom}
//             valueTo={priceTo}
//             onChangeFrom={(val) => setPriceFrom(val)}
//             onChangeTo={(val) => setPriceTo(val)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

import { useCallback } from "react";
import Slider from "../ui/Slider";
import SelectBox from "../ui/Selecbox";
import Switch from "../ui/Switch";
import AutoComplete from "../ui/Autocomplete";
import { InputRangeBox } from "../ui/InputRangeBox";
import MotionMultiSelect from "../ui/MotionMultiSelect";

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
  options?: any[];
  placeholder?: string;
  defaultValue?: any; // مقدار پیش‌فرض جدید
  min?: number;
  max?: number;
  step?: number;
};

interface DynamicFiltersProps {
  filtersConfig: FilterItem[];
  data: Record<string, any>;
  setData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const DynamicFilters = ({
  filtersConfig,
  data,
  setData,
}: DynamicFiltersProps) => {
  const handleChange = useCallback(
    (name: string, value: any, type: string) => {
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
                      (filter.options ?? []).filter((opt) =>
                        opt.toLowerCase().includes(query.toLowerCase())
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
