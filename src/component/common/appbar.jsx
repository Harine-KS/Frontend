import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useScrollTrigger } from '@mui/material'
import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Userview from '../screen/userview';
import MuiDrawer from '@mui/material/Drawer';
import { ChevronLeft, ChevronRight, Group, Inbox, LibraryBooks, Logout, Mail, Menu, PersonOutline } from '@mui/icons-material';
import AddFormBook from '../screen/addformbook';
import Dashboard from '../screen/dashboard';
import UserForm from '../screen/userform';
import Cookies from 'js-cookie';
export default function AppbarComponent() {
    const theme = useTheme();
    const mobileMatches = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const role = localStorage.getItem('role')
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    const Drawerr = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />

            <AppBar position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }} >
                <Toolbar sx={{ bgcolor: 'white' }}>
                    <Grid container display='flex'>
                        <Grid item lg={0.6} sm={0.8} md={0.6} xs={1.3}>
                            <IconButton color='black' onClick={mobileMatches ? handleDrawerToggle : handleDrawerOpen}>
                                <Menu />
                            </IconButton>
                        </Grid>
                        <Grid item display='flex' lg={11.3} ms={11.3} sm={11} xs={10.7} justifyContent='space-between' alignItems='center'>
                            <Typography mr={2} variant='h6' color={'black'}>Library Management</Typography>
                            <Avatar alt="Travis Howard" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf7cjBh8rg0Pbd7o0YmzdiVtvQSFGFo3AIeCrFI494&s' />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {mobileMatches ? <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            > <Toolbar />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => {
                            navigate('/')
                        }}
                            sx={{
                                minHeight: 48,
                                justifyContent: mobileOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: mobileOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText primary="Books" sx={{ opacity: mobileOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    {role == 'Admin' ?
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                navigate('/userview')
                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: mobileOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: mobileOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="UserManagement" sx={{ opacity: mobileOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem> : <></>}
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => {
                            navigate('/userform')
                        }}
                            sx={{
                                minHeight: 48,
                                justifyContent: mobileOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: mobileOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="My Profile" sx={{ opacity: mobileOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => {
                            Cookies.remove('accessToken');
                            navigate('/')
                            window.location.reload();
                        }}
                            sx={{
                                minHeight: 48,
                                justifyContent: mobileOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: mobileOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: mobileOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer> :
                <Drawerr variant="permanent" open={open}>
                    <Toolbar />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {

                                navigate('/')
                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LibraryBooks />
                                </ListItemIcon>
                                <ListItemText primary="Books" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        {role == 'Admin' ?
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton onClick={() => {

                                    navigate('/userview')
                                }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Group />
                                    </ListItemIcon>
                                    <ListItemText primary="UserManagement" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem> : <></>}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                navigate('/userform')
                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }} >
                                    <PersonOutline />
                                </ListItemIcon>
                                <ListItemText primary='My Profile' sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                Cookies.remove('accessToken');
                                navigate('/')
                                window.location.reload();
                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawerr>}
            <Box component="main" sx={{ bgcolor: 'primary.bgcolor', flexGrow: 1 }} >
                <Toolbar />
                <Routes>
                    <Route path='/' element={<Dashboard />}></Route>
                    <Route path='/bookform' element={<AddFormBook />}></Route>
                    <Route path='/userform' element={<UserForm />}></Route>
                    {role == 'Admin' ? <Route path='/userview' element={<Userview />}></Route> : <></>}

                </Routes>
            </Box>
        </Box >
    )
}
