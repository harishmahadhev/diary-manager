import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "../App.css";
import { resetSchema } from "./validation";
import * as api from "../api/Api";
import { Link } from "react-router-dom";
import { Loading, varCtx } from "../shared/shared";
import { useParams } from "react-router";

export default function Reset() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const { loading, setLoading } = useContext(varCtx);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const handleChange = () => {
    setShow((on) => !on);
  };

  const resetSubmit = async (formdata) => {
    try {
      formdata.token = token;
      setLoading(true);
      const { data } = await api.reset(formdata);
      setMessage(data);
      setLoading(false);
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
    }
  };
  return (
    <div className="login">
      <h1>Welcome to #MyMo</h1>
      <form autoComplete="off" onSubmit={handleSubmit(resetSubmit)}>
        <p>Please enter your new password</p>
        <div className="Logininput password">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Reset password"
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

        <div className="Logininput password">
          <input
            type={"password"}
            name="password"
            placeholder="Confirm password"
            {...register("confirmpassword")}
          />
          {errors.confirmpassword ? (
            <i className="fa fa-times" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          )}
        </div>
        {errors.confirmpassword && (
          <div className="loginError">{errors.confirmpassword.message}</div>
        )}

        {loading ? (
          <Loading type="bars" color="salmon" />
        ) : (
          <button type="submit" className="loginBtn">
            Submit
          </button>
        )}
        {message && <div className="loginError">{message.message}</div>}
        <div className="card helperText">
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
