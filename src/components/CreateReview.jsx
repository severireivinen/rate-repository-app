import React from "react";
import { Formik } from "formik";
import CreateReviewForm from "./CreateReviewForm";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Username is required."),
  repositoryName: yup.string().required("Repository name is required."),
  rating: yup
    .number()
    .min(0, "Rating cannot be less than 0.")
    .max(100, "Rating cannot be over 100.")
    .required("Rating is required."),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createReview({ ownerName, repositoryName, rating, text });
    } catch (e) {
      console.log(e);
    }
  };
  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
