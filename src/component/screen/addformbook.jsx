import { Alert, Button, Container, Grid, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PopupComponent from '../common/popup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import Cookies from 'js-cookie';
export default function AddFormBook() {
    const token = Cookies.get('accessToken');
    const navigate = useNavigate();
    const smallMobileMatches = useMediaQuery("(max-width:380px)");
    const [openModal, setOpenModal] = useState({
        open: false,
        row: {},
        pageType: ''
    });
    const [message, setMessage] = useState(false);
    const location = useLocation();
    const role = localStorage.getItem('role')
    const id = location.state.id;
    const [edit, setEdit] = useState(true);
    let schema = yup.object().shape({
        author: yup.string().required("This field is required"),
        title: yup.string().required('this field is required'),
        publicationYear: yup.number().required('this field is required'),
        genre: yup.string().required('this field is required'),
        ISBN: yup.string().required('this field is required'),
        description: yup.string()
    });
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [res, setRes] = useState({});
    useEffect(() => {

        if (location.state.pageType == 'Add') {
            setEdit(false)
        }
        else {

            axios.get(`http://localhost:3001/books/get/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {

                setRes(res.data);
                reset(res.data);
            }).catch((error) => console.log(error))
        }
    }, [edit])

    const onSubmit = async (data) => {
        try {
            if (location.state.pageType == 'Add') {
                await axios.post('http://localhost:3001/books/post', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.status == 200) {
                        setMessage(true)
                        setTimeout(() => {
                            setMessage(false)
                            navigate('/')
                        }, 2000)
                    }
                }).catch((error) => {
                    setTimeout(() => {
                    }, 2000)
                    console.log(error)
                })
            }
            else if (location.state.pageType == 'edit') {
                await axios.put(`http://localhost:3001/books/update/${id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.status == 200) {
                        setMessage(true)
                        setTimeout(() => {
                            setMessage(false)
                            navigate('/')
                        }, 2000)

                    }
                }).catch((error) => { console.log(error) })
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <PopupComponent openModal={openModal} setOpenModal={setOpenModal} />
            <Container maxWidth='100%' sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={message} autoHideDuration={3000}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {location.pageType == 'Add' ? 'Books Created Successfully!!' : 'Books Updated Successfully!!'}
                    </Alert>
                </Snackbar>
                <form onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                })}
                >
                    <Grid container sx={{ minHeight: '91.3vh' }} display='flex' justifyContent='center' alignContent='center' rowGap={3}>

                        <Grid container boxShadow={8} lg={10} md={10} sm={10} xs={12} rowGap={3} p={2} borderRadius={3} backgroundColor={'rgba(247, 241, 213, 0.39)'}>
                            <Grid item lg={12} md={12} sm={12} xs={12} textAlign='center' my={2}>
                                <Typography variant='h4'>Book Details </Typography>
                                {role == 'User' ? location.state.pageType == 'Add' || !edit ? <></> :
                                    <Grid item display='flex' justifyContent='flex-end'>
                                        <Grid item lg={0.8}>
                                            <Button variant='contained' onClick={() => { setEdit(false) }}>Edit</Button>
                                        </Grid>
                                        <Grid item lg={1}>
                                            <Button variant='contained' color='error' onClick={() => {
                                                setOpenModal({
                                                    open: true,
                                                    row: res,
                                                    pageType: 'delete'
                                                })
                                            }} >Delete</Button>
                                        </Grid>
                                    </Grid> : <></>}
                            </Grid>
                            <Grid container rowGap={4} columnGap={2} justifyContent={'space-around'} my={edit ? 3 : 0} >
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                                    <Controller
                                        control={control}
                                        name="author"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Author Name"
                                                variant="outlined"
                                                size="small"
                                                required
                                                inputProps={{ readOnly: edit }}
                                                fullWidth
                                                error={errors.author ? true : false}
                                                helperText={errors.author?.message}
                                                {...register("author", { required: true })}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                                    <Controller
                                        control={control}
                                        name="title"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Title"
                                                variant="outlined"
                                                size="small"
                                                required
                                                fullWidth
                                                inputProps={{ readOnly: edit }}
                                                error={errors.title ? true : false}
                                                helperText={errors.title?.message}
                                                {...register("title", { required: true })}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}  >
                                    <Controller
                                        control={control}
                                        name="publicationYear"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Published Year"
                                                variant="outlined"
                                                size="small"
                                                required
                                                fullWidth
                                                inputProps={{ readOnly: edit }}
                                                error={errors.publicationYear ? true : false}
                                                helperText={errors.publicationYear?.message}
                                                {...register("publicationYear", { required: true })}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                                    <Controller
                                        control={control}
                                        name="genre"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Genre"
                                                variant="outlined"
                                                size="small"
                                                required
                                                fullWidth
                                                inputProps={{ readOnly: edit }}
                                                error={errors.genre ? true : false}
                                                helperText={errors.genre?.message}
                                                {...register("genre", { required: true })}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                                    <Controller
                                        control={control}
                                        name="ISBN"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="ISBN"
                                                variant="outlined"
                                                size="small"
                                                required
                                                fullWidth
                                                inputProps={{ readOnly: edit }}
                                                error={errors.ISBN ? true : false}
                                                helperText={errors.ISBN?.message}
                                                {...register("ISBN", { required: true })}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                                    <Controller
                                        control={control}
                                        name="description"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Description"
                                                variant="outlined"
                                                size="small"

                                                fullWidth
                                                inputProps={{ readOnly: edit }}
                                                error={errors.description ? true : false}
                                                helperText={errors.description?.message}
                                                {...register("description")}
                                            />
                                        )}
                                        rules={{ required: true }}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} display={location.state.pageType == 'Add' || !edit ? 'flex' : 'none'} justifyContent='flex-end' my={2}>
                                <Grid item lg={1.3} md={2} sm={2.6} xs={smallMobileMatches ? 6.2 : 4.3}  >
                                    <Button variant='outlined' sx={{
                                        color: '#414141', border: '1px solid #414141', '&:hover': {
                                            color: '#414141', border: '1px solid #414141'
                                        }

                                    }} onClick={() => {
                                        navigate('/')
                                        reset()
                                    }}>Cancel</Button>
                                </Grid>
                                <Grid item lg={1} md={1.4} sm={1.9} xs={smallMobileMatches ? 4.4 : 3}>
                                    <Button variant='contained' sx={{
                                        bgcolor: '#414141', color: 'white', '&:hover': {
                                            bgcolor: '#414141',
                                            color: 'white',
                                        },
                                    }} type='submit'>{location.state.pageType == 'Add' ? 'Post' : 'Update'}</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>

    )

}
