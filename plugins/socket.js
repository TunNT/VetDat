import { io } from "socket.io-client";
const URL = "http://localhost:8085";
const socket = io(URL, { transports : ['websocket'], 
                  auth: { token: localStorage.getItem('access-token')},
                  autoConnect: false ,
              });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;