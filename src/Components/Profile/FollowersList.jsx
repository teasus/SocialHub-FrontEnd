import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findUserById } from '../../Store/Auth/Action';
import { getUserTweets } from '../../Store/Tweet/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, ButtonBase, Grid, Paper, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const FollowersList = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const { id, type } = useParams();
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(findUserById(id));
        dispatch(getUserTweets(id));
    }, [], [auth.user, id, type])

    useEffect(() => {
        if (type === "Followers") {
            setUserList(auth.findUser.followers);
        }
        else if (type === "Followings") {
            setUserList(auth.findUser.following)
        }
    }, [auth.findUser, type, id],)

    useEffect(() => {
        console.log(userList);

    }, [userList])

    const handleBack = () => navigate(-1);



    return (
        <>
            <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>{type}</h1>

            </section>
            <section className='mt-20' >

                {
                    userList?.map((chatRooms) =>

                        <Paper className='mt-5 cursor-pointer'
                            elevation={6}
                            // onClick={() => handleChatClick(chatRooms)}
                            sx={{
                                p: 1,

                                maxWidth: "100%",
                                flexGrow: 1,
                                borderTop: "1px",
                                backgroundColor: (theme) =>
                                    theme.palette.mode === '#f5f5f5',
                            }}
                        >
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 70, height: 70 }}>
                                        <Avatar alt='username' onClick={() => navigate(`/profile/${chatRooms.id}`)} src={chatRooms?.image} />
                                    </ButtonBase>
                                </Grid>


                                <Grid item className='' >
                                    <Typography >
                                        {chatRooms?.fullName}&nbsp;<span className='text-gray-500 text-xs' > @{chatRooms?.fullName.split(' ').join("_").toLowerCase()}</span>
                                    </Typography>

                                </Grid>


                                <Grid>
                                    <Typography>&nbsp;</Typography>

                                    <Typography></Typography>
                                </Grid>


                            </Grid>
                        </Paper>


                    )

                }

            </section></>
    )
}

export default FollowersList