import React, { useState, useEffect } from 'react';
import axios from "../../../utils/axiosInstance";
import { useSelector } from 'react-redux';
import { Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react';

const TutorReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const reviewsPerPage = 5;
    const [ratingDistribution, setRatingDistribution] = useState({
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    });
    const accessToken = useSelector((state) => state.auth.accessToken);

    const fetchTutorReviews = async (page) => {
        try {
            const response = await axios.get(`/tutor/reviews/?page=${page}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log("Tutor Reviews fetched:", response.data);
            setReviews(response.data.results);
            setTotalPages(Math.ceil(response.data.count / reviewsPerPage));
            
            // Calculate average rating and distribution
            const total = response.data.results.reduce((acc, review) => acc + review.rating, 0);
            const avg = total / response.data.results.length;
            setAverageRating(avg);

            // Calculate rating distribution
            const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            response.data.results.forEach(review => {
                distribution[review.rating]++;
            });
            setRatingDistribution(distribution);

        } catch (error) {
            console.error('Error fetching tutor reviews:', error);
            setError('Failed to load reviews.');
        }
    };

    useEffect(() => {
        fetchTutorReviews(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column - Rating Statistics */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Rating</h2>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-gray-900">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < Math.floor(averageRating)
                                                        ? 'fill-current'
                                                        : 'stroke-current fill-none'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {reviews.length} Total Reviews
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-2">
                                        <span className="w-3">{rating}</span>
                                        <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full"
                                                style={{
                                                    width: `${(ratingDistribution[rating] / reviews.length) * 100}%`
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-500 w-12">
                                            {Math.round((ratingDistribution[rating] / reviews.length) * 100)}%
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Write your Review
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Share your feedback and help create a better learning experience for everyone.
                                </p>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Customer Feedback */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Feedback</h2>
                            <div className="space-y-6">
                                {error && (
                                    <p className="text-red-500 text-center py-4">{error}</p>
                                )}
                                
                                {reviews.length > 0 ? (
                                    <>
                                        {reviews.map((review, index) => (
                                            <div
                                                key={index}
                                                className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                                        {review.user.charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900">
                                                                    {review.user}
                                                                </h3>
                                                                <p className="text-sm font-bold text-gray-700">
                                                                    {review.course_name}
                                                                </p>
                                                            </div>
                                                            <div className="flex text-yellow-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i < review.rating
                                                                                ? 'fill-current'
                                                                                : 'stroke-current fill-none'
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-gray-600">
                                                            {review.review_text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Pagination Controls */}
                                        <div className="flex items-center justify-center gap-2 pt-6">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index + 1}
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={`w-8 h-8 rounded-lg ${
                                                        currentPage === index + 1
                                                            ? 'bg-orange-500 text-white'
                                                            : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center text-gray-500 py-8">
                                        No reviews available for your courses.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorReviewsPage;

