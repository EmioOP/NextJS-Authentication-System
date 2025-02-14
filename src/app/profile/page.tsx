"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  interface User {
    username: string;
    email: string;
    isAdmin: boolean;
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response?.data?.data);
      toast.success("User details fetched successfully");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-700 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">User Profile</h1>
        <hr className="mb-4" />
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : user ? (
          <>
            <p className="text-lg font-semibold text-gray-600"><Link href={`/profile/${user.username}`}>Username: {user.username}</Link></p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.isAdmin? "Admin":"User"}</p>
            <div className="mt-4 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>
    </div>
  );
}
