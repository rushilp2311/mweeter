"use client";
import { supabase } from "@/supabase";

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const localStorageUser = window.localStorage.getItem("user");

    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    }
  }
};

export const handleLogin = async () => {
  const authUser = await supabase.auth.getUser();
  if (!authUser.data.user) return;

  const {
    data: {
      // @ts-ignore
      user: { user_metadata },
    },
  } = authUser;

  const { data: currentUser } = await supabase
    .from("Users")
    .select("firstName,lastName,email,userName,avatar,id")
    .eq("email", user_metadata.email);

  if (currentUser && currentUser[0]) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(currentUser[0]));
    }
    return;
  }
  //  storing in supabase user table

  const { data, error } = await supabase
    .from("Users")
    .insert([
      {
        firstName: user_metadata.firstName,
        lastName: user_metadata.lastName,
        email: user_metadata.email,
        userName: `${user_metadata.firstName.toLowerCase()}${user_metadata.lastName.toLowerCase()}`,
        avatar: user_metadata.picture,
      },
    ])
    .select();
};

export const handleLogout = async () => {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.location.href = "/";
  }
};
