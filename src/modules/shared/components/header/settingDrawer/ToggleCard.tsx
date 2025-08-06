import Switch from "../../ui/Switch";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onToggle: () => void;
};

export function ToggleCard({ icon, label, value, onToggle }: Props) {
  return (
    <div className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex flex-col justify-between">
      <div className="w-full flex justify-between gap-2 text-gray-700">
        <span className="text-xl">{icon}</span>
        <Switch checked={value} onChange={onToggle} />
      </div>
      <div className="pt-4">
        <span className="text-xs font-bold">{label}</span>
      </div>
    </div>
  );
}
