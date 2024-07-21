import { useContext, useEffect } from "react";
import * as authAPI from "../../api/auth-api";
import { useNavigate } from "react-router-dom";
import PATH from "../../paths/paths";
import AuthContext from "../../contexts/authContext";

const Logout = () => {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authAPI.logout()
            .then(() => logoutHandler())
            .catch(() => navigate(PATH.HOME));
    }, [])

    return null;
}

export default Logout;