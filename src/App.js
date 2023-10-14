
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppbarComponent from './component/common/appbar';
import Login from './component/screen/login';
import Cookies from 'js-cookie';


export default function App() {
  const [value, setValue] = useState(false);
  const token=Cookies.get('accessToken')
  // const handlechange = () => {
  //   setValue(true);
  // }
  // useEffect(() => {
  //   console.log('logn ')
  // }, [value])
  return (
    <>
      <Router>


        {token ?
        
          <AppbarComponent /> :
          <>
            <Login  />
           
          </>
        }


      </Router>
    </>
  )
}