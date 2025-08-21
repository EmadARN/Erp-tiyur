import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import {
  setPreset,
  type PresetColor,
} from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

const presets: { value: PresetColor; color: string }[] = [
  { value: "blue", color: "bg-blue-500" },
  { value: "green", color: "bg-green-500" },
  { value: "purple", color: "bg-purple-500" },
  { value: "orange", color: "bg-orange-500" },
];

export function PresetSection() {
  const { preset, mode, rtl: isRtl, direction } = useThemeSettings();
  const dispatch = useDispatch();
  const isDark = mode === "dark";

  return (
    <div className="mt-8">
      {/* Title */}
      <p
        className={`mb-2 ${isRtl ? "text-right" : "text-left"} ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Preset
      </p>

      {/* Preset Grid */}
      <div className={`grid grid-cols-2 gap-4`} style={{ direction }}>
        {presets.map(({ value, color }) => {
          const isActive = preset === value;

          return (
            <button
              key={value}
              onClick={() => dispatch(setPreset(value))}
              className={`w-full aspect-video flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? `${isDark ? "bg-gray-700  " : "bg-gray-100  "}`
                    : isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }
                ${isRtl ? "flex-row-reverse" : "flex-row"}
              `}
            >
              <div className={`w-6 h-6 rounded-sm ${color}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
