"use client";
import { FcGoogle } from "react-icons/fc";
import { FiTwitter } from "react-icons/fi";
import Logo from "../../logos/microsoft_logo.png";
import Image from "next/image";
import { supabase } from "@/supabase";
import Link from "next/link";
import { handleLogin } from "@/services/authService";

const Login = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
      await handleLogin();
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center align-middle">
      <div className="flex flex-col justify-center items-center">
        <Link href="/">
          <FiTwitter size={40} color="#1DA1F2" fill="#1DA1F2" />
        </Link>
        <p className="font-bold text-3xl mb-10">mweeter</p>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={signInWithGoogle}
          className="px-4 flex hover:bg-gray-200  items-center py-2 border border-gray-400 text-gray-600 rounded"
        >
          <FcGoogle size={24} /> <p className="ml-2">Sign In with Google</p>
        </button>
        <button className="px-4 ml-3 flex hover:bg-gray-200 items-center py-2 border border-gray-400 text-gray-600 rounded">
          <Image src={Logo} alt="Microsoft Logo" className="h-5 w-5" />{" "}
          <p className="ml-2">Sign In with Microsoft</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
