import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TutorSignupForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      subject: "",
      experience: "",
      qualification: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      subject: Yup.string().required("Subject is required"),
      experience: Yup.number()
        .min(0, "Experience must be a positive number")
        .required("Experience is required"),
      qualification: Yup.string().required("Qualification is required"),
    }),
    onSubmit: (values) => {
      console.log("Tutor Signup Details:", values);
      setFormSubmitted(true);
    },
  });

  return (
    <div className="signup-form">
      <h2>Tutor Signup</h2>
      {formSubmitted ? (
        <p>Signup Successful! Welcome, {formik.values.name}!</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="error">{formik.errors.subject}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="experience">Experience (in years)</label>
            <input
              id="experience"
              name="experience"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience}
            />
            {formik.touched.experience && formik.errors.experience ? (
              <div className="error">{formik.errors.experience}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="qualification">Qualification</label>
            <input
              id="qualification"
              name="qualification"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.qualification}
            />
            {formik.touched.qualification && formik.errors.qualification ? (
              <div className="error">{formik.errors.qualification}</div>
            ) : null}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default TutorSignupForm;
