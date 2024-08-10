import { useState, useEffect } from "react";
import style from "./InputBox.module.css";
import axios from "axios";
import { io } from "socket.io-client";
import useUserContext from "../../custom hook/useUserContext";

const MessageInput = ({ dataArray, setDataArray }) => {
  const [data, setData] = useState({
    message: "",
    date: "",
    time: "",
    sender: "",
  });
  const [socketInstance, setSocketInstance] = useState(null);
  const { username } = useUserContext();

  useEffect(() => {
    // initialize the socket (using state variable to be used in other function)
    const socket = io("http://localhost:5000");
    console.log("Socket initialized");
    setSocketInstance(socket);

    // clean up
    return () => {
      console.log("Socket disconnected");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("receive-message", (messageData) => {
        console.log("from the server: ", messageData);
        setDataArray((prevArray) => [...prevArray, messageData]);
        console.log("done update")
      });
      socketInstance.on("is-typing", (typingUsername) => {
        console.log(typingUsername, "is typing")
      })
    }
  }, [socketInstance]); 

  function send() {
    // setDataArray((prevArray) => [...prevArray, data])
    axios
      .post("http://localhost:5000/api/chat/add", data)
      .then((response) => {

        // reset
        setData({ ...data, message: "" });

        // sends the message to the server
        if (socketInstance) {
          socketInstance.emit("message", data);
        }
      })
      .catch((error) => {
        console.log(`axios post error: ${error}`);
      });
  }

  function handleChange(event) {
    const currentDateTime = new Date();
    setData({
      message: event.target.value,
      date: currentDateTime.toLocaleDateString(),
      time: currentDateTime.toLocaleTimeString(),
      sender: username,
    });
  }

  function handleFocus(){
    console.log("you are typing")
    if (socketInstance) {
      socketInstance.emit("typing", username);
    }
  }

  return (
    <div className={style.mainDiv}>
      <h1 className={style.title}>Message</h1>
      <input
        onChange={handleChange}
        className={style.input}
        value={data.message}
        onFocus={handleFocus}
      />
      <button
        onClick={send}
        className={style.button}
        disabled={!socketInstance}
      >
        Send
      </button>
      <h1 className={style.title}>Room</h1>
      <input className={style.input} />
      <button className={style.button}>Join</button>
    </div>
  );
};

export default MessageInput;
