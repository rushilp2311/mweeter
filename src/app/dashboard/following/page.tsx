"use client";

import { getCurrentUser } from "@/services/authService";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";

const Following = () => {
  const user = getCurrentUser();
  const [followingList, setFollowingList] = useState<any>([]);

  useEffect(() => {
    const fetchFollowersList = async () => {
      const { data } = await supabase
        .from("followers")
        .select(`id, following , following:following(*)`);

      setFollowingList(data || []);
    };

    fetchFollowersList();
  }, [user]);

  return (
    <div className="h-full flex flex-col py-10 px-10  w-full">
      <div>
        <p className="text-2xl font-bold text-gray-700">People you follow</p>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-10">
        {followingList.map(({ following }: any) => {
          return (
            <div
              key={following.id}
              className="flex items-center justify-between border-t  mt-3"
            >
              <div className="flex justify-center mt-2">
                <div>
                  <img
                    width={30}
                    height={30}
                    src={"https://api.dicebear.com/6.x/pixel-art/svg"}
                    alt={`${following.id}-avatar`}
                  />
                </div>
                <div className="flex flex-col ml-3 items-start">
                  <p className="font-medium text-gray-700">
                    {following.firstName} {following.lastName}
                  </p>
                  <p className="text-sm text-gray-500">@{following.userName}</p>
                </div>
              </div>
              <div>
                <button className="border border-gray-300 rounded-full text-sm px-4 py-1">
                  Following
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Following;
