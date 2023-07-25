"use client";
import Mweet from "@/components/mweet";
import { getCurrentUser } from "@/services/authService";
import { supabase } from "@/supabase";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const user = getCurrentUser();
  const router = useRouter();

  const [mweet, setMweet] = useState<string>();
  const [followerSuggestionList, setFollowerSuggestionList] = useState<any>([]);

  const [mweets, setMweets] = useState<any>([]);
  const [isMweetPublic, setIsMweetPublic] = useState(false);

  const fetchMweets = async () => {
    const { data: followers } = await supabase
      .from("followers")
      .select(`following `)
      .eq("user", user.id);

    const { data } = await supabase
      .from("mweets")
      .select(`*, parsedAuthor:author(*)`)
      .order("created_at", { ascending: false })
      .in("author", [
        ...(followers?.map((follower) => follower.following) || []),
        user.id.toString(),
      ]);

    setMweets(data);
  };

  const handleSendMweet = async () => {
    const { data, error } = await supabase.from("mweets").insert([
      {
        description: mweet,
        author: user.id,
        isPublic: isMweetPublic,
      },
    ]);

    if (!error) {
      console.log("Called");
      setMweet("");
      await fetchMweets();
      toast("Mweet Added", {
        type: "success",
      });
    }
  };

  useEffect(() => {
    const fetchFollowerSuggestions = async () => {
      let { data: followers } = await supabase
        .from("followers")
        .select("following")
        .eq("user", user.id);

      let { data: nonFollowedUsers, error } = await supabase
        .from("Users")
        .select("*")
        .neq("id", user.id)
        .not(
          "id",
          "in",
          `(${followers?.map((follower) => follower.following).join(",")})`
        );

      setFollowerSuggestionList(nonFollowedUsers || []);
    };

    fetchFollowerSuggestions();
  }, []);

  useEffect(() => {
    fetchMweets();
  }, [followerSuggestionList]);

  const handleFollow = async (followingUserId: string) => {
    const { data, error } = await supabase
      .from("followers")
      .insert([
        {
          user: user.id,
          following: followingUserId,
        },
      ])
      .select();

    if (data) {
      toast("User followed", {
        type: "success",
      });

      setFollowerSuggestionList(
        followerSuggestionList.filter(
          (suggestion: any) => suggestion.id !== followingUserId
        )
      );
      router.refresh();
    }
  };

  return (
    <div className="h-full flex items-center justify-between py-10 px-10  w-full">
      <div className="h-full pr-5 w-2/3">
        <p className="text-2xl font-bold text-gray-700">Your Feed</p>

        <div>
          <div className="flex items-start mt-10 h-full w-full">
            <Image
              height={40}
              width={40}
              src={user?.avatar}
              alt="avatar"
              className="rounded-full"
            />
            <div className=" ml-3 w-full flex flex-col items-end">
              <textarea
                value={mweet}
                onChange={(e) => setMweet(e.target.value)}
                placeholder="What's on your mind..."
                className="border border-gray-300 h-30 w-full px-3 py-2 rounded"
              />
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <input
                    value={isMweetPublic ? 1 : 0}
                    onChange={(e) => setIsMweetPublic(!!e.target.checked)}
                    type="checkbox"
                    placeholder="Make the mweet public"
                  />
                  <p className="ml-2 text-gray-500">Make the mweet public</p>
                </div>
                <button
                  onClick={handleSendMweet}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-md mt-3"
                >
                  Send mweet
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5  w-full flex flex-col px-10">
            {mweets.length > 0 ? (
              mweets.map((mw: any) => {
                return (
                  <Mweet
                    key={mw.id}
                    avatar={mw.parsedAuthor.avatar}
                    firstName={mw.parsedAuthor.firstName}
                    lastName={mw.parsedAuthor.lastName}
                    userName={mw.parsedAuthor.userName}
                    description={mw.description}
                    date={moment(mw.created_at).format("MMM DD, YY")}
                  />
                );
              })
            ) : (
              <div className="mx-4 text-gray-500 mt-3 border-2 rounded border-dashed px-4 py-2 flex justify-center items-center">
                Nothing to show!!! Please add mweets or follow someone
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-full w-1/3">
        <p className="font-semibold text-lg text-gray-700 mx-4">
          Follow Others
        </p>

        {followerSuggestionList.length > 0 ? (
          followerSuggestionList.map((suggestion: any) => {
            return (
              <div
                key={suggestion.id}
                className="flex items-center justify-between border-t mx-4 mt-3"
              >
                <div className="flex justify-center mt-2">
                  <div>
                    <img
                      width={30}
                      height={30}
                      src={"https://api.dicebear.com/6.x/pixel-art/svg"}
                      alt={`${suggestion.id}-avatar`}
                    />
                  </div>
                  <div className="flex flex-col ml-3 items-start">
                    <p className="font-medium text-gray-700">
                      {suggestion.firstName} {suggestion.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      @{suggestion.userName}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleFollow(suggestion.id)}
                    className="border border-gray-300 rounded-full text-sm hover:bg-indigo-600 hover:border-indigo-600 hover:text-white px-4 py-1"
                  >
                    Follow
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mx-4 text-gray-500 mt-3 border-2 rounded border-dashed px-4 py-2 flex justify-center items-center">
            No one to follow
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
