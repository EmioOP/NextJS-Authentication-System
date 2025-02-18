"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //for password changing field

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post(
        "/api/users/forgot-password/verify-token",
        { token }
      );
      setVerified(true);
      console.log("Response:", response);
      // router.push("/forgotpassword/change-password");
    } catch (error: any) {
      setError(true);
      console.log("error:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  if (verified === true) {
    const handleResetPassword = async () => {
      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post(
          "/api/users/forgot-password/change-password",
          { token, newPassword }
        );
        setMessage("Password reset successful. Redirecting...");
        router.push("/login");
        setLoading(false);
      } catch (error: any) {
        setMessage(error.response?.data?.error || "Something went wrong");
        setLoading(false);
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          {message && (
            <p className="text-center text-green-500 mb-3">{message}</p>
          )}

          <label className="block mb-2 text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md mb-4 text-black"
            placeholder="Enter new password"
          />

          <label className="block mb-2 text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md mb-4 text-black"
            placeholder="Confirm new password"
          />

          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    );
  } else if (verified === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 space-y-4">
        <h1 className="text-4xl font-bold">Verify Your Email</h1>
        {token ? (
          <h2 className="bg-orange-500 text-white px-4 py-2 rounded-md">
            Token: {token}
          </h2>
        ) : (
          <h2 className="text-red-500">No token found</h2>
        )}

        {loading && <p className="text-blue-500">Verifying...</p>}

        {verified && (
          <div className="text-green-600 text-lg font-semibold">
            <h2>Token Verified Successfully!</h2>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-lg font-semibold">
            <h2 className="text-white">Error: {"Token expired"}</h2>
          </div>
        )}
      </div>
    );
  }
}
