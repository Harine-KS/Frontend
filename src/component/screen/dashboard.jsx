import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';


export default function Dashboard() {
    const token = Cookies.get('accessToken');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);
    useEffect(() => {
        (async () => {
            axios.get(role == 'User' ? 'http://localhost:3001/books/getAllById' : 'http://localhost:3001/books/getall', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    setResponse(res.data)
                }
            }).catch((error) => console.log(error))
        })()
    }, [])
    return (
        <Container maxWidth='100%' sx={{ minHeight: '91.3vh', backgroundImage: `url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Grid container rowGap={3} px={2} py={3}>
                {role == 'User' ?
                    <Grid item lg={12} sm={12} md={12} xs={12} display={'flex'} justifyContent='flex-end' sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        <Typography onClick={() => { navigate('/bookform', { state: { pageType: 'Add' } }) }}>+Add Book</Typography>
                    </Grid> : <></>}
                <Grid container gap={3}>
                    {response.map((item, index) => {
                        console.log(item, 'dajfa')
                        return (
                            <Grid item xl={2.8} lg={2.8} md={2.7} sm={3.7} xs={5.4} position="relative" sx={{ border: "0.1px solid #FAC84C", borderRadius: 1.2, boxShadow: 4, cursor: 'pointer' }}  >
                                < Grid item
                                    position={"absolute"}
                                    sx={{ left: { lg: -7, md: -6, sm: -4.5, xs: -5 }, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, background: 'linear-gradient(180deg, #FFC634 0%, #DC7617 68.48%)' }}
                                    width={{ xs: 5, lg: 7.3, md: 6, sm: 5 }}
                                    height={{ xs: 35, lg: 60, md: 60, sm: 50 }}
                                >
                                </Grid>
                                <div onClick={() => navigate('/bookform', { state: { pageType: 'edit', id: item._id } })}>
                                    <ImageListItem key={index} sx={{ objectFit: 'cover', aspectRatio: '3/2', m: .6, borderRadius: 2, position: "relative" }} >
                                        <img
                                            src='https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg'
                                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                                        />
                                        <ImageListItemBar
                                            title={
                                                < Grid item display={"flex"} justifyContent={"space-between"} alignItems="center">
                                                    <Typography fontWeight='bold' fontSize={{ xs: ".6rem", sm: ".8rem", md: ".9rem", lg: "1rem" }} >{item?.title}</Typography>
                                                    <Typography fontSize={{ xs: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem" }} >{role == 'User' ? item.genre : (`user: ${item.userId}`)}</Typography>
                                                </Grid>
                                            }
                                            subtitle={
                                                <Grid item display={"flex"} justifyContent="end" >
                                                    <Typography fontSize={{ xs: ".5rem", sm: '.7rem', md: '.8rem', lg: ".9rem" }} >{item.author}</Typography>
                                                </Grid>
                                            }
                                            sx={{ p: { lg: .7, md: .4, sm: .5, xs: .3 }, borderRadius: "0 0 4px 4px" }}
                                        />
                                    </ImageListItem>

                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    );
}

