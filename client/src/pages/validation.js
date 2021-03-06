import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email required")
        .email("Invalid Email"),
    password: yup
        .string()
        .min(8, "Must contain atleast 8 characters")
        .required("Password required"),
})

export const signupSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email required")
        .email("Invalid Email"),
    password: yup
        .string()
        .min(8, "Must contain atleast 8 characters")
        .required("Password required"),
    name: yup.string().required("Name required"),
})
export const forgotSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email required")
        .email("Invalid Email"),
})
export const resetSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, "Must contain atleast 8 characters")
        .required("Enter Password"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password doesn't match")
        .required("Password required"),
})