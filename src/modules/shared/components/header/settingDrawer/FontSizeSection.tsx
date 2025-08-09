import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { setFontSize } from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

export function FontSizeSection() {
  const dispatch = useDispatch();
  const { fontSize, rtl: isRtl, direction } = useThemeSettings();

  return (
    <div className="mt-8">
      <p
        className={`text-xs text-gray-600 mb-2 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        Size
      </p>
      <div
        className={`relative w-full mt-6 ${isRtl ? "direction-rtl" : ""}`}
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        <input
          type="range"
          min={12}
          max={24}
          step={1}
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
          className={`w-full h-2 rounded-lg bg-green-900 appearance-none cursor-pointer accent-primary ${
            isRtl ? "rtl-range" : ""
          }`}
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        />
        <div
          className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow"
          style={{
            [isRtl ? "left" : "left"]: `${
              isRtl
                ? ((24 - fontSize) / (24 - 12)) * 100
                : ((fontSize - 12) / (24 - 12)) * 100
            }%`,
            transform: isRtl ? "translateX(50%)" : "translateX(-50%)",
          }}
        >
          {fontSize}px
        </div>
      </div>
    </div>
  );
}
