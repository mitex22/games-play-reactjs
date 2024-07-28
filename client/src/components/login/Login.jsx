import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";
import PATH from "../../paths/paths"

const LOGIN_FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

const Login = () => {
    const { loginSubmitHandler, loginError } = useContext(AuthContext)

    const { values, onChange, onSubmit} = useForm(loginSubmitHandler, { [LOGIN_FORM_KEYS.EMAIL]: '', [LOGIN_FORM_KEYS.PASSWORD]: '' });

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        // <!-- Login Page ( Only for Guest users ) -->
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input 
                        ref={inputRef}
                        type="email" 
                        id="email" 
                        name={LOGIN_FORM_KEYS.EMAIL} 
                        placeholder="Sokka@gmail.com" 
                        onChange={onChange}
                        value={values[LOGIN_FORM_KEYS.EMAIL]}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        name={LOGIN_FORM_KEYS.PASSWORD} 
                        onChange={onChange}
                        value={values[LOGIN_FORM_KEYS.PASSWORD]}
                    />

                    <input type="submit" className="btn submit" value="Login" />

                    <p className="field">
                        <span>If you don't have profile click <Link to={PATH.REGISTER}>here</Link></span>
                    </p>

                    {loginError && 
                        <p>
                            <span>{loginError}</span>
                        </p>
                    }
                    
                </div>
            </form>
        </section>
    )
}

export default Login;