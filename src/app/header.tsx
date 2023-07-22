import Link from "next/link";
import { FiTwitter } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex p-5 h-fit p-2 justify-between items-center border-b ">
      <div>
        <Link href="/" className="flex justify-center items-center">
          <FiTwitter size={24} color="#1DA1F2" fill="#1DA1F2" />
          <p className="font-bold text-xl ml-2">mweeter</p>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <Link href="/login">
          <button className="border border-white text-indigo-600 hover:border-indigo-500 hover:bg-indigo-100 px-4 py-2 rounded mr-3 font-medium hover:border">
            Sign In
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-indigo-600 px-4 py-2 text-white font-medium  border-indigo-500  rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
