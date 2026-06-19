"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function DashboardPage() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [joining, setJoining] = useState(false);

  const router = useRouter();

  const createRoom = async () => {
    try {
      setLoading(true);

      const res = await api.post("/rooms/create");

      const newRoomId = res.data.room.roomId;

      router.push(`/editor?roomId=${newRoomId}`);
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create room"
      );
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async () => {
    if (!roomId.trim()) {
      alert("Enter a Room ID");
      return;
    }

    try {
      setJoining(true);

      await api.post("/rooms/join", {
        roomId: roomId.trim(),
      });

      router.push(`/editor?roomId=${roomId.trim()}`);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to join room"
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <h1 className="text-3xl font-semibold mb-12">
          Dashboard
        </h1>

        <div className="space-y-10">
          <button
            onClick={createRoom}
            disabled={loading}
            className="text-xl text-zinc-400 hover:text-white hover:underline underline-offset-8 transition-colors"
          >
            {loading ? "Creating..." : "Create Room"}
          </button>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-700 py-3 outline-none focus:border-white"
            />

            <button
              onClick={joinRoom}
              disabled={joining}
              className="text-xl text-zinc-400 hover:text-white hover:underline underline-offset-8 transition-colors"
            >
              {joining ? "Joining..." : "Join Room"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}