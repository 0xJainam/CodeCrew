"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Topbar from "@/components/editor/EditorTopbar";
import Sidebar from "@/components/editor/sidebar";
import CodeEditor from "@/components/editor/codeEditor";
import UsersPanel from "@/components/editor/usersPanel";
import Tabs from "@/components/editor/Tabs";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import socket from "@/lib/socket";

export type FileData = {
  language: string;
  content: string;
};

export type FilesMap = Record<string, FileData>;

const DEFAULT_FILES: FilesMap = {
  "main.ts": {
    language: "typescript",
    content: "",
  },
};

export default function EditorPage() {
  const [files, setFiles] = useState<FilesMap>(DEFAULT_FILES);
  const [selectedFile, setSelectedFile] = useState("main.ts");
  const [openTabs, setOpenTabs] = useState(["main.ts"]);
  const [activeUsers, setActiveUsers] = useState<{ userId: string; username: string; isOwner: boolean }[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const saveSkipRef = useRef(true);
  const isRemoteRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filesRef = useRef(files);
  filesRef.current = files;

  useEffect(() => {
    if (files[selectedFile]) return;
    const remaining = Object.keys(files);
    if (remaining.length > 0) {
      setSelectedFile(remaining[0]);
      setOpenTabs((prev) => {
        const valid = prev.filter((t) => files[t]);
        return valid.length > 0 ? valid : [remaining[0]];
      });
    }
  }, [files, selectedFile]);

  const saveFiles = useCallback(async () => {
    if (!roomId) return;
    try {
      await api.put(`/rooms/${roomId}/code`, {
        files: filesRef.current,
      });
    } catch (error) {
      console.error(error);
    }
  }, [roomId]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomId) return;
        const res = await api.get(`/rooms/${roomId}`);

        let loadedFiles: FilesMap = res.data.files;

        const fileNames = Object.keys(loadedFiles || {});
        saveSkipRef.current = true;
        if (fileNames.length === 0) {
          loadedFiles = DEFAULT_FILES;
        }
        setFiles(loadedFiles);
        const finalNames = Object.keys(loadedFiles);
        setSelectedFile(finalNames[0]);
        setOpenTabs(finalNames);
      }
      catch(error){
        console.error(error);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const token = localStorage.getItem("token");
    socket.auth = { token };
    socket.connect();
    socket.emit("join-room", roomId, (response: { userId: string }) => {
      setCurrentUserId(response.userId);
    });

    socket.on("receive-code-change", (remoteFiles: FilesMap) => {
      isRemoteRef.current = true;
      setFiles(remoteFiles);
    });

    socket.on("room-users", (users: { userId: string; username: string; isOwner: boolean }[]) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("receive-code-change");
      socket.off("room-users");
      socket.disconnect();
    };
  }, [roomId]);

  // Debounced auto-save + socket emit on local changes
  useEffect(() => {
    if (saveSkipRef.current) {
      saveSkipRef.current = false;
      return;
    }

    const isRemote = isRemoteRef.current;
    if (isRemote) {
      isRemoteRef.current = false;
    }

    if (!isRemote && roomId) {
      socket.emit("code-change", { roomId, files });
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      saveFiles();
    }, 1500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [files, saveFiles, roomId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (saveTimerRef.current) {
          clearTimeout(saveTimerRef.current);
        }
        saveFiles();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveFiles]);

  const router = useRouter();

  const handleLeave = async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    await saveFiles();
    router.push("/");
  };

  return (
    <div className="h-screen overflow-hidden bg-surface-0 text-white">
      <Topbar
        roomId={roomId || "Unknown"}
        files={files}
        setFiles={setFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOpenTabs={setOpenTabs}
        onLeave={handleLeave}
      />

      <div className="flex h-[calc(100%-56px)]">
        <Sidebar
          files={files}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setFiles={setFiles}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Tabs
            files={files}
            openTabs={openTabs}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setOpenTabs={setOpenTabs}
          />
          <CodeEditor
            files={files}
            selectedFile={selectedFile}
            setFiles={setFiles}
          />
        </div>

        <UsersPanel users={activeUsers} currentUserId={currentUserId} />
      </div>
    </div>
  );
}