import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uploadImageToCloudinary from "../../utils/cloudinary";

const TutorSignup = () => {
  const navigate = useNavigate();

  // Formik setup with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      document_tutor: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/signup/tutor/", {
          username: values.username,
          email: values.email,
          password: values.password,
          phone_number: values.phoneNumber,
          document_tutor: values.document_tutor,
        });

        if (response.data.redirect_to) {
          navigate("/otp-verification", { state: { email: values.email } });
        }
      } catch (error) {
        formik.setErrors({
          submit: "Unable to sign up. Please try again later.",
        });
      }
    },
  });

  // Handle document upload separately
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        formik.setFieldValue("document_tutor", uploadedUrl.url);
      } catch (error) {
        formik.setErrors({
          document_tutor: "Failed to upload the document",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="text-gray-500">Create your tutor account</p>
          </div>
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Welcome illustration"
            className="w-24 h-24 rounded-full"
          />
        </div>

        {formik.errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {formik.errors.submit}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Document Upload */}
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                Upload document
              </label>
              <input
                id="document"
                name="document"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
              {formik.errors.document_tutor && (
                <p className="text-red-500 text-sm">{formik.errors.document_tutor}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default TutorSignup;
