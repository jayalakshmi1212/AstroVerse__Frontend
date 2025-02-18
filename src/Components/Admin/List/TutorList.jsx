import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Sidebar } from '../../../Pages/Admin/AdminDashboard';

export default function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedTutorId, setSelectedTutorId] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/tutors/', {
          headers: {
            Authorization: 'Token 7dc953883b5c85e048b32601446d367cb758989b', // Replace with actual token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTutors(data.tutors);
        console.log("Fetched tutors:", data.tutors);
      } catch (error) {
        setError('Failed to fetch tutors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleApproveDocument = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tutors/${selectedTutorId}/approve/`, {
        method: 'POST',
        headers: {
          Authorization: 'Token your-auth-token',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === selectedTutorId ? { ...tutor, status: 'approved' } : tutor
        )
      );
      closeModal();
    } catch (error) {
      alert('Failed to approve document. Please try again.');
    }
  };

  const handleRejectDocument = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tutors/${selectedTutorId}/reject/`, {
        method: 'POST',
        headers: {
          Authorization: 'Token your-auth-token',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === selectedTutorId ? { ...tutor, status: 'rejected' } : tutor
      
        )
        
      );
      closeModal();
    } catch (error) {
      alert('Failed to reject document. Please try again.');
    }
  };

  const openModal = (document_tutor, tutorId) => {
    console.log("Opening modal for document:",tutorId,document_tutor);
    setSelectedDocument(document_tutor);
    setSelectedTutorId(tutorId);
  };
  
  const closeModal = () => {
    setSelectedDocument(null);
    setSelectedTutorId(null);
  };

  const filteredTutors = tutors.filter((tutor) =>
    tutor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTutors.length / pageSize);
  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p className="text-center text-xl font-semibold mt-8">Loading...</p>;
  if (error) return <p className="text-center text-xl font-semibold text-red-500 mt-8">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Tutor List</h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search tutors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTutors.map((tutor) => (
                <tr key={tutor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{tutor.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tutor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openModal(tutor.document_tutor, tutor.id)}
                      
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Document
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tutor.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : tutor.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {tutor.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {selectedDocument && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Document Details</h2>
              {selectedDocument && (
              <iframe
                src={selectedDocument}
                className="w-full h-96 border"
                title="Document Viewer"
              />
            )}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleApproveDocument}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Approve
                </button>
                <button
                  onClick={handleRejectDocument}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Reject
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

