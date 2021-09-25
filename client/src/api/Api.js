import axios from "axios";
import Cookies from "js-cookie";

// const API = axios.create({ baseURL: "http://localhost:5000" })

axios.interceptors.request.use((req) => {
    if (Cookies.get("--t")) {
        req.headers.Authorization = `Bearer ${Cookies.get('--t')}`;
    }
    return req;
})

export const login = (formdata) => axios.post("/login/signin", formdata)
export const signup = (formdata) => axios.post("/login/signup", formdata)
export const activate = (formdata) => axios.post("/login/verify", formdata)
export const forgot = (formdata) => axios.post("/login/forgot", formdata)
export const reset = (formdata) => axios.post("/login/reset", formdata)
export const create = (formdata) => axios.post("/event/", formdata)
export const deleteEvent = (formdata) => axios.patch("/event/", formdata)
export const getEvents = () => axios.get("/event/")
export const getUser = () => axios.get("/user/profile")
