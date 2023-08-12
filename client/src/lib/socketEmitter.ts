import { io, Socket } from "socket.io-client";
import registerSocketEvents from "../subscribers/sockets";

const socket: Socket = io(); // Change the server URL/port as needed

registerSocketEvents(socket);

export default socket;
