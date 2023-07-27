import { io, Socket } from "socket.io-client";
import registerSocketEvents from "./helpers/socketEventLoader";

const socket: Socket = io(); // Change the server URL/port as needed

registerSocketEvents(socket);

export default socket;
