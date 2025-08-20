import { FiBell } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import Badge from "../ui/Badge";
import { AccountDrawer } from "./AccountDrawer";
import { openSettingsDrawer } from "../../store/slice/settingsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useThemeSettings } from "../../hooks/useThemeSettings";
import SearchDropdown from "./SearchDropdown";

const Header = () => {
  const dispatch = useAppDispatch();
  const { rtl } = useThemeSettings();

  return (
    <header
      className={`flex flex-col sm:flex-row justify-end items-center p-4 bg-white ${
        rtl ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`flex items-center ${
          rtl ? "flex-row-reverse space-x-4 space-x-reverse" : "space-x-4"
        }`}
      >
        <SearchDropdown />
        <Badge content={4} color="bg-orange-600">
          <FiBell className="text-xl text-gray-700 cursor-pointer" />
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
