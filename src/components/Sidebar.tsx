"use client";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiThumbsUp, FiLogOut } from "react-icons/fi";
import { BsEmojiSunglasses } from "react-icons/bs";

import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, handleLogout } from "@/services/authService";

const Sidebar = () => {
  const user = getCurrentUser();

  return (
    <div className="h-full w-1/5 bg-gray-200">
      <p className="w-full flex items-center mx-5 h-20 text-2xl font-medium text-[#1DA1F2]">
        mweeter
      </p>
      <div id="navbar">
        <Link href="/dashboard">
          <div className="text-gray-600 flex items-center mx-3 p-2 rounded hover:bg-gray-300 hover:cursor-pointer">
            <BiHomeAlt2 className="w-5 h-5 text-gray-600" />
            <p className="ml-4">Home</p>
          </div>
        </Link>
        <Link href="/dashboard/following">
          <div className="text-gray-600 flex items-center mx-3 p-2 rounded hover:bg-gray-300 hover:cursor-pointer">
            <FiThumbsUp className="w-5 h-5 text-gray-600" />
            <p className="ml-4">Following</p>
          </div>
        </Link>
        <Link href="/dashboard/profile">
          <div className="text-gray-600 flex items-center mx-3 p-2 rounded hover:bg-gray-300 hover:cursor-pointer">
            <BsEmojiSunglasses className="w-5 h-5 text-gray-600" />
            <p className="ml-4">Your Profile</p>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className="text-gray-600 flex items-center mx-3 p-2 rounded hover:bg-gray-300 hover:cursor-pointer"
        >
          <FiLogOut className="w-5 h-5 text-gray-600" />
          <p className="ml-4">Logout</p>
        </div>

        <div className="mx-3 items-center p-4 mt-3 border-t border-gray-300 flex">
          <div>
            <Image
              src={user?.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ml-2 items-start">
            <p className="font-medium text-gray-700 text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-500 text-xs">@{user?.userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
