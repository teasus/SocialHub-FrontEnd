import { Grid } from '@mui/material'
import React from 'react'
import Navigation from './../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import RightPart from '../RightPart/RightPart';
import { Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';
import PostDetails from '../PostDetails/PostDetails';
const HomePage = () => {
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
          <Route path="/" element={<HomeSection/>}></Route>
          <Route path="/home" element={<HomeSection/>}></Route>
          <Route path="profile/:id" element={<Profile />}></Route>
          <Route path="post/:id" element={<PostDetails />}></Route>
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