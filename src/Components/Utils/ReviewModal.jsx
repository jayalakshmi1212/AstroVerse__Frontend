import React, { useState, useEffect } from 'react'
import axios from "../../utils/axiosInstance"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MessageCircle, Star } from 'lucide-react'

const StarRating = ({ rating, onRatingChange = null }) => {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            star <= (hover || rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          } ${onRatingChange ? 'cursor-pointer' : ''}`}
          onClick={() => onRatingChange && onRatingChange(star)}
          onMouseEnter={() => onRatingChange && setHover(star)}
          onMouseLeave={() => onRatingChange && setHover(0)}
        />
      ))}
    </div>
  )
}

const CourseReviewPage = () => {
    const { courseId } = useParams()
    const [showModal, setShowModal] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [reviews, setReviews] = useState([])

    const accessToken = useSelector((state) => state.auth.accessToken)

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/courses/${courseId}/reviews/`)
            console.log("Reviews fetched:", response.data)
            setReviews(response.data.results)
        } catch (error) {
            console.error('Error fetching reviews:', error)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [courseId])

    const handleAddReview = () => setShowModal(true)

    const handleCompletionResponse = (completed) => {
        setShowModal(false)
        if (completed) {
            setShowReviewForm(true)
        } else {
            window.location.href = '/course'
        }
    }

    const handleSubmitReview = async () => {
        try {
            const response = await axios.post(
                `/courses/${courseId}/submit-review/`,
                {
                    review_text: reviewText,
                    rating: rating
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )
            setSuccessMessage(response.data.message)
            setShowReviewForm(false)
            setReviewText('')
            setRating(0)
            fetchReviews()
        } catch (error) {
            console.error('Error submitting review:', error)
            setErrorMessage(
                error.response?.data?.error || 'An error occurred while submitting the review.'
            )
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-900 to-slate-900">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-6">Stories</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        These are some testimonials from professionals who took this course
                    </p>
                    <button 
                        onClick={handleAddReview}
                        className="mt-8 bg-white text-teal-900 hover:bg-slate-100 px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Share Your Story
                    </button>
                </div>

                <div className="grid gap-8 max-w-4xl mx-auto">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div 
                            key={index}
                            className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 min-h-[150px] max-h-[200px] overflow-y-auto`}
                        >
                        
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-semibold">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold">{review.user}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-slate-600">{review.review_text}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
                            <p className="text-slate-600">No reviews yet. Be the first to review!</p>
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Did you complete the lesson?</h2>
                                <div className="flex justify-end gap-4">
                                    <button
                                        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                                        onClick={() => handleCompletionResponse(false)}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
                                        onClick={() => handleCompletionResponse(true)}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showReviewForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Rate your experience:</p>
                                    <StarRating rating={rating} onRatingChange={setRating} />
                                </div>
                                <textarea
                                    placeholder="Write your review here..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {errorMessage && (
                                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                                )}
                                {successMessage && (
                                    <p className="text-green-500 text-sm mt-2">{successMessage}</p>
                                )}
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                                        onClick={() => setShowReviewForm(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleSubmitReview}
                                        disabled={!rating || !reviewText.trim()}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseReviewPage

