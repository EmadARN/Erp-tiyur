import { Button } from "@/modules/shared/components/ui/Button";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { setSidebarColor } from "@/modules/shared/store/slice/themeSlice";
import { useDispatch } from "react-redux";

export function ColorSection() {
  const dispatch = useDispatch();
  const { sidebarColor } = useThemeSettings();

  return (
    <div className="mt-8">
      <p className="text-xs text-gray-600 mb-2">Color</p>
      <div className="flex gap-3">
        <Button
          onClick={() => dispatch(setSidebarColor("white"))}
          variant={sidebarColor === "white" ? "default" : "outline"}
          className={
            sidebarColor === "white"
              ? "bg-green-500 hover:bg-green-600"
              : "border-gray-200"
          }
          size="lg"
        >
          Integrate
        </Button>

        <Button
          onClick={() => dispatch(setSidebarColor("rgb(16,24,40)"))}
          variant={sidebarColor === "rgb(16,24,40)" ? "default" : "outline"}
          className={
            sidebarColor === "rgb(16,24,40)"
              ? "bg-gray-500 hover:bg-gray-600"
              : "border-gray-200"
          }
          size="lg"
        >
          Apparent
        </Button>
      </div>
    </div>
  );
}
