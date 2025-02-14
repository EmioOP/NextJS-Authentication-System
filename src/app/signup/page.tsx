"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log(response)
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Processing" : "SignUp"}</h1>
      <hr />

      <div className="flex flex-col gap-4 w-80">
        {/* Username Field */}
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 text-left">
            Username
          </label>
          <input
            className="p-2 text-black border rounded-md"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-left">
            Email
          </label>
          <input
            className="p-2 text-black border rounded-md"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-left">
            Password
          </label>
          <input
            className="p-2 text-black border rounded-md"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>
      </div>

      <button
        onClick={onSignup}
        className="m-4 px-6 py-2 bg-gray-500 text-white rounded-md"
      >
        Sign Up
      </button>

      <Link href={"/login"} className="text-blue-500">
        Already have an account? Login
      </Link>
    </div>
  );
}
