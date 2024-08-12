import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
if(localStorage.getItem('refreshJWT')){
    return <Navigate to ='/' />
}else{
    return children
}
}

export default PublicRoute