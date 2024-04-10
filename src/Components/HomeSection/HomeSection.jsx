import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweets } from './../../Store/Tweet/Action';
import { tweetReducer } from './../../Store/Tweet/Reducer';
import { uploadToCloudnary } from '../Utils/uploadToCloudnary';
import { BorderColor } from '@mui/icons-material';
import { Divider } from '@mui/material';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Post text is Required")
})

const HomeSection = () => {

    const [uploadingImg, setUploadingImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { tweet } = useSelector(state => state);
    const handleSubmit = (values, actions) => {
        console.log("value ", values);
        console.log("imguploading.. ", uploadingImg, " img selected ? ", selectedImage);
        dispatch(createTweet(values));
        setSelectedImage(null);
        actions.resetForm();
        setUploadingImg(false);
    }
   // console.log("tweets ", tweet);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTweets());

    }, [tweet.like, tweet.reTweet, tweet.tweet])

    useEffect(() => {
       // console.log("tweets ", tweet);

    }, [tweet])




    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            isTweet: true
        },
        onSubmit: handleSubmit,
        validationSchema,
    })

    //select image 
    const handleSelectImage = async (event) => {
        setUploadingImg(true);
        const imgUrl = await uploadToCloudnary(event.target.files[0]);
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImg(false);
    }
    return (
        <div className='space-y-5'>
            <section>
                <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>
            </section>
            <section className='pb-5'>
                <div className='flex flex-col'>
                    <div className='flex space-x-5'>
                        <Avatar alt='username' />
                        <div className='w-full'>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <input type='text' name='content' placeholder='what is happening...?'
                                        className='border-none outline-none text-xl bg-transparent '
                                        {...formik.getFieldProps("content")}
                                    />
                                    {formik.errors.content && formik.touched.content &&
                                        (
                                            <span className='text-red-500'>{formik.errors.content}</span>
                                        )
                                    }

                                </div>


                                <div className='flex justify-between items-center mt-4'>
                                    {/* img upload */}
                                    <div className='flex space-x-5 items-center'>

                                        <label className='flex items-center space-x-2 rounded-md cursor-pointer' >
                                            <ImageIcon className='text-[#22D663]' />
                                            <input
                                                type='file'
                                                name="imageFile"
                                                className='hidden'
                                                onChange={handleSelectImage} />
                                        </label>

                                        <FmdGoodIcon className='text-[#22D663]' />
                                        <TagFacesIcon className='text-[#22D663]' />

                                    </div>


                                    <div>
                                        <Button className='BtnCr'
                                            type='submit'


                                            sx={{
                                                width: "100%",
                                                borderRadius: "29px",
                                                py: "8px", px: '20px',
                                                bgcolor: "#22D663"
                                            }}
                                            variant='contained'>
                                            SHARE
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                    {selectedImage &&
                        <div className='flex align-middle text-center justify-center mt-4 '>
                            <div className=' bg-slate-100' style={{
                                border: "1px solid gray", width: "70%"
                            }} >
                                {selectedImage && <img src={selectedImage} style={{ padding: "5px" }} alt='' />}
                            </div>
                        </div>
                    }
                </div>

            </section>
            <Divider sx={{ margin: "0rem 0rem" }} />
            <section>
                {tweet.tweets.map(item => <PostCard item={item} />)}
            </section>

        </div>
    )
}

export default HomeSection