import { FiBell } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import Badge from "../ui/Badge";
import { AccountDrawer } from "./AccountDrawer";
import { openSettingsDrawer } from "../../store/slice/settingsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useThemeSettings } from "../../hooks/useThemeSettings";

const Header = () => {
  const dispatch = useAppDispatch();
  const { rtl } = useThemeSettings();

  return (
    <header
      className={`flex justify-between items-center p-4 bg-white ${
        rtl ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`flex items-center ${
          rtl ? "space-x-reverse space-x-2" : "space-x-2"
        }`}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
          <span className="text-white font-bold">T1</span>
        </div>
        <span className="text-gray-700 font-semibold">Team 1</span>
        <span className="text-gray-500 text-sm">Free</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* سمت آیکون‌ها */}
      <div
        className={`flex items-center ${
          rtl ? "flex-row-reverse space-x-4" : "space-x-4"
        }`}
      >
        <Badge content={4} color="bg-orange-600">
          <FiBell className="text-xl text-gray-700 cursor-pointer" />
        </Badge>

        <div className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer">
          <HiOutlineUsers className="text-xl" />
        </div>

        <div
          onClick={() => dispatch(openSettingsDrawer())}
          className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
        >
          <AiOutlineSetting className="text-xl" />
        </div>

        <AccountDrawer />
      </div>
    </header>
  );
};

export default Header;
