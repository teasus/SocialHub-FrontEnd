import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, getAllMessages } from '../../Store/Chat/Action';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Asynchronous from './UserSearch';
import { Grid, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { GoDotFill } from "react-icons/go";

const ChatList = () => {

  const dispatch = useDispatch();
  const { chats } = useSelector(state => state);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getAllChats());


  }, [])
  useEffect(() => {
    dispatch(getAllChats());


  }, [chats?.chat])


  useEffect(() => {
    console.log(chats?.chats);


  }, [chats?.chats])


  const handleChatClick = (chat) => {

    navigate(`/chat/${chat.id}`)



  }



  return (
    <>
      <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
        <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Messages</h1>
      </section>
      <section>
        <Asynchronous />
      </section>
      <section className='mt-20' >

        {
          chats?.chats?.map((chatRooms) =>

            <Paper className='mt-5 cursor-pointer'
              elevation={3}
              onClick={() => handleChatClick(chatRooms)}
              sx={{
                p: 1,

                maxWidth: "100%",
                flexGrow: 1,
                borderTop: "1px",
                backgroundColor: (theme) =>
                  theme.palette.mode === '#f5f5f5',
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 70, height: 70 }}>
                    <Avatar alt='username' src={chatRooms?.chatImage} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {chatRooms?.chatName}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {"4+ new messages"}
                      </Typography>
                    </Grid>

                  </Grid>
                  <Grid>
                    <Typography>&nbsp;</Typography>
                    <GoDotFill />
                    <Typography></Typography>
                  </Grid>

                </Grid>
              </Grid>
            </Paper>


          )

        }

      </section>
    </>
  )
}

export default ChatList;