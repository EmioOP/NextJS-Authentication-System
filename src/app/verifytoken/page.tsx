"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifytoken", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("error:",error.response.data);
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
          <h2>Email Verified Successfully!</h2>
          <Link href="/login" className="text-blue-600 hover:underline mt-2">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-lg font-semibold">
          <h2 className="text-white">Error: {error}</h2>
        </div>
      )}
    </div>
  );
}
