import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send"; // Importing a custom send icon
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
  
    const sendMessageHandler = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    }, [socket]);
  return (
    <Paper style={{ display: 'flex', flexDirection: 'column', height: '100%' }} elevation={3}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px', backgroundColor: '#3f51b5', color: '#fff' }} className="chat-header">
        <Typography variant="h6">Chat App</Typography>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message} = {messageContent.time}{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <TextField
          type="text"
          placeholder="Hey..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <Button onClick={sendMessageHandler} type="submit" size="large">
          <SendIcon />
        </Button>
      </div>
    </Paper>
  );
};

export default Chat;