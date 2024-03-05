import React from 'react'
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
const PostCard = () => {
    const navigate = useNavigate(``);


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

    ///reply modal
    const handleOpenReplyModal = () => {
        console.log("reply modal open");
    }

    //create retwwet 
    const handleCreateRetweet = () => {
        console.log("retweet");
    }
    //handle likes
    const handleLikeTweet =() =>{
        console.log("Like tweet");
    }

    return (
        <div className=''>
            {/* <div>
            <RepeatIcon />
            <p>Reshare</p>
        </div> */}
            <div className='flex space-x-5 mt-4'>
                <Avatar
                    alt="username"
                    src=""
                    className='cursor-pointer'
                    onClick={() => navigate(`/profile/${6}`)}
                />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex  cursor-pointer items-center space-x-1'>
                            <span className='font-semibold' >{"Ahmed Rashid"}</span>
                            <span className="text-gray-600">{"@AhmedRas01 "}</span>
                            <Verified />
                            <span>{" . 2m "}</span>
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

                    <div className='mt-2'>
                        <div className='cursor-pointer'>
                            <p className='mb-2 p-0'>Full stack project with spring boot and react</p>
                            <img
                                className='w-[28rem] border border-gray-400 rounded-lg p-5'
                                src={logo}
                                alt="" />

                        </div>
                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600 '>
                                <ChatBubbleOutlineIcon className='cursor-pointer'
                                    onClick={handleOpenReplyModal}
                                />
                                <p>23</p>
                            </div>
                            <div className={`${true} "text-pink-600" : "text-gray-600" space-x-3 flex item-center  `}>
                                <RepeatIcon className='cursor-pointer' onClick={handleCreateRetweet} />
                                <p>23</p>
                            </div>
                            <div className={`${true} "text-pink-600" : "text-gray-600" space-x-3 flex item-center  `}>
                                {true ?
                                    <FavoriteIcon className='cursor-pointer' onClick={handleLikeTweet} /> :
                                    <FavoriteBorderIcon className='cursor-pointer' onClick={handleLikeTweet} />
                                }
                                <p>23</p>
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
        </div>
    )
}

export default PostCard