import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProfilePage(){

const { user } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // while redirecting

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border-4 border-white shadow">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-slate-600">
                {initial}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 text-center mb-6">
          <h1 className="text-xl font-semibold text-slate-900">
            {user.name}
          </h1>
          <p className="text-sm text-slate-600">@{user.username}</p>

          <p className="text-sm text-slate-600">
            {user.email}
          </p>

          {user.bio && (
            <p className="mt-3 text-sm text-slate-700">
              {user.bio}
            </p>
          )}
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Link your social media
          </button>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-blue-500 text-white text-sm font-semibold py-2.5 hover:bg-blue-600 active:bg-blue-700 transition"
        >
          Edit profile
        </button>
      </div>
    </div>
  );

}