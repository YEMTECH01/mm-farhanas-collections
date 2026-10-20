"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-luxury-beige flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-sm shadow-lg border border-luxury-gray w-full max-w-md">
        <h1 className="font-serif text-3xl text-center mb-8 text-luxury-dark">
          MM ADMIN
        </h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-sm mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-luxury-dark text-white py-3 tracking-widest hover:bg-black transition-colors mt-6"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
