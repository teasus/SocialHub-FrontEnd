import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navigation from './../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import RightPart from '../RightPart/RightPart';
import { Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';
import PostDetails from '../PostDetails/PostDetails';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ChatList from '../Chatting/ChatList';
import ChatPage from '../Chatting/ChatPage';
import { useDispatch, useSelector } from 'react-redux';
import { websocketMessage } from '../../Store/Chat/Action';
const HomePage = () => {
  const dispatch = useDispatch();
  const { auth, chats } = useSelector(state => state);
  const [stompClient, setStompClient] = useState();
  const [messages, setMessages] = useState([]);
  const [isConnect, setIsConnect] = useState(false);

 useEffect(() => {
    if (stompClient) {
      dispatch(websocketMessage(messages));
    }
  }, [messages, dispatch, stompClient]);

  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);


    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
    temp.connect(headers, onConnect, onError);
  }



  const onError = (error) => {
    console.log("error ", error);
  }

  const onConnect = () => {
    setIsConnect(true);
  }

  useEffect(() => {
    if (chats?.message && stompClient) {
      setMessages([...messages, chats.message]);
      console.log(chats.message);
      stompClient?.send("/app/message", {}, JSON.stringify(chats.message))
    }
  }, [chats?.message])

  useEffect(() => {
    setMessages(chats?.messages);
    console.log("messages ", chats?.messages);


  }, [chats?.messages])

  const onMessageReceive = (paload) => {
    console.log("reieve message ", JSON.parse(paload.body));

    const receivedMessage = JSON.parse(paload.body);
    setMessages([...messages, receivedMessage]);
  }

  useEffect(() => {
    if (isConnect && stompClient && auth?.user) {
      const subscription = stompClient.subscribe("/group/" + chats?.chat?.id?.toString(), onMessageReceive);
      console.log("on reicee  checking .. ", "/group/" + chats?.chat?.id?.toString());
      return () => {
        subscription.unsubscribe();
      }
    }
  })

  useEffect(() => {
    connect();


  }, [])





  return (
    <Grid container className='px-5 lg:px-36 justify-between'>

      {isConnect && (
        <>
          {/* xs=small screen lg = large screen */}
          {/* left */}
          <Grid item xs={0} m={0} lg={2.5} className='hidden lg:block w-full relative '>
            <Navigation />
          </Grid>
          {/* mid */}
          <Grid item xs={12} lg={6} className='hidden px-9 lg:block w-full relative '>
            <Routes >
              <Route path="/" element={<HomeSection />}></Route>
              <Route path="/home" element={<HomeSection />}></Route>
              <Route path="profile/:id" element={<Profile />}></Route>
              <Route path="tweet/:id" element={<PostDetails />}></Route>
              <Route path="chats" element={<ChatList />}></Route>
              <Route path="/chat/:id" element={<ChatPage />}></Route>
            </Routes>

          </Grid>
          {/* Right */}
          <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative '>
            <RightPart />
          </Grid>
        </>
      )}

    </Grid>
  )
}

export default HomePage