"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendResetLink = async () => {
    try {
      const response = await axios.post("/api/users/forgot-password/email-verification",{email});
      setMessage("Password reset link has been sent to your email")
      setError("")
    } catch (error: any) {
      console.log(error.response.data || "something went wrong");
      setError(error.response?.data?.error || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-xl font-bold">Forgot Password</h2>
    <p className="text-gray-600 mb-4">Enter your email to receive a reset link.</p>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="p-2 border rounded w-64 mb-2 text-black"
    />

    <button
      onClick={sendResetLink}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Send Reset Link
    </button>

    {message && <p className="text-green-500 mt-2">{message}</p>}
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
)
}
