import { BsMoon } from "react-icons/bs";
import { MdOutlineFormatTextdirectionRToL } from "react-icons/md";
import { ToggleCard } from "./ToggleCard";

type Settings = {
  mode: boolean;
  rtl: boolean;
};

type Props = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

export function ToggleSection({ settings, updateSettings }: Props) {
  const toggle = (key: keyof Settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ToggleCard
        icon={<BsMoon />}
        label="Mode"
        value={settings.mode}
        onToggle={() => toggle("mode")}
      />
      <ToggleCard
        icon={<MdOutlineFormatTextdirectionRToL />}
        label="Right to left"
        value={settings.rtl}
        onToggle={() => toggle("rtl")}
      />
    </div>
  );
}
