import { fonts } from "@/modules/shared/constants/data";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import {
  setFont,
  type FontFamily,
} from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

export function FontSection() {
  const dispatch = useDispatch();
  const { rtl, font } = useThemeSettings();
  return (
    <div className="mt-8">
      <p
        className={`text-xs text-gray-600 mb-2 text-left `}
      >
        Font
      </p>
      <p className="text-xs text-gray-600 mb-2 mt-4">Family</p>
      <div className="grid grid-cols-2 gap-4">
        {fonts.map((f) => (
          <button
            key={f.value}
            onClick={() => dispatch(setFont(f.value as FontFamily))}
            className={`rounded-xl p-4 border text-left ${
              font === f.value
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className={`text-xl mb-1 ${f.fontClass}`}>Aa</div>
            <div className="text-sm text-gray-700">{f.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
