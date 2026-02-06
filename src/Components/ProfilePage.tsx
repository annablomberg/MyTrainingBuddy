import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {CreateEvent} from "./CreateEvent.tsx";

export function ProfilePage(){

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; 

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#d7f3ff_0,#a4d6ff_30%,#ffe5cf_80%)]">
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
        

        <div className="mb-4">
        <button 
          type="button"
          className="w-full rounded-lg bg-rose-300 text-white text-sm font-semibold py-2.5 hover:bg-rose-400 active:bg-rose-400 transition"
          
        >
          Edit Profile
        </button>
        </div>
      <div className="mb-4" >
          <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="w-full rounded-lg bg-slate-600 text-white text-sm font-semibold py-2.5 hover:bg-slate-700 active:bg-slate-700 transition"
          >
              Create Event
          </button>

      </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg bg-blue-500 text-white text-sm font-semibold py-2.5 hover:bg-blue-600 active:bg-blue-700 transition"
        >
          Log out
        </button>
      </div>
        <CreateEvent
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
        />

    </div>
  );

}