import { io } from "socket.io-client";
import config from '../config'
const API_URL = config.REACT_APP_SOCKET_URL;
const socket = io(API_URL);
export default socket;