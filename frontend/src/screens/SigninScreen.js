import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../slices/userSlice";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(
    (state) => state.userSignin || {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  return (
    <div className="signin-form card">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Sign In</h3>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary full-width">
              Sign in
            </button>
          </li>
          <li>Not yet registered?</li>
          <li>
            <Link to="/register">
              <button className="button secondary full-width">
                Create an account
              </button>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
