import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoomHandler = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App App-header">
      {!showChat ? (
        <div className="App App-header">
          <Typography variant="h3" component="h2">
            Join A Chat
          </Typography>
          <TextField
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            placeholder="John..."
          />
          <TextField
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            type="text"
            background="white"
            placeholder="Room ID..."
          />
          <Button
            color="secondary"
            background="white"
            onClick={joinRoomHandler}
          >
            Join A Room
          </Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
