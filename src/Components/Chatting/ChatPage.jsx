import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMessages, getChatDetailsById } from '../../Store/Chat/Action';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});
const ChatPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { chats } = useSelector(state => state);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getChatDetailsById(id));
    dispatch(getAllMessages(id));


  }, [])
  return (
    <div>
      <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>


        <Paper className='mt-5 cursor-pointer' elevation={5}
          //onClick={() => handleChatClick(chatRooms)}
          sx={{


            maxWidth: "100%",
            flexGrow: 1,
            borderTop: "1px",
            backgroundColor: (theme) =>
              theme.palette.mode === '#f5f5f5',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <KeyboardBackspaceIcon className='cursor-pointer me-5' onClick={handleBack} />
              <ButtonBase sx={{ width: 80, height: 80 }}>
                <Avatar alt='username' src={chats?.chat?.chatImage} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs>
                  <h1 className='py-6 text-xl font-bold opacity-90 '>{chats?.chat?.chatName}</h1>

                </Grid>

              </Grid>


            </Grid>
          </Grid>
        </Paper>
      </section>

      <section>
        <div>
          <Grid container>
            <Grid item xs={12} >
              <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
          </Grid>
          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
              <List>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="John Wick"></ListItemText>
                </ListItem>
              </List>
              <Divider />
              <Grid item xs={12} style={{ padding: '10px' }}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
              </Grid>
              <Divider />
              <List>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                  <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
                <ListItem button key="Alice">
                  <ListItemIcon>
                    <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Alice">Alice</ListItemText>
                </ListItem>
                <ListItem button key="CindyBaker">
                  <ListItemIcon>
                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={9}>
              <List className={classes.messageArea}>
                <ListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="09:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="2">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="left" secondary="09:31"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="3">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="10:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              <Divider />
              <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                  <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                </Grid>
                <Grid xs={1} align="right">
                  <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

      </section>

    </div>
  )
}

export default ChatPage