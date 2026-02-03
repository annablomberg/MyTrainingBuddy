import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAuth } from "./AuthContext";

export function LoginPage(){
    const { loginAsJohnDoe } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here call real backend later.
    // For now, just log in as John Doe:
    loginAsJohnDoe();
    navigate("/"); // go back to home
  };

  const handleSocialLogin = (provider: "facebook" | "google") => {
    // In the real app redirect to OAuth.
    // For prototype, just log in as John Doe:
    console.log(`Mock ${provider} login`);
    loginAsJohnDoe();
    navigate("/");
  };


    return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#d7f3ff_0,#a4d6ff_30%,#ffe5cf_80%)]">
      <div className="w-full mt-20 max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Log in
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Log in to My Training Buddy to find sessions and training partners.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 text-white text-sm font-semibold py-2.5
                       hover:bg-blue-600 active:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-xs text-slate-400 uppercase">
            or continue with
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium
                       hover:bg-slate-50"
          >
            <FaGoogle />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("facebook")}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium
                       hover:bg-slate-50"
          >
            <FaFacebook className="text-[#1877F2]" />
            <span>Facebook</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    );
}