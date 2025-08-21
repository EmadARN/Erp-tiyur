import { FiBell } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import Badge from "../ui/Badge";
import { AccountDrawer } from "./AccountDrawer";
import { openSettingsDrawer } from "../../store/slice/settingsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useThemeSettings } from "../../hooks/useThemeSettings";
import SearchDropdown from "./SearchDropdown";
import { cn } from "@/modules/shared/helpers";

const Header = () => {
  const dispatch = useAppDispatch();
  const { rtl, mode } = useThemeSettings();

  return (
    <header
      className={cn(
        "flex flex-col sm:flex-row items-center p-4",
        rtl ? "flex-row-reverse justify-start" : "flex-row justify-end",
        mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      )}
    >
      <div
        className={cn(
          "flex items-center space-x-4",
          rtl && "flex-row-reverse space-x-reverse"
        )}
      >
        <SearchDropdown />
        <Badge content={4} color="bg-orange-600">
          <FiBell className="text-xl cursor-pointer" />
        </Badge>

        <div className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer">
          <HiOutlineUsers className="text-lg sm:text-xl" />
        </div>

        <div
          onClick={() => dispatch(openSettingsDrawer())}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
        >
          <AiOutlineSetting className="text-lg sm:text-xl" />
        </div>

        <AccountDrawer />
      </div>
    </header>
  );
};

export default Header;
