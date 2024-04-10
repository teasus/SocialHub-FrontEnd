import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Verified } from '@mui/icons-material';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PostCard from '../HomeSection/PostCard';
import ProfileModal from './ProfileModal';
import { useSelector, useDispatch } from 'react-redux';
import { findUserById, followUserAction, getUserProfile } from '../../Store/Auth/Action';
import { getUserTweets } from '../../Store/Tweet/Action';

const Profile = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var fullDate = day + "-" + (month + 1) + "-" + year;
    const { id } = useParams();
    const dispatch = useDispatch();
    const { auth,tweet } = useSelector(state => state);

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false);


    const [tabValue, setTabValue] = useState('1');

    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    console.log(auth);


    useEffect(() => {
        dispatch(findUserById(id));
        dispatch(getUserTweets(id));
    }, [],[auth.user])







    const handleFollowUser = () => {
        dispatch(followUserAction(id));
        console.log("handle Follow User");
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === 4) {
            console.log("likes tweet");
        }
        else if (newValue === 1) {
            console.log("user tweet");
        }

    };


    return (
        <div>
            <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Profile</h1>
            </section>

            <section>
                <img className='w-[200%] h-[13rem] object-cover'
                    src={auth?.findUser?.backgroundImage}
                    alt='Add a Background image' />
            </section>
            <section>
                <div className='flex justify-between items-start mt-5 h-[5rem]'>
                    <Avatar alt='alt code' src={auth?.findUser?.image}
                        className='transform -translate-y-20'
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }} />

                    {auth?.findUser?.req_user ?
                        (
                            <Button onClick={handleOpenProfileModal} variant='contained' sx={{ borderRadius: "20px" }}>
                                Edit Profile
                            </Button>
                        ) : (
                            <Button onClick={handleFollowUser} variant='contained' sx={{ borderRadius: "20px" }}>
                                {auth?.findUser?.followed ? "Unfollow" : "Follow"}
                            </Button>
                        )}
                </div>
                <div>
                    <div className='flex items-center'>
                        <h1 className='font-bold'> {auth?.findUser?.fullName}</h1>
                        {true && <Verified />}
                    </div>
                    <h1 className='text-gray-500'>  {'@' + auth?.findUser?.fullName?.split(' ').join("_").toLowerCase()}</h1>
                </div>
                <div className='space-y-3 mt-2'>
                    <p>{auth?.findUser?.bio}</p>
                    <div className='py-1 flex space-x-5'>
                        <div className='flex items-center text-gray-500'>
                            <BusinessCenterIcon />
                            <p className='ml-2'>Education</p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <LocationOnIcon />
                            <p className='ml-2'>{auth?.findUser?.location}</p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <CalendarMonthIcon />
                            <p className='ml-2'>{"joined " + fullDate}</p>
                        </div>


                    </div>
                    <div className='flex items-center space-x-5 '>
                        <div className='flex items-center space-x-1 '>

                            <span>{auth?.findUser?.followers.length}</span>
                            <span>Followers</span>

                        </div>
                        <div className='flex items-center space-x-1 '>

                            <span>{auth?.findUser?.following.length}</span>
                            <span>Following</span>

                        </div>
                    </div>
                </div>
            </section>
            <section className=' py-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Posts" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                                <Tab label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {tweet.tweets.map(item => <PostCard item={item} />)}
                        </TabPanel>
                        <TabPanel value="2">User Replies</TabPanel>
                        <TabPanel value="3">User Media</TabPanel>
                        <TabPanel value="4">User Likes</TabPanel>
                    </TabContext>
                </Box>
            </section>
            <section>
                <ProfileModal open={openProfileModal} handleClose={handleClose} />
            </section>
        </div >
    )
}

export default Profile;