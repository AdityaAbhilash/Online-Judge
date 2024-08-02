import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const ProtectedRoutes = ({children}) => {
    const token = Cookies.get('authToken');
    // const token = localStorage.getItem('token')
    return token ? children : <Navigate to ="/login" replace />
}

export default ProtectedRoutes