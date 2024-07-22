import { useState, createContext } from "react"
import { useNavigate } from "react-router-dom"

import * as authAPI from "../api/auth-api"
import PATH from "../paths/paths"

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(() => {
        localStorage.removeItem('accessToken');

        return {};
    });

    const loginSubmitHandler = async (values) => {
        const result = await authAPI.login(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(PATH.HOME);
    }

    const registerSubmitHandler = async (values) => {
        const result = await authAPI.register(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(PATH.HOME);
    }

    const logoutHandler = () => {
        setAuth({});

        localStorage.removeItem('accessToken');

        navigate(PATH.HOME);
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        // double negation - if truthy value cast to TRUE
        // double negation - if falsy value cast to FALSE
        isAuthenticated: !!auth.email,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;