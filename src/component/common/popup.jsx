import { Button, Container, Grid, Modal, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PopupComponent({ openModal, setOpenModal }) {
    const mobileMatches = useMediaQuery("(max-width:500px)");
    const tabletMatches = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const handleClose = () => {
        setOpenModal({ open: false, row: {} })
    }
    const token = Cookies.get('accessToken')
    const onSubmit = () => {
        if (openModal.pageType == 'delete') {
            console.log(openModal.row);
            axios.delete(`http://localhost:3001/books/delete/${openModal.row._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    navigate('/')
                }

            }).catch((error) => console.log(error))

        }
        else if (openModal.pageType == 'deleteuser') {
            console.log(openModal.row);
            axios.delete(`http://localhost:3001/books/deleteUser/${openModal.row._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    window.location.reload()
                }

            }).catch((error) => console.log(error))
        }

    }
    return (
        <Modal
            BackdropProps={{ style: { backgroundColor: 'black', opacity: 0.2 } }}
            open={openModal.open}
            sx={{ outline: "none" }}
        >
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                borderRadius: "10px"
            }}>
                <Grid container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: mobileMatches ? '95%' : tabletMatches ? '50%' : '35%',
                    bgcolor: 'background.paper',
                    boxShadow: 4,
                    p: 3,
                    borderRadius: 3,
                }} rowGap={2} >

                    <Grid item xs={12}  >
                        <Typography sx={{ textAlign: 'center' }} >
                            Are you sure you want to delete?
                        </Typography>
                    </Grid>
                    <Grid container marginBottom={2} columnGap={{ lg: 1.3, xs: .6 }} >
                        <Grid item xs={5.8} display='flex' justifyContent="flex-end" >
                            <Button variant="outlined" size="small" sx={{
                                color: '#414141', border: '1px solid #414141', '&:hover': {
                                    color: '#414141', border: '1px solid #414141'
                                }

                            }} onClick={handleClose} >No</Button>
                        </Grid>
                        <Grid item xs={5.8}>
                            <Button variant="contained" sx={{
                                bgcolor: '#414141', color: 'white', '&:hover': {
                                    bgcolor: '#414141',
                                    color: 'white',
                                },
                            }} size="small" onClick={onSubmit} >Yes</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Modal>
    )
}
