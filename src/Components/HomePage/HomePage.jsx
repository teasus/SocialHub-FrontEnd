import { Grid } from '@mui/material'
import React from 'react'
import Navigation from './../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';

const HomePage = () => {
  return (
    <Grid container className='px-5 lg:px-36 justify-between'>

      {/* xs=small screen lg = large screen */}
      {/* left */}
      <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative '>
        <Navigation />
      </Grid>
      {/* mid */}
      <Grid item xs={0} lg={6} className='hidden lg:block w-full relative '>
        <HomeSection />
      </Grid>
      {/* Right */}
      <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative '>
        <p className='text-center'>Right part</p>
      </Grid>

    </Grid>
  )
}

export default HomePage