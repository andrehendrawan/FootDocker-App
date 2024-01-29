"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const res = await fetch(process.env.BASE_URL + "/api/users/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Login Failed");
  }

  const { access_token } = await res.json();

  cookies().set("Authorization", `Bearer ${access_token}`);
  redirect("/wishlist");
}

export async function handleRegister(formData: FormData) {
  "use server";
  const userInput = {
    username: formData.get("username"),
    password: formData.get("password"),
    name: formData.get("name"),
    email: formData.get("email"),
  };
  const res = await fetch(process.env.BASE_URL + "/api/users/register", {
    method: "POST",
    body: JSON.stringify(userInput),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Registration Failed, Please try again.");
  }
  redirect("/login");
}

export async function handleLogout() {
  cookies().delete("Authorization");
  redirect("/login");
}
