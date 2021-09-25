import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../App.css";
import { signupSchema } from "./validation";
import * as api from "../api/Api";
import { Link } from "react-router-dom";
import { Loading, varCtx } from "../shared/shared";

export default function Signup() {
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
  } = useForm({ resolver: yupResolver(signupSchema) });

  const signup = async (formdata) => {
    try {
      const { data } = await api.signup(formdata);
      setMessage(data);
      console.log(data);
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
    }
  };

  const loginSubmit = async (data) => {
    setLoading(true);
    await signup(data);
    setLoading(false);
  };
  return (
    <div className="login">
      <h1>Welcome to #MyMo</h1>
      <form autoComplete="off" onSubmit={handleSubmit(loginSubmit)}>
        <div className="Logininput">
          <input
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <div className="loginError">{errors.name.message}</div>
          )}
        </div>
        <div className="Logininput">
          <input
            autoComplete="off"
            type="text"
            name="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email ? (
            <i className="fa fa-times" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          )}
          {errors.email && (
            <div className="loginError">{errors.email.message}</div>
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
          {errors.password && (
            <div className="loginError">{errors.password.message}</div>
          )}
        </div>
        {loading ? (
          <Loading type="bars" color="salmon" />
        ) : (
          <button type="submit" className="loginBtn">
            Signup
          </button>
        )}
        {message && <div className="loginError">{message.message}</div>}
        <div className="card helperText">
          <Link to="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
