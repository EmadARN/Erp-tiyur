import { FaUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import Badge from "../ui/Badge";
import { FiBell } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white ">
      <div className="flex items-center space-x-2">
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
      <div className="flex items-center space-x-4">
        <Badge content={4} color="bg-orange-600">
          <FiBell className="text-xl text-gray-700" />
        </Badge>

        <div className="w-5 h-5  rounded-full flex items-center justify-center">
          <HiOutlineUsers className=" text-xl" />
        </div>
        <div className="w-5 h-5  rounded-full flex items-center justify-center">
          <AiOutlineSetting className="text-xl" />
        </div>
        <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
          <FaUser className="w-4 h-4 text-purple-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
