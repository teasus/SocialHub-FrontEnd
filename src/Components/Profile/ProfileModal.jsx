import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudnary } from '../Utils/uploadToCloudnary';
import { useSelector } from 'react-redux';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4
};


export default function ProfileModal({ open, handleClose }) {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);



    //const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [selectedDpImg, setSelectedDpImg] = useState(null);
    const [selectedBgImg, setSelectedBgImg] = useState(null);



    const [imageUploading, setImageUploading] = useState(false);


    const handleSubmit = (values) => {
        dispatch(updateUserProfile(values));
        console.log("handle submit ", values);
        handleClose();
        setSelectedBgImg("");
        setSelectedDpImg("");
    }

    //   formik
    const formik = useFormik({
        initialValues: {
            fullName: "",
            website: "",
            location: "",
            bio: "",
            backgroundImage: "",
            image: ""

        },
        onSubmit: handleSubmit
    })

    const handleImgChange = async (event) => {
        console.log("img change");
        setImageUploading(true);
        const { name } = event.target;
        const file = await uploadToCloudnary(event.target.files[0]);
        formik.setFieldValue(name, file);
        if(name==="backgroundImage"){setSelectedBgImg(file);}
        if(name==="image"){setSelectedDpImg(file);}
        setImageUploading(false);
    }

    //handle submit



    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon />

                                </IconButton>
                                <p className='text-lg'>Edit profile</p>
                            </div>
                            <div>
                                <Button type='submit'>Save</Button>
                            </div>

                        </div>
                        <div className='overflow-y-scroll  overflow-x-hidden h-[80vh] hideScrollBar  '>
                            <React.Fragment>
                                <div className='w-full'>
                                    <div className='relative '>
                                        <img className=' w-full h-[14rem] object-cover object-center'
                                            src={selectedBgImg || auth?.user?.backgroundImage}
                                            alt='Click to Add a Background image'  />

                                        <input type='file' className="cursor-pointer absolute top-0 right-0 left-0 w-full h-full opacity-0"
                                            name='backgroundImage' onChange={handleImgChange}
                                        />

                                    </div>

                                </div>
                                <div className='w-full transform translate-y-21 ml-4 h-[6rem]'>
                                    <div className=' transform -translate-y-20'>
                                        <Avatar className='' src={selectedDpImg || auth?.user?.image}
                                            sx={{ width: "10rem", height: "10rem", border: "10px solid white" }}
                                        />

                                        <input type='file'
                                            name='image'
                                            onChange={handleImgChange}
                                            className=' opacity-0 absolute w-[10rem] top-0 left-0 h-full cursor-pointer' />
                                    </div>
                                </div>
                            </React.Fragment>


                            <div className='space-y-3'>
                                <TextField fullWidth id="fullName" name="fullName" label="Full Name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}

                                />
                                <TextField fullWidth id="bio" name="bio" label="Bio" size='large'
                                    multiline={true}
                                    rows={6}
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}

                                />
                                <TextField fullWidth id="website" name="website" label="Website"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}

                                />
                                <TextField fullWidth id="location" name="location" label="Location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}

                                />
                                <div>
                                    <div className='my-3 space-y-2'>
                                        <p className='text-lg'>Birth date - Edit</p>
                                        <p className='text-2xl'>October 26, 1999</p>
                                    </div>
                                    <p className='text-lg py-3' >Edit Professional Profile</p>
                                </div>

                            </div>

                        </div>


                    </form>

                </Box>
            </Modal>
        </div >
    );
}