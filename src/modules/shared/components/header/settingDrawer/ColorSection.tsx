type Settings = {
  color: string;
};

type Props = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

export function ColorSection({ settings, updateSettings }: Props) {
  return (
    <div className="mt-8">
      <p className="text-xs text-gray-600 mb-2">Color</p>
      <div className="flex gap-3">
        <button
          onClick={() => updateSettings({ color: "integrate" })}
          className={`flex-1 h-14 rounded-lg border ${
            settings.color === "integrate"
              ? "border-green-500 bg-green-50"
              : "border-gray-200"
          }`}
        >
          <div className="text-sm font-medium text-gray-700">Integrate</div>
        </button>
        <button
          onClick={() => updateSettings({ color: "apparent" })}
          className={`flex-1 h-14 rounded-lg border ${
            settings.color === "apparent"
              ? "border-gray-500 bg-gray-100"
              : "border-gray-200"
          }`}
        >
          <div className="text-sm font-medium text-gray-700">Apparent</div>
        </button>
      </div>
    </div>
  );
}
