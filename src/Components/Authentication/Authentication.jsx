import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import screenLogo from '../../assets/bg_screen.png'
import multiDeviceLogo from '../../assets/bg_multi.png'
import splashLogo from '../../assets/bg_splash.png'
import logo from '../../assets/SocioBlendIcon.svg'
import { GoogleLogin } from '@react-oauth/google'
import AuthModal from './AuthModal'
import { useNavigate } from 'react-router-dom';
const Authentication = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenAuthModalSignup = () => {
    navigate("/signup");
    setOpenAuthModal(true);

  };
  const handleOpenAuthModalSignIn = () => {
    navigate("/signin");
    setOpenAuthModal(true);
    

  };
  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
    navigate("/");

  };

  return (
    <div>

      <Grid className='overflow-y-hidden' container >

        <Grid className='hidden lg:block' item lg={8} xs={0} sm={7}  >

          <img className=' w-full h-screen ' src={multiDeviceLogo} alt='login/signup image' ></img>

          <div xs={4} sm={2}  className='  absolute top-[22%] left-[18%]  '>
            <img className='' height={"50%"} width={"50%"} src={logo} />
          </div>

        </Grid>

        

        <Grid className='p-10 ' container lg={4} xs={12} sm={5}  >
          <h1 className='font-bold text-7xl mt-5'>Happening Now</h1>
          <h1 className='font-bold text-3xl py-16'>Join SocialHub Today</h1>

          <div className=''>
            <div className='w-full'>

              <GoogleLogin width={330} />

              <p className='py-5 text-center'>OR</p>

              <Button onClick={handleOpenAuthModalSignup} variant='contained' size='large' fullWidth
                sx={{ borderRadius: "29px", py: "7px", }} >
                Create Account
              </Button>

              <p className='text-sm mt-2'>By signing you agree to the Terms of Service and Privacy Policy, including Cookies Use.</p>

            </div>
            <div className='mt-10'>
              <h1 className='font-bold text-xl mb-5' >Already Have Account ?</h1>
              <Button onClick={handleOpenAuthModalSignIn} variant='contained' size='large' fullWidth
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