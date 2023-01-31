import React, { useEffect, useState } from 'react';
import NavComponent from './navComponent';

function ShowInfo() {
    const userData = JSON.parse(localStorage.getItem("userOnline"));

    let moment = require('moment');
    
    useEffect(() => {
        
    }, [])




    return (
        <>
            <NavComponent />
            <div>
                <h1>Admin</h1>
                <p>add movie form:</p>
                <hr />
                <p>remove movie form:</p>
                <hr />
            </div>
        </>
    );
}

export default ShowInfo;