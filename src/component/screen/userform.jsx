import { Alert, Button, Container, Grid, MenuItem, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function UserForm() {
    const [edit, setEdit] = useState(true);
    const token = Cookies.get('accessToken')
    const smallMobileMatches = useMediaQuery("(max-width:380px)");
    let schema = yup.object().shape({
        name: yup.string().matches(/^[A-Za-z]{2,20}$/, "Name should be Alphabets").required("This field is required"),
        userId: yup.string().matches(/^[A-Za-z0-9_@&]{2,20}$/, "User Id should be Alphanumeric")
            .required("This field is required"),
        email: yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        role: yup.string(),
    });
    const [message, setMessage] = useState(false)
    const userTypeDropdown = ["Admin", "User"];
    const {
        register,
        handleSubmit,
        getValues,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            axios.get(`http://localhost:3001/books/getById`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                reset(res.data);
            }).catch((error) => console.log(error))
        })()
    }, [])

    const onSubmit = async (data) => {
        await axios.put(`http://localhost:3001/books/updateById`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res, "resss")
            if (res.status == 200) {
                setMessage(true)
                setTimeout(() => {
                    setMessage(false)
                    navigate('/')
                }, 2000)
            }
        }).catch((error) => console.log(error))
    }

    return (
        <Container maxWidth='100%' sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={message} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Updated Successfully!!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit((data) => {
                onSubmit(data);
            })}
            >
                <Grid container display='flex' justifyContent='center' alignContent='center' sx={{ minHeight: '91.3vh' }} >

                    <Grid container boxShadow={8} lg={10} rowGap={3} p={2} borderRadius={3} backgroundColor={'rgba(247, 241, 213, 0.39)'}>
                        <Grid item lg={7} sm={7} xs={12} textAlign={{ xs: 'center', sm: 'right' }} my={{ sm: 2 }}>
                            <Typography variant='h4'>My Profile </Typography>
                        </Grid>
                        {edit ? <Grid item lg={4.8} sm={4.8} xs={12} textAlign='right' my={{ sm: 2 }}>
                            <Button variant='contained' onClick={() => {
                                setEdit(false)
                            }}>Edit</Button>
                        </Grid> : <></>}
                        <Grid container rowGap={4} columnGap={2} justifyContent={'space-around'} my={edit ? { sm: 2 } : 0} >
                            <Grid item lg={5.5} sm={5.5} xs={12}>
                                <Controller
                                    control={control}
                                    name="name"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Name"
                                            variant="outlined"
                                            size="small"
                                            required
                                            fullWidth
                                            inputProps={{ readOnly: edit }}
                                            error={errors.name ? true : false}
                                            helperText={errors.name?.message}
                                            {...register("name", { required: true })}
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item lg={5.5} sm={5.5} xs={12}>
                                <Controller
                                    control={control}
                                    name="email"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            variant="outlined"
                                            size="small"
                                            required
                                            inputProps={{ readOnly: edit }}
                                            fullWidth
                                            error={errors.email ? true : false}
                                            helperText={errors.email?.message}
                                            {...register("email", { required: true })}
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item lg={5.5} sm={5.5} xs={12}>
                                <Controller
                                    control={control}
                                    name="userId"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="User ID"
                                            variant="outlined"
                                            size="small"
                                            // required
                                            fullWidth
                                            inputProps={{ readOnly: true }}
                                            error={errors.userId ? true : false}
                                            helperText={errors.userId?.message}
                                            {...register("userId")}
                                        />
                                    )}

                                />
                            </Grid>
                            <Grid item lg={5.5} sm={5.5} xs={12} >
                                <Controller
                                    control={control}
                                    name="role"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            {...register("role")}
                                            label="Role"
                                            variant="outlined"
                                            size="small"
                                            // required
                                            fullWidth
                                            error={errors.role ? true : false}
                                            helperText={errors.role?.message}
                                            inputProps={{ readOnly: true }}
                                        >
                                            {userTypeDropdown.map((dropdown) => {
                                                return (
                                                    <MenuItem key={dropdown} value={dropdown}>
                                                        {dropdown}
                                                    </MenuItem>
                                                );
                                            })}
                                        </TextField>
                                    )}

                                />
                            </Grid>


                        </Grid>
                        {edit ? <></> :
                            <Grid item lg={12} md={12} sm={12} xs={12} display='flex' justifyContent='flex-end' my={2}>
                                <Grid item lg={1.3} md={1.6} sm={2.2} xs={smallMobileMatches ? 5.5 : 4.5}  >
                                    <Button sx={{
                                        color: '#414141', border: '1px solid #414141', '&:hover': {
                                            color: '#414141', border: '1px solid #414141'
                                        }
                                    }} variant='outlined' onClick={() => { navigate('/') }}>Cancel</Button>
                                </Grid>
                                <Grid item lg={1} md={1.4} sm={2} xs={smallMobileMatches ? 4.3 : 3.7}>
                                    <Button sx={{
                                        bgcolor: '#414141', color: 'white', '&:hover': {
                                            bgcolor: '#414141',
                                            color: 'white',
                                        },
                                    }} variant='contained' type='submit'>Update</Button>
                                </Grid>

                            </Grid>}

                    </Grid>
                </Grid>
            </form>
        </Container >
    )

}
