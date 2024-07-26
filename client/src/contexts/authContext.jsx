import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as authAPI from "../api/auth-api"
import PATH from "../paths/paths"
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {

    const navigate = useNavigate();

    const [auth, setAuth] = usePersistedState('auth', {});
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authAPI.login(values.email, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setLoginError('');
        } catch (error) {
            setLoginError(error.message);
        }
    }

    const registerSubmitHandler = async (values) => {

        // TODO: error handling
        try {
            const result = await authAPI.register(values.email, values.username, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setRegisterError('');
        } catch (error) {
            setRegisterError(error.message);
        }
    }

    const logoutHandler = () => {

        // TODO: error handling
        // try {

        // } catch (error) {

        // }

        setAuth({});

        localStorage.removeItem('accessToken');

        navigate(PATH.HOME);

        localStorage.removeItem('auth');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        loginError,
        registerError,
        username: auth.username || auth.email,
        email: auth.email,
        // double negation - if truthy value cast to TRUE
        // double negation - if falsy value cast to FALSE
        isAuthenticated: !!auth.email,
        userId: auth._id
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;