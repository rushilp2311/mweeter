import { useMemo } from "react";
import Image from "next/image";

const Mweet = ({
  avatar,
  firstName,
  lastName,
  description,
  date,
  userName,
}: any) => {
  return (
    <div className="flex items-start mt-5">
      <div className="">
        <Image
          className="rounded-full min-w-5 min-h-5"
          width={44}
          height={44}
          src={avatar || "https://api.dicebear.com/6.x/lorelei/png"}
          alt="avatar"
        />
      </div>
      <div className="ml-4">
        <div id="mweet-info">
          <div className="flex items-center text-gray-500 text-sm">
            <p className="text-gray-800 font-bold">
              {firstName} {lastName}
            </p>
            <p className="ml-2">@{userName}</p>
            <p className="ml-3">• {date}</p>
          </div>
        </div>
        <div id="mweet-content" className="mt-2 text-xs text-gray-600">
          {description}
        </div>
      </div>
    </div>
  );
};

export default Mweet;
