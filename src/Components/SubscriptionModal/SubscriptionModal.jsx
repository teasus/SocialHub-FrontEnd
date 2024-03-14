import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton, TextField } from '@mui/material';
import bluetick from '../../assets/blueticklarge.png';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: 4,
    outline: "none",
    p: 4,
};

const features = [" Prioritizing rankings in conversation and search.",
    "Protection Against Impersonation.",
    "Participation in Verified Communities.",
    "Priority Support."];

export default function SubscriptionModal({handleClose,open}) {
    //const [open, setOpen] = useState(false);
    //const handleOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);




    const [plan, setPlan] = useState("Annually");

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <IconButton onClick={handleClose} aria-label="delete">
                                <CloseIcon />

                            </IconButton>
                            <p className='text-lg'>Subsciption</p>
                        </div>
                    </div>
                    <div className='flex justify-center py-10'>
                        <div className='w-[80%] space-y-10 '>
                            <div className='p-5 rounded-md flex items-center justify-between shadow-lg'>
                                <h1 className="text-xl pr-5">Subscribers with a verifed phone number wil get a blue checkmark once approved</h1>
                                <img src={bluetick} height={"160rem"} width={"160rem"} />
                            </div>
                            <div className='flex justify-between border rounded-full px-5 py-3 border-gray-300'>
                                <div>
                                    <span onClick={() => setPlan("Annually")} className={`${plan === "Annually" ? " text-black " : "text-gray-400"} cursor-pointer`}>Annually</span>
                                    <span className='text-green-500 text-sm ml-5'>SAVE 12%</span>
                                </div>
                                <p onClick={() => setPlan("Monthly")} className={`${plan === "Monthly" ? " text-black " : "text-gray-400"} cursor-pointer`}>
                                    Monthly
                                </p>
                            </div>
                            <div className='space-y-2'>
                                {features.map(item =>
                                    <div className='flex items-center space-x-5'>
                                        <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                                        <p className='text-sm'>{item} </p>
                                    </div>
                                )}

                            </div>
                            <div className='cursor-pointer flex justify-center  text-white bg-black rounded-full px-5 py-3'>
                                <span className='italic line-through'>₹7,800.00</span>
                                <span className='px-5'>₹6,500.00/year</span>
                            </div>
                        </div>
                    </div>



                </Box>
            </Modal>
        </div>
    );
}
