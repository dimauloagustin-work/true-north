import { SyntheticEvent, useContext, useState } from "react";
import { login } from "../../client/wrapper/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext)!;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await login(email, pass);
      userContext.login();
      navigate("/sign-up");
    } catch (err) {
      if (err instanceof Error) setErrorMessages(err.message);
    }
  };

  return (
    <form action="" onSubmit={submit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      {errorMessages && <div className="error">{errorMessages}</div>}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
