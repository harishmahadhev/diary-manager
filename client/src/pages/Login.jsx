import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../App.css";
import { loginSchema } from "./validation";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import * as api from "../api/Api";
import { Loading, varCtx } from "../shared/shared";
import { refreshPage } from "./../shared/shared";

export default function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const { loading, setLoading } = useContext(varCtx);
  const handleChange = () => {
    setShow((on) => !on);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const login = async (formdata) => {
    try {
      const { data } = await api.login(formdata);
      Cookies.set("--t", data.token);
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
    }
  };
  const loginSubmit = async (data) => {
    setLoading(true);
    await login(data);
    setLoading(false);
    refreshPage();
  };

  return (
    <div className="login">
      <h1>Welcome to #MyMo</h1>
      <form autoComplete="off" onSubmit={handleSubmit(loginSubmit)}>
        <div className="Logininput">
          <input
            autoComplete="off"
            type="text"
            name="email"
            id=""
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email ? (
            <i className="fa fa-times" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          )}
        </div>
        <div className="Logininput password">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password ? (
            <i className="fa fa-times" aria-hidden="true"></i>
          ) : (
            <i
              onClick={handleChange}
              className={`fa fa-eye${show ? "-slash" : ""}`}
              aria-hidden="true"
            ></i>
          )}
        </div>
        {errors.password && (
          <div className="loginError">{errors.password.message}</div>
        )}
        <Link to="/forgotpassword" className="loginHelperText">
          Forgot password
        </Link>
        {loading ? (
          <Loading type="bars" color="salmon" />
        ) : (
          <button type="submit" className="loginBtn">
            Login
          </button>
        )}
        {message && <div className="loginError">{message.message}</div>}
        <div className="card helperText">
          <Link to="/signup">
            <span>Create an account</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
