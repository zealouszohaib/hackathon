/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import authImg from '../../assets/auth.png';

import { Link, Outlet } from 'react-router-dom';
function Auth() {
  return (
    <div
      style={{
        backgroundImage: `url(${authImg})`,
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover',
        height: '100vh', 
        width: '100vw', 
      }}
      className='d-flex justify-content-center align-content-center'
    >
      <Outlet/>
    </div>
  )
}

export default Auth;