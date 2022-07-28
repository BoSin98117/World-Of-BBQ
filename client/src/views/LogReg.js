import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";


const LogReg = (props) => {


    return (
        <div className='logreg'>
            <Register />
            <Login />
        </div>
    )
}


export default LogReg;