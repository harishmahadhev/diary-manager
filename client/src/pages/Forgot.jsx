import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../App.css";
import { forgotSchema } from "./validation";
import * as api from "../api/Api";
import { Link } from "react-router-dom";
import { Loading, varCtx } from "../shared/shared";

export default function Forgot() {
  const [message, setMessage] = useState("");
  const { loading, setLoading } = useContext(varCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotSchema) });

  const forgotSubmit = async (formdata) => {
    setLoading(true);
    const { data } = await api.forgot(formdata);
    setMessage(data);
    setLoading(false);
  };
  return (
    <div className="login">
      <h1>Don't worry forgetting is human nature</h1>
      <form autoComplete="off" onSubmit={handleSubmit(forgotSubmit)}>
        <p>
          Please enter you email to send verification link for password reset
        </p>
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
          {errors.email && (
            <div className="loginError">{errors.email.message}</div>
          )}
        </div>
        {loading ? (
          <Loading type="bars" color="salmon" />
        ) : (
          <button type="submit" className="loginBtn">
            Submit
          </button>
        )}
        {message && <div className="loginError">{message.message}</div>}
        <div className="card helperText">
          <Link to="/signup">
            <span>Create an account? </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
