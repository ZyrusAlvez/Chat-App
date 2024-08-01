import { useState, useEffect } from 'react';
import style from './InputBox.module.css';
import axios from 'axios';
import { io } from "socket.io-client"


const MessageInput = ({ setMessageArray }) => {
  const [data, setData] = useState({
    message: '',
    date: '',
    time: '',
  });
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    // initialize the socket (using state variable to be used in other function)
    const socket = io("http://localhost:5000")
    setSocketInstance(socket);
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('receive-message', message => {
        setMessageArray((prevArray) => [...prevArray, message]);
      });
    }
  }, [socketInstance])

  function send() {
    setMessageArray((prevArray) => [...prevArray, data])
    axios
      .post('http://localhost:5000/api/chat/add', data)
      .then((response) => {
        console.log(response);
        // sends the message to the server
        if (socketInstance){
          socketInstance.emit('message', data, socketInstance.id)
        }
      })
      .catch((error) => {
        console.log(`axios post error: ${error}`);
      });
  }

  function handleChange(event){
    const currentDateTime = new Date();
    setData({
      message: event.target.value,
      date: currentDateTime.toLocaleDateString(),
      time: currentDateTime.toLocaleTimeString(),
    });
    
  };

  return (
    <div className={style.mainDiv}>
      <h1 className={style.title}>Message</h1>
      <input onChange={handleChange} className={style.input} />
      <button onClick={send} className={style.button} disabled={!socketInstance}>Send</button>
      <h1 className={style.title}>Room</h1>
      <input className={style.input} />
      <button className={style.button}>Join</button>
    </div>
  );
};

export default MessageInput;