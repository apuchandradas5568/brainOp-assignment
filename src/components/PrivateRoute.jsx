import React from 'react'

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {



    const user = localStorage.getItem('userdata');


    if(!user){
        return <Navigate to="/sign-in" />
    }


    return children;
}

export default PrivateRoute