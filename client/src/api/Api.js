import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (Cookies.get("--t")) {
        req.headers.Authorization = `Bearer ${Cookies.get('--t')}`;
    }
    return req;
})

export const login = (formdata) => API.post("/login/signin", formdata)
export const signup = (formdata) => API.post("/login/signup", formdata)
export const activate = (formdata) => API.post("/login/verify", formdata)
export const forgot = (formdata) => API.post("/login/forgot", formdata)
export const reset = (formdata) => API.post("/login/reset", formdata)
export const create = (formdata) => API.post("/event/", formdata)
export const deleteEvent = (formdata) => API.patch("/event/", formdata)
export const getEvents = () => API.get("/event/")
export const getUser = () => API.get("/user/profile")
