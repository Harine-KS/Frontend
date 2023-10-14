import React, { useEffect, useState } from 'react'
import TableComponent from '../common/tablecomp'
import { Autocomplete, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Delete, Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PopupComponent from '../common/popup';
import axios from 'axios';
import Cookies from 'js-cookie';
export default function Userview() {
    const token = Cookies.get('accessToken');
    const [openModal, setOpenModal] = useState({
        open: false,
        id: 0
    });
    let columns = [
        { id: 'userId', label: 'UserID', },
        { id: 'name', label: 'Name', },
        { id: 'email', label: 'Email', },
        { id: 'role', label: 'Role', },
    ];
    const [res, setRes] = useState([])
    useEffect(() => {
        (async () => {
            axios.get(`http://localhost:3001/books/getAllUser`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                setRes(res.data)
            }).catch((error) => console.log(error))
        })()
    }, [])
    function SuffixType({ row, index }) {
        return (
            <IconButton onClick={() => {
                setOpenModal({
                    open: true,
                    row: row,
                    pageType: 'deleteuser'
                })
            }} >
                <Delete sx={{ fontSize: 20, fill: 'red' }} />
            </IconButton>)
    }
    return (
        <>
            <PopupComponent openModal={openModal} setOpenModal={setOpenModal} />
            <Container maxWidth='100%' sx={{ minHeight: '91.3vh', backgroundImage: `url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Grid container rowGap={2} p={3} >
                    <Grid container justifyContent='space-between' alignSelf='center'  >
                        <Grid item my={2}>
                            <Typography fontWeight='bold' variant='h5'>User Management</Typography>
                        </Grid>   
                    </Grid>
                    <TableComponent
                        columns={columns}
                        rows={res}
                        suffixData={(row, index) => {
                            return <SuffixType row={row} index={index} />
                        }}
                    />
                </Grid>
            </Container >
        </>
    )
}
