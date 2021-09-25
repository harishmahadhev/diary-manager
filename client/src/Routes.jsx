import React, { useEffect, useState } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import App from "./App";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import * as api from "./api/Api";
import {
  ProtectedAppRoute,
  ProtectedLoginRoute,
  varCtx,
} from "./shared/shared";
import Activate from "./pages/Activate";

export default function Routes() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [value, setValue] = useState([]);
  const [user, setUser] = useState({});
  const getEvents = async () => {
    const { data } = await api.getEvents();
    setValue(data);
  };
  const getUsers = async () => {
    const { data } = await api.getUser();
    setUser(data.profile);
  };
  useEffect(() => {
    if (Cookies.get("--t")) {
      setAuth(true);
    }
    getEvents();
    getUsers();
  }, []);

  return (
    <BrowserRouter>
      <varCtx.Provider
        value={{ user, value, setValue, loading, setLoading, setAuth, auth }}
      >
        <div className="App">
          <ProtectedLoginRoute path="/login" auth={auth} component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset/:token" component={Reset} />
          <Route path="/forgotpassword" component={Forgot} />
          <Route path="/activate/:token" component={Activate} />
          <Route exact path="/">
            <Redirect to="/app/home" />
          </Route>
          <ProtectedAppRoute path="/app" auth={auth} component={App} />
        </div>
      </varCtx.Provider>
    </BrowserRouter>
  );
}
