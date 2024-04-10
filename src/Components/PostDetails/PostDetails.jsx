import React, { useEffect } from 'react'
import { Divider } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PostCard from '../HomeSection/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { findTweetsByID } from '../../Store/Tweet/Action';
const PostDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {id}= useParams();
    const {tweet} = useSelector(state=>state);

    useEffect(() => {
        if(id){
            dispatch(findTweetsByID(id));
        }
    }, [tweet.like,tweet.reTweet]

    )

   



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
            <section className=' '>
                <PostCard item={tweet.tweet} />
                <Divider sx={{ margin: "1rem 0rem" }} />
            </section>
            {/*replies */}
            <h3 className='text-3xl font-bold' >Replies :</h3>
            <section className='ms-9'>
                {tweet.tweet?.replyTweets.map(item => <PostCard item={item} />)}
            </section>
        </div>
    )
}

export default PostDetails