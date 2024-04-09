import React, { useState } from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Verified } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/SocioBlendIcon.svg'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyModal from './ReplyModal';
import { useDispatch } from 'react-redux';
import { createRetweet, likeTweet } from '../../Store/Tweet/Action';
const PostCard = ({ item }) => {
    const navigate = useNavigate(``);
    const dispatch = useDispatch();
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const handleOpenReplyModal = () => setOpenReplyModal(true);
    const handleCloseReplyModal = () => setOpenReplyModal(false);
    console.log("user ", item);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setAnchorEl(null);

    };

    const handleDeletePost = () => {
        console.log("delete tweet");
        handleClose();
    };




    //create retwwet 
    const handleCreateRetweet = () => {
        console.log("retweet");
        dispatch(createRetweet(item?.id));
    }
    //handle likes
    const handleLikeTweet = () => {
        console.log("Like tweet");

        dispatch(likeTweet(item?.id));

    }

    return (
        <React.Fragment>

            <div className='flex space-x-5 mt-4'>
                <Avatar
                    alt="username"
                    src={item?.image}
                    className='cursor-pointer'
                    onClick={() => navigate(`/profile/${item?.user?.id}`)}
                />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex  cursor-pointer items-center space-x-1'>
                            <span className='font-semibold' >{item?.user?.fullName}</span>
                            <span
                                className="text-gray-600">
                                {'@' + item?.user?.fullName.split(' ').join("_").toLowerCase()}
                            </span>
                            <Verified />
                            <span>{item?.createdAt}</span>
                        </div>
                        <div >
                            <div>
                                <MoreHorizIcon
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                                    <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <div className='mt-2'  >
                        <div className='cursor-pointer' onClick={()=>navigate(`/tweet/${item.id}`)} >
                            {/* content */}
                            <p className='mb-2 p-0'>{item?.content}</p>
                            {item?.image && <img
                                className='w-[28rem] border border-gray-400 rounded-lg p-5'
                                src={item?.image}
                                alt=""
                            />}

                        </div>
                        {/* icons under post  */}
                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600 '>
                                <ChatBubbleOutlineIcon className='cursor-pointer'
                                    onClick={(e) => {
                                        handleOpenReplyModal();
                                        e.stopPropagation()
                                    }}
                                />
                                <p>{item?.totalReplies}</p>
                            </div>
                            <div className={` space-x-3 flex item-center  `}>
                                <RepeatIcon className={item?.reTweet ? ' text-pink-500 cursor-pointer' : 'text-gray-600 cursor-pointer'} onClick={handleCreateRetweet} />
                                <p>{item?.totalReTweets}</p>
                            </div>
                            <div className={`${item?.liked} ?' text-red-500' :' text-gray-600' space-x-3 flex item-center`}>
                                {item?.liked ?
                                    <FavoriteIcon className=' text-red-500 cursor-pointer' onClick={(e) => handleLikeTweet()} /> :
                                    <FavoriteBorderIcon className='cursor-pointer' onClick={(e) => handleLikeTweet()} />
                                }
                                <p>{item?.totalLikes}</p>
                            </div>
                            <div className={`${true} "text-pink-600" : "text-gray-600" space-x-3 flex item-center  `}>
                                <BarChartIcon className='cursor-pointer' onClick={handleOpenReplyModal} />
                                <p>230</p>
                            </div>
                            <div className={`${true} "text-pink-600" : "text-gray-600" space-x-3 flex item-center  `}>
                                <FileUploadIcon className='cursor-pointer' onClick={handleOpenReplyModal} />

                            </div>

                        </div>


                    </div>
                </div>
            </div>
            <section>
                <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal} item={item} />
            </section>
        </React.Fragment>
    )
}

export default PostCard