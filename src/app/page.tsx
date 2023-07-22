"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import moment from "moment";
import Mweet from "@/components/mweet";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { getCurrentUser, handleLogin } from "@/services/authService";
import { supabase } from "@/supabase";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [publicMweets, setPublicMweets] = useState<any>([]);

  const fetchPublicMweets = async () => {
    const { data } = await supabase
      .from("mweets")
      .select(`*, parsedAuthor:author(*)`)
      .eq("isPublic", true)
      .order("created_at", { ascending: false });

    if (data) {
      setPublicMweets(data);
    }
  };

  useEffect(() => {
    document.title = "Mweeter";
    fetchPublicMweets();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);

      await handleLogin();

      const user = getCurrentUser();
      if (user) {
        router.replace("/dashboard");
      }
      setLoading(false);
    };
    fetchCurrentUser();
  }, [router]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <FiLoader />
      </div>
    );

  return (
    <main className="h-full w-full">
      <Header />
      <div className="flex flex-col items-center justify-center container-md  px-6 py-12 lg:px-8">
        <p className="text-2xl font-medium text-gray-600">Public Feed</p>

        <div className="flex flex-col mt-10">
          {publicMweets.length > 0 ? (
            publicMweets.map((mw: any) => {
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
    </main>
  );
}
