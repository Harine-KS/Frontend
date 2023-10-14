import { Alert, Button, Container, Grid, IconButton, InputAdornment, MenuItem, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const [errmsg, setErrmsg] = useState(false);
  const [dynamic, setDynamic] = useState({
    state: false,
    type: 'signin'
  })
  const smallMobileMatches = useMediaQuery("(max-width:380px)");
  function SignUp() {
    let schema = yup.object().shape({
      name: yup.string().matches(/^[A-Za-z]{2,20}$/, "Name should be Alphabets").required("This field is required"),
      userId: yup.string().matches(/^[A-Za-z0-9_@&]{2,20}$/, "User Id should be Alphanumeric")
        .required("This field is required"),
      email: yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
      password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$#&*~]).{8,15}/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ).required("this field is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
      role: yup.string().required(),

    });
    const [message, setMessage] = useState(false);
    const userTypeDropdown = ["Admin", "User"];
    const {
      register,
      handleSubmit,
      getValues,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const [values, setValues] = useState(false);
    const handleClickShowPassword = () => {
      setValues(!values);
    };
    const [password, setPassword] = useState(false);
    const handleClickShowPasswordValue = () => {
      setPassword(!password);
    };
    const onSubmit = async (data) => {
      try {
        await axios.post('http://localhost:3001/register', data).then((response) => {
          if (response.status == 200) {
            setMessage(true)
            setTimeout(() => {
              setMessage(false)
              setDynamic({ state: false, type: 'signin' })
            }, 2000)
          }
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }

    }


    return (
      <Container maxWidth='100%' sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={message} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Created Successfully!!
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        >
          <Grid container display='flex' justifyContent='center' alignContent='center' sx={{ minHeight: '100vh' }} rowGap={3}>

            <Grid container boxShadow={8} lg={5} md={6.4} sm={8.4} xs={11} rowGap={3} p={2} borderRadius={3} mt={5} backgroundColor={'rgba(247, 241, 213, 0.39)'}>
              <Grid item lg={12} textAlign='center'>
                <Typography variant='h4'>Sign Up </Typography>
              </Grid>

              <Grid container rowGap={2} justifyContent={'space-around'}  >
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
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
                        error={errors.name ? true : false}
                        helperText={errors.name?.message}
                        {...register("name", { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
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
                        fullWidth
                        error={errors.email ? true : false}
                        helperText={errors.message}
                        {...register("email", { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
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
                        required
                        fullWidth
                        error={errors.userId ? true : false}
                        helperText={errors.userId?.message}
                        {...register("userId", { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                  <Controller
                    control={control}
                    name="role"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        {...register("role", {
                          required: true,
                        })}
                        label="Role"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        error={errors.role ? true : false}
                        helperText={errors.role?.message}
                      // inputProps={{ readOnly: editForm }}
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
                    rules={{ required: true }}
                  />

                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={values ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {values ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...register('password', { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12} >
                  <Controller
                    control={control}
                    name="confirmPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={password ? 'text' : 'password'}
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPasswordValue}
                                edge="end"
                              >
                                {password ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...register('confirmPassword', { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>

              </Grid>

              <Grid item display='flex' lg={11.7} md={11.7} sm={11.7} xs={12} justifyContent='flex-end' my={2} >
                <Button sx={{
                  bgcolor: '#414141', color: 'white', '&:hover': {
                    bgcolor: '#414141',
                    color: 'white',
                  },
                }} variant='contained' type='submit' >Register</Button>
              </Grid>


            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
  function SignIn() {
    const [values, setValues] = useState(false);
    const [message, setMessage] = useState(false);
    const handleClickShowPassword = () => {
      setValues(!values);
    };
    let schema = yup.object().shape({
      userId: yup.string().matches(/^[A-Za-z0-9_@&]{2,20}$/, "User Id should be Alphanumeric")
        .required("This field is required"),
      password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$#&*~]).{8,15}/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ).required("this field is required"),
    });
    const {
      register,
      handleSubmit,
      getValues,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
      try {

        await axios.post('http://localhost:3001/login', data).then((response) => {
          if (response.status == 200) {
            setErrmsg(false)
            setMessage(true)
            Cookies.set('accessToken', response.data.token);
            localStorage.setItem("userId", response.data.userId)
            localStorage.setItem("role", response.data.role);
            setTimeout(() => {
              setMessage(false)
              window.location.reload();
            }, 2000)
          }
        }).catch((error) => {
          setErrmsg(true);
          setTimeout(() => {
            setErrmsg(false)
          }, 2000)
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    return (
      <Container maxWidth='100%' sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={message} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            LoggedIn Successfully!!
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        >
          <Grid container display='flex' justifyContent='center' alignContent='center' sx={{ minHeight: '100vh' }} rowGap={3}>
            <Grid container boxShadow={8} lg={5} md={6} sm={7} xs={10} rowGap={3} p={2} borderRadius={3} mt={6} backgroundColor={'rgba(247, 241, 213, 0.39)'}>
              <Grid item lg={12} md={12} sm={12} xs={12} textAlign='center'>
                <Typography variant='h4'>Welcome </Typography>
              </Grid>
              {errmsg ? <Grid item lg={12} md={12} sm={12} xs={12} textAlign='center'>
                <Typography color='red' variant='body1'>Invalid Credentials</Typography>
              </Grid> : <></>}
              <Grid container rowGap={2} justifyContent={'center'}>
                <Grid item lg={7} md={9} sm={9.5} xs={11} >
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
                        required
                        fullWidth
                        error={errors.userId ? true : false}
                        helperText={errors.userId?.message}
                        {...register("userId", { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
                <Grid item lg={7} md={9} sm={9.5} xs={11} >
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={values ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        error={errors.password}
                        helperText={errors?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {values ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        {...register('password', { required: true })}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid item lg={12} md={12} xs={12} display={'flex'} justifyContent='center' columnGap={{ md: 0.5, sm: 0.2 }}>
                  {smallMobileMatches ?
                    <Typography >Don't have an account?
                      <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setDynamic({ state: true, type: 'signup' })} >Register now</Typography>
                    </Typography> : <> <Typography >Don't have an account? </Typography>
                      <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setDynamic({ state: true, type: 'signup' })} >Register now</Typography>
                    </>}  </Grid>
                <Grid item display='flex' lg={9.7} md={10.2} sm={10.5} xs={11.4} justifyContent='flex-end' mt={3} mb={2} >
                  <Button sx={{
                    bgcolor: '#414141', color: 'white', '&:hover': {
                      bgcolor: '#414141',
                      color: 'white',
                    },
                  }}
                    variant='contained' type='submit'>Login</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )

  }

  return (
    <>
      {dynamic.state && dynamic.type == 'signup' ? <SignUp /> : <SignIn />}
    </>
  )

}
