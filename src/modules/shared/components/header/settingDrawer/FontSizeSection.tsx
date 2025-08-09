import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { setFontSize } from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

export function FontSizeSection() {
  const dispatch = useDispatch();
  const { fontSize } = useThemeSettings();

  return (
    <div className="mt-8">
      <p className="text-xs text-text-secondary mb-2">Size</p>
      <div className="relative w-full mt-6">
        <input
          type="range"
          min={12}
          max={24}
          step={1}
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(parseInt(e.target.value)))}
          className="w-full h-2 rounded-lg bg-green-900 appearance-none cursor-pointer accent-primary"
        />
        <div
          className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow"
          style={{
            left: `${((fontSize - 12) / (24 - 12)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {fontSize}px
        </div>
      </div>
    </div>
  );
}
