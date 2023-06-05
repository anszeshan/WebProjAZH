import React,{useEffect,useState} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useGetAllChatUsersQuery } from '../../services/nodeAPI';

export default function Messenger() {
  const messagesRef = collection(db, "chats");
  const [messages,setMessages] = useState([]);
  const [currentReceiver,setCurrentReceiver] = useState(null);
  const user = useSelector(state => state.user.user)
  const {data,isLoading, error} = useGetAllChatUsersQuery(user);

  const [room, setRoom] = useState(null);
  function createRoomID(str1, str2) {
    const combinedString = str1.concat(str2);
    const sortedString = combinedString.split('').sort().join('');
    return sortedString;
  }
  useEffect(() => {
    if( currentReceiver)
      setRoom(createRoomID(currentReceiver.id,user._id))
  }, [currentReceiver, user._id]);
  useEffect(() => {
    if(!room) return
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log('---------',messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [room]);


    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          {!isLoading && <ConversationList users={data.data.user.chats} setCurrentReceiver={setCurrentReceiver} />}
        </div>

        <div className="scrollable content">
          {currentReceiver && room?<MessageList currentReceiver={currentReceiver} room={room} messages={messages}/>: "Select user to start chat!"}
        </div>
      </div>
    );
}