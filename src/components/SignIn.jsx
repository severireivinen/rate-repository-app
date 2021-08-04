import { Formik } from "formik";
import React from "react";
import SignInForm from "./SignInForm";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must contain at least 3 characters.")
    .required("Username is required."),
  password: yup
    .string()
    .min(5, "Password must contain at least 5 characters.")
    .required("Password is required."),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log("Username: ", values.username, " Password: ", values.password);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
