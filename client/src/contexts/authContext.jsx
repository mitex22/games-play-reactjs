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

    const [error, setError] = useState('');

    const loginSubmitHandler = async (values) => {

        try {
            const result = await authAPI.login(values.email, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    const registerSubmitHandler = async (values) => {

        if (values.password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }

        if (values.password !== values['confirm-password']) {
            setError('Password and Confirm Password must match!');
            return;
        }

        try {
            const result = await authAPI.register(values.email, values.username, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);

            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    const logoutHandler = () => {

        setAuth({});

        localStorage.removeItem('accessToken');

        navigate(PATH.HOME);

        localStorage.removeItem('auth');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        error,
        setError,
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