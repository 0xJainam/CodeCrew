import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";

const socket = io(SOCKET_URL, {
    autoConnect: false,
});

export default socket;
