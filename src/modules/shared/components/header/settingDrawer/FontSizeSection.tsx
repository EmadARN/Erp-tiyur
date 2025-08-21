import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { setFontSize } from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

export function FontSizeSection() {
  const dispatch = useDispatch();
  const { fontSize, rtl: isRtl, mode } = useThemeSettings();

  const trackColor = mode === "dark" ? "#2563EB" : "#3B82F6";

  return (
    <div className="mt-8">
      <p
        className={`mb-2 ${isRtl ? "text-right" : "text-left"} ${
          mode === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Size
      </p>

      <div
        className={`relative w-full mt-6`}
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        <input
          type="range"
          min={12}
          max={19}
          step={1}
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: trackColor,
            background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${
              ((fontSize - 12) / (19 - 12)) * 100
            }%, #d1d5db ${((fontSize - 12) / (19 - 12)) * 100}%, #d1d5db 100%)`,
          }}
        />

        <div
          className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded shadow"
          style={{
            [isRtl ? "right" : "left"]: `${
              ((fontSize - 12) / (19 - 12)) * 100
            }%`,
            transform: "translateX(-50%)",
          }}
        >
          {fontSize}px
        </div>
      </div>
    </div>
  );
}
