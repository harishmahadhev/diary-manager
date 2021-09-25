import React, { useContext, useState } from "react";
import "../App.css";
import * as api from "../api/Api";
import { Loading, varCtx } from "../shared/shared";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export default function Activate() {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const { loading, setLoading } = useContext(varCtx);

  const activate = async (token) => {
    try {
      setLoading(true);
      const { data } = await api.activate({ token });
      console.log(data);
      setMessage(data);
      setLoading(false);
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
      setLoading(false);
    }
  };
  return (
    <div className="Activate">
      <h1>Welcome to #MyMo</h1>
      <p>Please verify your account</p>
      {loading ? (
        <Loading type="bars" color="salmon" />
      ) : (
        <button
          type="submit"
          className="loginBtn"
          onClick={() => activate(token)}
        >
          Verify
        </button>
      )}
      {message && <div className="loginError">{message.message}</div>}
      <div className="card helperText">
        <Link to="/login">
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
