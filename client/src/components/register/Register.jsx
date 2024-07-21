import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const REGISTER_FORM_KEYS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm-password'
}

const Register = () => {

    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [REGISTER_FORM_KEYS.EMAIL]: '',
        [REGISTER_FORM_KEYS.PASSWORD]: '',
        [REGISTER_FORM_KEYS.CONFIRM_PASSWORD]: '',
    });



    return (
        // <!-- Register Page ( Only for Guest users ) -->
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        onChange={onChange}
                        value={values[REGISTER_FORM_KEYS.EMAIL]}
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
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Register;