import React, {useState} from 'react';
import './Compose.css';
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

export default function Compose({currentReceiver, room}) {

const user = useSelector(state => state.user.user)
  const [message, setMessage] = useState('');
  const messagesRef = collection(db, "chats");
 

  const handleKeyDown = async(event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (message === "") return;
        await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        room,
        sender:user._id
      });
      event.target.value = ""
      setMessage('');
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
    return (
      <div className="compose" style={{width:'62%'}}>
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

      </div>
    );
}