"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-0 px-6">
      <div className="w-full max-w-md space-y-5">
        <h1 className="text-3xl font-semibold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border-default bg-surface-50 px-4 py-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-border-default bg-surface-50 px-4 py-3 outline-none"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-lg bg-accent-500 px-4 py-3 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </main>
  );
}