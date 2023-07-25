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
    return currentUser[0];
  }
  //  storing in supabase user table

  const [firstName, lastName] = user_metadata.full_name.split(" ");

  const { data, error } = await supabase
    .from("Users")
    .insert([
      {
        firstName: firstName,
        lastName: lastName,
        email: user_metadata.email,
        userName: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        avatar: user_metadata.picture,
      },
    ])
    .select();

  if (data && data[0]) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(data[0]));
    }

    return data[0];
  }
};

export const handleLogout = async () => {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.location.href = "/";
  }
};
