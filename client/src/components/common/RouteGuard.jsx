import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';

import AuthContext from '../../contexts/authContext';
import PATH from '../../paths/paths';

const RouteGuard = () => {

    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default RouteGuard