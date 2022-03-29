import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const PrivateOutlet = () =>
{
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();

    return loggedInUser.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
}

export default PrivateOutlet