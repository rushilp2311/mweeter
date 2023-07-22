"use client";
import { getCurrentUser } from "@/services/authService";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";



const Profile = () => {
  const router = useRouter();
  const authUser = getCurrentUser();
  const [user, setUser] = useState(authUser);

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update(user)
      .eq("email", user.email);

    if (!error) {
      window.localStorage.setItem("user", JSON.stringify(user));
      toast("Profile Updated", { type: "success" });
      router.refresh();
    }
  };

  const updateUser = (type: string, value: string) => {
    setUser({ ...user, [type]: value });
  };

  return (
    <div className="h-full py-10 px-20  w-1/2">
      <div className="h-full ">
        <p className="text-2xl font-bold text-gray-700">Your Profile</p>

        <div className="flex flex-col items-start mt-10 h-full w-full ">
          <div className="flex w-full">
            <div className="flex flex-col justify-start items-start">
              <p className="text-gray-700">First name</p>
              <input
                onChange={(e) => updateUser("firstName", e.target.value)}
                className="w-full px-2 py-2 text-gray-600 md:px-3 mt-1 rounded border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200  focus:ring-offset-0"
                value={user.firstName}
              />
            </div>
            <div className="flex ml-4 flex-col justify-start items-start">
              <p className="text-gray-700">Last name</p>
              <input
                onChange={(e) => updateUser("lastName", e.target.value)}
                className="w-full px-2 py-2 md:px-3 mt-1 text-gray-600 rounded border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200  focus:ring-offset-0"
                value={user.lastName}
              />
            </div>
          </div>
          <div className="flex mt-4 flex-col justify-start items-start">
            <p className="text-gray-700">Your handle (username)</p>
            <input
              onChange={(e) => updateUser("userName", e.target.value)}
              className="w-full px-2 py-2 md:px-3 mt-1 text-gray-600 rounded border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200  focus:ring-offset-0"
              value={`${user.userName}`}
            />
          </div>
          <div className="flex mt-4 flex-col justify-start items-start">
            <p className="text-gray-700">Email address</p>
            <input
              disabled
              className="w-full px-2 py-2 md:px-3 mt-1 text-gray-600 rounded border disabled:bg-gray-200 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200  focus:ring-offset-0"
              value={user.email}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-indigo-500 text-white px-6 py-3 rounded-md mt-10"
          >
            Update info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
