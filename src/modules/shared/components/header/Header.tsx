import { FiBell } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";
import Badge from "../ui/Badge";
import { AccountDrawer } from "./AccountDrawer";
import { openSettingsDrawer } from "../../store/slice/settingsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";


const Header = () => {
  const dispatch = useAppDispatch();
  

  return (
    <header
      className={`flex flex-col sm:flex-row justify-between items-center p-4 bg-white `}
    >
      {/* سمت چپ: لوگو و متن */}
      <div
        className={`flex items-center mb-2 sm:mb-0 space-x-2 `}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm sm:text-base">T1</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-gray-700 font-semibold text-sm sm:text-base">
            Team 1
          </span>
          <span className="text-gray-500 text-xs sm:text-sm">Free</span>
        </div>
        <svg
          className="w-4 h-4 text-gray-500 hidden sm:block"
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

      {/* سمت راست: آیکون‌ها */}
      <div
        className={`flex items-center space-x-4 `}
      >
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
