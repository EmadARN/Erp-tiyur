type Settings = {
  fontSize: number;
};

type Props = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

export function FontSizeSection({ settings, updateSettings }: Props) {
  return (
    <div className="mt-8">
      <p className="text-xs text-gray-600 mb-2">Size</p>
      <div className="relative w-full mt-6">
        <input
          type="range"
          min={12}
          max={24}
          step={1}
          value={settings.fontSize}
          onChange={(e) =>
            updateSettings({ fontSize: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div
          className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow"
          style={{
            left: `${((settings.fontSize - 12) / (24 - 12)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {settings.fontSize}px
        </div>
      </div>
    </div>
  );
}
