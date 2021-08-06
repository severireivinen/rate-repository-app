import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import SignUpForm from "./SignUpForm";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must contain at least 1 character.")
    .max(30, "Username cannot contain more than 30 characters.")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must contain at least 5 characters.")
    .max(50, "Password cannot contain more than 50 characters.")
    .required("Password is required.!"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), "Passwords do not match"])
    .required("Password confirmation is required."),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
