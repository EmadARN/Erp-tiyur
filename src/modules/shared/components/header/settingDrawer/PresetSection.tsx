import { presets } from "@/modules/shared/constants/data";

type Settings = {
  preset: string;
};

type Props = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

export function PresetSection({ settings, updateSettings }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-bold px-3 py-1 inline-block bg-gray-800 text-white rounded-full mb-3">
        Presets
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => updateSettings({ preset: preset.value })}
            className={`w-full aspect-video flex items-center justify-center rounded-xl ${
              settings.preset === preset.value
                ? "bg-gray-100 ring-2 ring-offset-2 ring-green-500"
                : "hover:bg-gray-50"
            }`}
          >
            <div className={`w-6 h-6 rounded-sm ${preset.color}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
