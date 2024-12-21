"use client";

import { useEffect, useState } from "react";

const UserProfileClient = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("Invalid user ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Green check icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m-7 7a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </div>
        </div>

        {/* Certificate details */}
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-gray-800">Verified Certificate</h2>
          <p className="text-gray-500 mt-1">Certificate No - MU{userId || "XXXXXX"}</p>
        </div>

        {/* Description */}
        <div className="mt-4 text-gray-600">
          <p>
            This is to certify that{" "}
            <span className="font-medium text-gray-800">
              {user?.username || "name here"}
            </span>{" "}
            participated in the Young Innovation Program conducted by the Kerala Development
            and Innovation Strategic Council on{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileClient;
