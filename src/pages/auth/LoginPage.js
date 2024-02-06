import { useState } from "react";
import storage from "../../utils/storage";
import { useDispatch } from "react-redux";
import { loginThunk, setToken } from "../../store/actions/sessionActions";
import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
  const dispatch = useDispatch();
  const rememberMeData = storage.get("nodePopCredentials");
  const login = useLogin();

  const [email, setEmail] = useState(
    rememberMeData ? rememberMeData.email : ""
  );
  const [password, setPassword] = useState(
    rememberMeData ? rememberMeData.password : ""
  );
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginThunk({ email, password, rememberMe }));

    const token = await login({
      email,
      password,
      rememberMe,
    });

    dispatch(setToken(token));
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
