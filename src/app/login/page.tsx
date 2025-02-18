"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success: ", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed :", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"Logging You In..." : "Login"}</h1>
      <hr />

      <div className="flex flex-col gap-4 w-80">
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
        onClick={onLogin}
        className="m-4 px-6 py-2 bg-gray-500 text-white rounded-md"
      >
        Login
      </button>

      <Link href={"/signup"} className="text-blue-500">
        Don't have an account? Signup
      </Link>
      <Link href={"/forgotpassword"} className="text-blue-500">
        Forgot Password?
      </Link>
    </div>
  );
}
