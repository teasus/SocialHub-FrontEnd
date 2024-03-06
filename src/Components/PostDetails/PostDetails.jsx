import React from 'react'
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PostCard from '../HomeSection/PostCard';
const PostDetails = () => {
    
    const navigate = useNavigate(``);


   
    
   
    const handleBack = () => navigate(-1);
    return (
        <div className=''>
            {/* <div>
            <RepeatIcon />
            <p>Reshare</p>
        </div> */}
        
        
        {/* back btn */}

            <section className={`z-50 flex items-center sticky top-0 bg-opacity-100 bg-white`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Post</h1>
            </section>

            {/* postCard */}
            <section className=' flex items-center '>
                <PostCard />
                <Divider sx={{margin:"2rem 0rem"}} />
            </section>
            <section>
                {[1,1,1,1].map(item=><PostCard />)}
            </section>
        </div>
    )
}

export default PostDetails