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
const HomePage = () => {

  const [stompClient,setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const connect = () => {
    const sock = new SockJS("http://localhost:3000/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  }

  const onError = (error) => {
    console.log("error ", error);
  }

  const onConnect =()=> {
    setIsConnect(true);
  }

  // useEffect(()=>{
  //   if(message)
  // })
 

  


  return (
    <Grid container className='px-5 lg:px-36 justify-between'>

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

    </Grid>
  )
}

export default HomePage