import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Verified } from '@mui/icons-material';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4
};
const validationSchema = Yup.object().shape({
    content: Yup.string().required("Post text is Required")
})

export default function ReplyModal({ open, handleClose }) {

    const navigate = useNavigate();

   
    const [uploadingImg, setUploadingImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (values) => {
        console.log("value ", values);
        console.log("imguploading.. ", uploadingImg, " img selected ? ", selectedImage);
    }
    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            postId: 4
        },
        onSubmit: handleSubmit,
        validationSchema,
    })

    //select image 
    const handleSelectImage = (event) => {
        setUploadingImg(true);
        const imgUrl = event.target.files[0];
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImg(false);
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };





    return (
        <div>
           
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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


                            </div>
                            <div className='cursor-pointer'>
                                <p className='mb-2 p-0'>Full stack project with spring boot and react</p>


                            </div>


                        </div>
                    </div>
                    <section className='pb-10 py-10 '>
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
                                                POST
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
