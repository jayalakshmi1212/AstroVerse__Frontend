
import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import uploadImageToCloudinary from "../../../utils/cloudinary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    tag_line: "",
    category: "",
    difficulty: "",
    price: "",
    about: "",
    thumbnail: null,
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || null; // Extract only the user ID
  console.log("User ID:", userId);  // Log only the ID

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourseData({ ...courseData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    

    

    console.log(userId)

    try {
      const uploadedImageData = await uploadImageToCloudinary(courseData.thumbnail);
      const uploadedImageUrl = uploadedImageData.secure_url;

      const response = await axios.post("http://localhost:8000/courses/add/", {
        ...courseData,
        thumbnail: uploadedImageUrl,
        created_by:userId,
        
      });

      setSuccessMessage("Course added successfully!");
      setCourseData({
        title: "",
        tag_line: "",
        category: "",
        difficulty: "",
        price: "",
        about: "",
        thumbnail: null,
      });
      navigate("/tutor/courselist")
    } catch (error) {
      setErrorMessage("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Course</h2>
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Course Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter course title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag_line">
            Tagline
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tag_line"
            type="text"
            name="tag_line"
            value={courseData.tag_line}
            onChange={handleInputChange}
            required
            placeholder="Enter course tagline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            value={courseData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="difficulty"
            name="difficulty"
            value={courseData.difficulty}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            required
            placeholder="Enter course price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
            About
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="about"
            name="about"
            value={courseData.about}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Enter course description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="thumbnail"
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;

