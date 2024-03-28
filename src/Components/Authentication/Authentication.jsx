import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import screenLogo from '../../assets/bg_screen.png'
import multiDeviceLogo from '../../assets/bg_multi.png'
import splashLogo from '../../assets/bg_splash.png'
import logo from '../../assets/SocioBlendIcon.svg'
import { GoogleLogin } from '@react-oauth/google'
import AuthModal from './AuthModal'
const Authentication = () => {

  const [openAuthModal,setOpenAuthModal] = useState(false);
  
  const handleOpenAuthModal =() => setOpenAuthModal(true);
  const handleCloseAuthModal =() => setOpenAuthModal(false);
  
  return (
    <div>
      
      <Grid className='overflow-y-hidden' container >

        <Grid className='hidden lg:block' item lg={8} >

          <img className='w-full h-screen ' src={multiDeviceLogo} alt='login/signup image' ></img>

          <div className='absolute top-[16%] left-[18%]  '>
            <img height={"500px"} width={"500px"} src={logo} />
          </div>

        </Grid>

        <Grid className='p-10 ' lg={4} xs={12} >
          <h1 className='font-bold text-7xl mt-10'>Happening Now</h1>
          <h1 className='font-bold text-3xl py-16'>Join SocialHub Today</h1>

          <div className='w-[60%]'>
            <div className='w-full'>

              <GoogleLogin width={330} />

              <p className='py-5 text-center'>OR</p>

              <Button onClick={handleOpenAuthModal} variant='contained' size='large' fullWidth
                sx={{ borderRadius: "29px", py: "7px", }} >
                Create Account
              </Button>

              <p className='text-sm mt-2'>By signing you agree to the Terms of Service and Privacy Policy, including Cookies Use.</p>

            </div>
            <div className='mt-10'>
              <h1 className='font-bold text-xl mb-5' >Already Have Account ?</h1>
              <Button onClick={handleOpenAuthModal} variant='contained' size='large' fullWidth
                sx={{ borderRadius: "29px", py: "7px", }} >
                Login
              </Button>
            </div>

          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  )
}

export default Authentication