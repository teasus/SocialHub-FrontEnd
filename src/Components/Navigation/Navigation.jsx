import React from 'react'
import logo from '../../assets/SocioBlendIcon.svg'
import logoText from '../../assets/SocialHubText.png'
import { navigationMenu } from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navigation = () => {

    const navigate = useNavigate();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);

    };
    const handleLogout = () => {
        console.log("log-out");
        handleClose();
    };
    return (
        <div className='h-screen sticky top-0 '>
            <div>
                <div className='flex space-x-3'>
                    <div >
                        <img class="" height="60" width="60" src={logo} alt='' />

                    </div>
                    <div className='flex items-center '>
                        <img class="h-6"  width="90" src={logoText} alt='' />
                    </div>
                </div>
                <div className='space-y-6 mt-3 '>
                    {navigationMenu.map((item) =>
                        <div id={item.title} key={item.title} class='flex  space-x-4 cursor-pointer' onClick={() =>
                            item.title === "Profile" ? navigate(`/profile/${5}`) : navigate(item.path)} >
                            {item.icon}
                            <p className='text-xl'>{item.title}</p>
                        </div>
                    )}

                </div>

                <div className='py-7'>
                    <Button className='BtnCr' sx={{ width: "100%", borderRadius: "29px", py: "15px", bgcolor: "#22D663" }}
                        variant='contained'>
                        SHARE
                    </Button>

                </div>

            </div>
            <div className=''>
                <div className='flex items-center w-100 ' onClick={()=>navigate(`/profile/${6}`) } >
                    <div className='flex items-center space-x-3 grow '>
                        <Avatar alt='username' />
                        <div className='flex-column'>
                            <p className='text-center'>Ahmed Rashid</p>
                            <p className='text-center text-gray-500'>@AhmedRas01</p>
                        </div>
                    </div>
                    <div className=''>

                        <div>
                            <MoreHorizIcon
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Dashboard
                            </MoreHorizIcon>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </div>
                    <div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Navigation