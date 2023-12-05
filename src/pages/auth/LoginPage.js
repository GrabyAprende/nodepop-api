import { useState } from "react";
import { login } from "./service";
import storage from '../../utils/storage';

function LoginPage({ onLogin }) {
    const rememberMeData = storage.get('nodePopCredentials');

    const [email, setEmail] = useState(rememberMeData ? rememberMeData.email : '');
    const [password, setPassword] = useState(rememberMeData ? rememberMeData.password : '');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await login({
            email,
            password,
            rememberMe,
        });

        onLogin();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRememberChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const disabled = !(email && password);

    return (
        <section className="container">
            <article>
                <h1>Login to Nodepop</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    <fieldset>
                        <label htmlFor="remember">
                            <input
                                type="checkbox"
                                role="switch"
                                id="remember"
                                name="remember"
                                onChange={handleRememberChange}
                            />
                            Remember me
                        </label>
                    </fieldset>
                    <button type="submit" disabled={disabled}>
                        Log in
                    </button>
                </form>
            </article>
        </section>
    );
}

export default LoginPage;
