import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
  outline: "none"
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathh, usePathh] = useState('/');

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
    console.log(location.pathname);
  }


  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='text-center font-bold text-3xl pb-20'>
            Create your account
          </h1>
          {location.pathname === '/signup' ? <SignUpForm /> : <SignInForm />}

          <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
            {location.pathname === '/signup' ? "Already have Account" : "If you don't have account"}
          </h1>
          <Button variant='outlined'
            onClick={handleNavigate}
            sx={{ borderRadius: "29px", paddingY: "15px" }}
            fullWidth >
            {location.pathname === '/signup' ? "SignIn" : "SignUp"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
