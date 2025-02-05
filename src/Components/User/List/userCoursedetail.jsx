import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const tutorId = course?.created_by;


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/courses/${id}/`);
        setCourse(response.data);
        console.log(response.data);
        const enrollmentResponse = await axios.get(`http://localhost:8000/enrollment-status/${id}/`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        setIsEnrolled(enrollmentResponse.data.is_enrolled);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    try {
      const amount = course.price * 100; // Convert to paise
      const response = await axios.post("http://localhost:8000/initiate-payment/", {
        amount: amount
      }, {
        timeout: 5000,
      });

      const { id: order_id, currency, amount: order_amount } = response.data;

      const options = {
        key: "rzp_test_fGwLaAdAhjOjbm",
        amount: order_amount,
        currency: currency,
        name: "Your Platform Name",
        description: "Course Payment",
        order_id: order_id,
        handler: async (response) => {
          try {
            const paymentResponse = await axios.post(
              "http://localhost:8000/confirm-payment/",
              {
                payment_id: response.razorpay_payment_id,
                course_id: course.id,
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            toast.success("Payment successful and enrollment confirmed!");
            setIsEnrolled(true);
            console.log(paymentResponse.data);
          } catch (err) {
            console.error("Error saving enrollment:", err);
            toast.error("Payment succeeded, but enrollment failed. Contact support.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleViewReviews = () => {
    navigate(`/courses/${id}/reviews`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-bold">Course not found.</p>
      </div>
    );
  }

  const handleChatWithTutor = () => {
    navigate(`/chat/${userId}/${tutorId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <div className="relative h-[300px] bg-blue-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">COURSE DETAILS</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Main Image and Course Overview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-6 mb-3">{course.title}</h2>
              <p className="text-gray-600">{course.tag_line}</p>
              <div className="mt-4">
                <span className="bg-blue-100 text-blue-800 text-sm px-4 py-1.5 rounded-full">
                  {course.category}
                </span>
              </div>
            </div>
            
            {/* Course Overview Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Course Overview</h3>
              <p className="text-gray-600 mb-4">
                This comprehensive course covers all aspects of {course.title}. 
                You'll learn from industry experts and gain practical skills 
                that you can apply immediately in your career.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>In-depth lectures and hands-on exercises</li>
                <li>Real-world projects to build your portfolio</li>
                <li>Personalized feedback on your progress</li>
                <li>Access to exclusive learning resources</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Features */}
          <div>
            <div className="bg-[#FFF9E6] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-8">FEATURES</h3>
              <div className="grid grid-cols-2 gap-8">
                <Feature title="Duration" value={course.duration} icon="⏱️" />
                <Feature title="Difficulty" value={course.difficulty} icon="📚" />
                <Feature title="Rating" value={`${course.rating} ⭐`} icon="⭐" />
                <Feature title="Price" value={`$${course.price}`} icon="💰" />
                <Feature title="Category" value={course.category} icon="📂" />
                <Feature title="Access" value="Lifetime" icon="🔑" />
              </div>
            </div>

            {/* Book Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
              <h3 className="text-2xl font-bold mb-4">ENROLL IN THIS COURSE</h3>
              {!isEnrolled ? (
                <button
                  onClick={handlePayment}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  Enroll Now for ₹{course.price}
                </button>
              ) : (
                <>
                  <Link 
                    to={`/courses/${course.id}/lessons`}
                    className="block w-full bg-green-400 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition duration-200 text-center mb-4"
                  >
                    Visit Lessons
                  </Link>
                  <div>
          <h1>{course.title}</h1>
          <div>
      <button onClick={handleChatWithTutor}>Chat with Tutor</button>
    </div>
        </div>
                </>
              )}  
            </div>

            {/* What You'll Learn Section */}
            <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-3">
                <LearningPoint text="Master the fundamentals and advanced concepts" />
                <LearningPoint text="Build real-world projects for your portfolio" />
                <LearningPoint text="Learn best practices and industry standards" />  
                <LearningPoint text="Gain practical skills for immediate application" />
              </ul>
            </div>
          </div>
        </div>

        {/* View Reviews Button */}
        {isEnrolled && (
  <div className="mt-12">
    <button
      onClick={handleViewReviews}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
    >
      View Reviews
    </button>
  </div>
)}
      </div>
    </div>
  );
};

// Feature Component
const Feature = ({ title, value, icon }) => (
  <div className="flex items-start space-x-3">
    <span className="text-2xl">{icon}</span>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

// Learning Point Component
const LearningPoint = ({ text }) => (
  <li className="flex items-center space-x-3">
    <svg className="h-6 w-6 flex-none text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-gray-600">{text}</span>
  </li>
);

export default CourseDetail;

