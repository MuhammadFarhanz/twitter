import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .max(100, "Email cannot be longer than 100 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot be longer than 20 characters"),
});

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .max(100, "Email cannot be longer than 100 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot be longer than 20 characters"),
});
