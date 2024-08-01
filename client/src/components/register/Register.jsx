import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import PATH from "../../paths/paths"

const REGISTER_FORM_KEYS = {
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm-password'
}

const Register = () => {

    const { registerSubmitHandler, error, setError } = useContext(AuthContext);

    // cleanup 
    useEffect(() => {
        
        return () => {
            setError('');
        }

    }, []);

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [REGISTER_FORM_KEYS.EMAIL]: '',
        [REGISTER_FORM_KEYS.USERNAME]: '',
        [REGISTER_FORM_KEYS.PASSWORD]: '',
        [REGISTER_FORM_KEYS.CONFIRM_PASSWORD]: '',
    });

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        // <!-- Register Page ( Only for Guest users ) -->
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        ref={inputRef}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        onChange={onChange}
                        value={values[REGISTER_FORM_KEYS.EMAIL]}
                    />

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="mimit0o0o0o"
                        onChange={onChange}
                        value={values[REGISTER_FORM_KEYS.USERNAME]}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        onChange={onChange}
                        value={values[REGISTER_FORM_KEYS.PASSWORD]}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        onChange={onChange}
                        value={values[REGISTER_FORM_KEYS.CONFIRM_PASSWORD]}
                    />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to={PATH.LOGIN}>here</Link></span>
                    </p>

                    {error && 
                        <p>
                            <span>{error}</span>
                        </p>
                    }
                </div>
            </form>
        </section>
    )
}

export default Register;