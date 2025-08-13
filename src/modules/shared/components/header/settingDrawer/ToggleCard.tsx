import Switch from "../../ui/Switch";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onToggle: () => void;
};

export function ToggleCard({ icon, label, value, onToggle }: Props) {
  const { rtl: isRtl } = useThemeSettings();

  return (
    <div
      className={`
        group rounded-xl p-4 flex flex-col justify-between
        bg-sidebar text-sidebar-foreground
        hover:bg-sidebar/80
      `}
    >
      <div
        className={`w-full flex justify-between gap-2 ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <span>{icon}</span>
        <Switch
          checked={value}
          onChange={onToggle}
          trackClassName="bg-sidebar-border"
        />
      </div>
      <div className={`pt-4 ${isRtl ? "text-right" : ""}`}>
        <span className="font-bold">{label}</span>
      </div>
    </div>
  );
}
