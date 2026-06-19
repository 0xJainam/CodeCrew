"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration successful");

      router.push("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-0 px-6">
      <div className="w-full max-w-md space-y-5">
        <h1 className="text-3xl font-semibold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full rounded-lg border border-border-default bg-surface-50 px-4 py-3 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-lg border border-border-default bg-surface-50 px-4 py-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded-lg border border-border-default bg-surface-50 px-4 py-3 outline-none"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-lg bg-accent-500 px-4 py-3 text-white"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>
      </div>
    </main>
  );
}