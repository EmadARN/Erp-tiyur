import { fonts } from "@/modules/shared/constants/data";

type Settings = {
  font: string;
};

type Props = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

export function FontSection({ settings, updateSettings }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-bold px-3 py-1 inline-block bg-gray-800 text-white rounded-full mb-3">
        Font
      </h3>
      <p className="text-xs text-gray-600 mb-2 mt-4">Family</p>
      <div className="grid grid-cols-2 gap-4">
        {fonts.map((font) => (
          <button
            key={font.value}
            onClick={() => updateSettings({ font: font.value })}
            className={`rounded-xl p-4 border text-left ${
              settings.font === font.value
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            <div className={`text-xl mb-1 ${font.fontClass}`}>Aa</div>
            <div className="text-sm text-gray-700">{font.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
