import { createContext } from "react"
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

    const loginSubmitHandler = async (values) => {

        try {
            const result = await authAPI.login(values.email, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);
        } catch (error) {
            console.log(error.message)
        }
    }

    const registerSubmitHandler = async (values) => {

        // TODO: error handling
        try {
            const result = await authAPI.register(values.email, values.username, values.password);

            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);

            navigate(PATH.HOME);
        } catch (error) {
            console.log(error.message)
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