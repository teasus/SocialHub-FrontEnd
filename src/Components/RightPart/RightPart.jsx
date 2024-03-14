import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Subscript } from '@mui/icons-material';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import { useState } from 'react';

const RightPart = () => {

    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
    const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);


    const handleChangeTheme = () => {
        console.log("handle Change theme");
    }
    const getVerified = () => {
        console.log("get Veriffed");
    }
    return (
        <div className='py-5 sticky top-0'>

            <div className='relative flex items-center'>
                <input type='text' className='py-3 rounded-full text-gray-500 w-full
            pl-12'  />

                <div className='absolute top-0 left-0 pl-3 pt-3'>
                    <SearchIcon className='text-gray-500' />

                </div>
                <Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme} />
            </div>

            <section className='my-5'>
                <h1 className='text-xl font-bold'>
                    Get Verfied
                </h1>
                <h1 lassName='my-2 font-bold'>Subscribe to unlock new features</h1>
                <Button onClick={handleOpenSubscriptionModal} sx={{
                    padding: "10px", paddingX: "20px",
                    borderRadius: "25px"
                }}>
                    Get Verified
                </Button>
            </section>

            <section className='mt-7 space-x-3 space-y-5' >
                <h1 className='font-bold text-xl py-1' >
                    What's Happening ?
                </h1>
                <div>
                    <p className='text-sm'>FIFA Woman's world cup LIVE</p>
                    <p className='font-bold'>Philipines VS Switzerland</p>
                </div>
                {[1, 1, 1].map(item =>
                    <div className='flex justify-between w-100 '>
                        <div>
                            <p>Entertainment - Trending</p>
                            <p className='font-bold'>#TheMarvels</p>
                            <p>34.5 Tweets</p>

                        </div>
                        <MoreHorizIcon />
                    </div>
                )}

            </section>
            <section>
                <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}  />
            </section>
        </div>
    )
}

export default RightPart