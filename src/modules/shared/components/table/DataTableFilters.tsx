import { useState } from "react";
import Slider from "../ui/Slider";
import SelectBox from "../ui/Selecbox";
import Switch from "../ui/Switch";
import AutoComplete from "../ui/Autocomplete";
import { InputRangeBox } from "../ui/InputRangeBox";
import MotionMultiSelect from "../ui/MotionMultiSelect";

type Filters = {
  price: [number, number];
  area: [number, number];
  year: [number, number];
  location: string;
  sortBy: string;
  hasPhoto: boolean;
  hasVideo: boolean;
  pricePerMeter: [number, number];
};

export const DataTableFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    price: [0, 100000000],
    area: [0, 300],
    year: [1380, 1404],
    location: "",
    sortBy: "",
    hasPhoto: false,
    hasVideo: false,
    pricePerMeter: [0, 1000000],
  });
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [directions, setDirections] = useState<string[]>([]);

  const options = [
    { value: "east", label: "شرقی" },
    { value: "west", label: "غربی" },
    { value: "north", label: "شمالی" },
    { value: "south", label: "جنوبی" },
  ];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "cheapest", label: "Cheapest" },
    { value: "expensive", label: "Most Expensive" },
  ];

  const handleSliderChange = (
    name: keyof Pick<Filters, "price" | "area" | "year">,
    value: [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (
    name: keyof Pick<Filters, "hasPhoto" | "hasVideo">,
    value: boolean
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    name: keyof Pick<Filters, "location" | "sortBy">,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputRangeChange = (
    name: keyof Pick<Filters, "pricePerMeter">,
    value: [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLocationSuggestions = async (query: string): Promise<string[]> => {
    const allLocations = [
      "Vanak",
      "Punak",
      "Zafaraniyeh",
      "Saadat Abad",
      "Sattar Khan",
    ];
    return allLocations.filter((loc) =>
      loc.toLowerCase().includes(query.toLowerCase())
    );
  };

  const applyFilters = () => {
    console.log(filters);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {/* همه فیلترها به صورت ستونی */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Price (Toman)
          </label>
          <Slider
            value={filters.price}
            min={0}
            max={100000000}
            step={1000000}
            onChange={(val) =>
              handleSliderChange("price", val as [number, number])
            }
            formatNumber={(val) => val.toLocaleString("en-US")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Area (m²)</label>
          <Slider
            value={filters.area}
            min={0}
            max={300}
            step={5}
            onChange={(val) =>
              handleSliderChange("area", val as [number, number])
            }
            formatNumber={(val) => val.toString()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Build Year</label>
          <Slider
            value={filters.year}
            min={1360}
            max={1404}
            step={1}
            onChange={(val) =>
              handleSliderChange("year", val as [number, number])
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <AutoComplete
            fetchSuggestions={fetchLocationSuggestions}
            onSelect={(value) => handleSelectChange("location", value)}
            placeholder="Search for location..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort by</label>
          <SelectBox
            options={sortOptions}
            value={filters.sortBy}
            onChange={(val) => handleSelectChange("sortBy", val)}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2">Media Options</label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span>Has Photo</span>
              <Switch
                checked={filters.hasPhoto}
                onChange={(val) => handleSwitchChange("hasPhoto", val)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Has Video</span>
              <Switch
                checked={filters.hasVideo}
                onChange={(val) => handleSwitchChange("hasVideo", val)}
              />
            </div>
          </div>
        </div>

        <div>
          <MotionMultiSelect
            options={options}
            value={directions}
            onChange={setDirections}
            placeholder="انتخاب جهت ساختمان"
          />
        </div>

        <div>
          <InputRangeBox
            label="Price"
            valueFrom={priceFrom}
            valueTo={priceTo}
            onChangeFrom={(val) => setPriceFrom(val)}
            onChangeTo={(val) => setPriceTo(val)}
          />
        </div>
      </div>
    </div>
  );
};
