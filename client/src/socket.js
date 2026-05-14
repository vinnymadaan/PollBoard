import { io } from "socket.io-client";

const socket_url = import.meta.env.VITE_SOCKET_URL

export const socket = io( socket_url );

