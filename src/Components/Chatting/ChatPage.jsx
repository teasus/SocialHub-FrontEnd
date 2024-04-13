import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAMessage, getAllMessages, getChatDetailsById, websocketMessage } from '../../Store/Chat/Action';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid, Avatar, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { MessageBox, ChatItem } from "react-chat-elements"
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import * as Yup from 'yup';
import { uploadToCloudnary } from '../Utils/uploadToCloudnary';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is Required")
})
const ChatPage = () => {
  const [uploadingImg, setUploadingImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const { auth, chats } = useSelector(state => state);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => navigate(-1);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'end' });
    }
  };

  const handleSubmit = (values, actions) => {

    console.log("value ", values);
    console.log("imguploading.. ", uploadingImg, " img selected ? ", selectedImage);
    dispatch(createAMessage({ ...values, image: selectedImage ? values.image : null }, id));
    setSelectedImage(null);
    actions.resetForm();
    scrollToBottom();

    setUploadingImg(false);

  }

  const formik = useFormik({
    initialValues: {
      content: "",
      image: ""
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


  useEffect(() => {
    dispatch(getChatDetailsById(id));
    dispatch(getAllMessages(id));
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });


  }, [])

  useEffect(() => {
    dispatch(getAllMessages(id));
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });


  }, [chats?.message])












  return (
    <div style={{}} >
      <section className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>


        <Paper className='mt-5 cursor-pointer' elevation={5}
          //onClick={() => handleChatClick(chatRooms)}
          sx={{


            maxWidth: "100%",
            flexGrow: 1,
            borderTop: "1px",
            backgroundColor: (theme) =>
              theme.palette.mode === '#f5f5f5',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <KeyboardBackspaceIcon className='cursor-pointer me-5' onClick={handleBack} />
              <ButtonBase sx={{ width: 80, height: 80 }}>
                <Avatar alt='username' src={chats?.chat?.chatImage} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs>
                  <h1 className='py-6 text-xl font-bold opacity-90 '>{chats?.chat?.chatName}</h1>

                </Grid>

              </Grid>


            </Grid>
          </Grid>
        </Paper>
      </section>

      <section style={{ height: selectedImage ? '65vh' : '70vh', overflow: 'scroll' }}>
        {chats?.websocketMessage?.map((messagesw) =>
          !messagesw?.multiMedia?
            <MessageBox
              position={auth?.user?.fullName === messagesw?.user?.fullName ?
                "right" : "left"}
              title={messagesw?.user.fullName}
              type='text'
              text={messagesw?.content}
              date={messagesw?.createdAt}
              replyButton={true}
            />
            :
            <MessageBox
              position={auth?.user?.fullName === messagesw?.user?.fullName ?
                "right" : "left"}
              title={messagesw?.user.fullName}
              type='photo'
              text={messagesw?.content}
              data={{
                uri: `${messagesw?.image}`,
                width:500,height:500
              }}
              date={new Date()}
              replyButton={true}
            />

        )}
        <div ref={messagesEndRef} />


      </section>

      <section className='pb-2' >
        <div className='flex flex-col' >
          <div className='flex space-x-5'>


            <div className='w-full'>
              {selectedImage &&
                <div className='flex align-middle text-center  ' >
                  <div className=' bg-slate-100' style={{
                    border: "1px solid gray", width: "220"
                  }} >
                    {selectedImage && <img src={selectedImage} height={120} width={120} alt='' />}
                  </div>
                </div>
              }

              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input type='text' name='content' placeholder='type a message.....'
                    className='border-none outline-none text-xl bg-transparent '
                    {...formik.getFieldProps("content")}
                  />


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
                      SEND
                    </Button>
                  </div>
                </div>
              </form>

            </div>

          </div>

        </div>

      </section>




    </div>
  )
}

export default ChatPage