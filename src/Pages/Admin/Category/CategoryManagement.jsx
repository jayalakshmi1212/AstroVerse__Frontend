// import React, { useState, useEffect } from "react";
// import { Sidebar } from "../AdminDashboard";

// function CategoryManagement() {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");
//   const [editCategory, setEditCategory] = useState({ id: null, name: "" });

//   const fetchCategories = async () => {
//     const response = await fetch("http://127.0.0.1:8000/categories/");
//     const data = await response.json();
//     setCategories(data);
//   };

//   const addCategory = async () => {
//     const response = await fetch("http://127.0.0.1:8000/categories/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: newCategory }),
//     });
//     if (response.ok) {
//       fetchCategories();
//       setNewCategory("");
//     }
//   };

//   const updateCategory = async () => {
//     const response = await fetch(
//       `http://127.0.0.1:8000/categories/${editCategory.id}/`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: editCategory.name }),
//       }
//     );
//     if (response.ok) {
//       fetchCategories();
//       setEditCategory({ id: null, name: "" });
//     }
//   };

//   const deleteCategory = async (id) => {
//     const response = await fetch(`http://127.0.0.1:8000/categories/${id}/`, {
//       method: "DELETE",
//     });
//     if (response.ok) {
//       fetchCategories();
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="flex h-svh">
//       <Sidebar />
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Category Management</h1>

//         <div className="mb-4">
//           <input
//             type="text"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="Add a new category"
//             className="border rounded p-2 mr-2"
//           />
//           <button
//             onClick={addCategory}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {editCategory.id && (
//           <div className="mb-4">
//             <input
//               type="text"
//               value={editCategory.name}
//               onChange={(e) =>
//                 setEditCategory({ ...editCategory, name: e.target.value })
//               }
//               placeholder="Edit category name"
//               className="border rounded p-2 mr-2"
//             />
//             <button
//               onClick={updateCategory}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditCategory({ id: null, name: "" })}
//               className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         <ul>
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               className="flex justify-between items-center mb-2"
//             >
//               <span>{category.name}</span>
//               <div>
//                 <button
//                   onClick={() =>
//                     setEditCategory({ id: category.id, name: category.name })
//                   }
//                   className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteCategory(category.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default CategoryManagement;
import React, { useState, useEffect } from "react";
import { Sidebar, Header} from "../AdminDashboard";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
    isBlocked: false,
  });
  const [editCategory, setEditCategory] = useState({ id: null, name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = async () => {
    const response = await fetch("http://127.0.0.1:8000/categories/");
    const data = await response.json();
    setCategories(data);
  };

  const addCategory = async () => {
    const response = await fetch("http://127.0.0.1:8000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    if (response.ok) {
      fetchCategories();
      setNewCategory({ name: "", description: "", image: "", isBlocked: false });
      setIsModalOpen(false);
    }
  };

  const updateCategory = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/categories/${editCategory.id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCategory.name ,description:editCategory.description}),
      }
    );
    if (response.ok) {
      fetchCategories();
      setEditCategory({ id: null, name: "" });
    }
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/categories/${id}/`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
   
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Category Management</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Category
          </button>

          {editCategory.id && (
  <div className="mb-6 p-4 bg-yellow-100 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Edit Category</h2>
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={editCategory.name}
        onChange={(e) =>
          setEditCategory({ ...editCategory, name: e.target.value })
        }
        placeholder="Edit category name"
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        value={editCategory.description}
        onChange={(e) =>
          setEditCategory({ ...editCategory, description: e.target.value })
        }
        placeholder="Edit category description"
        className="p-2 border border-gray-300 rounded"
      ></textarea>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={updateCategory}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          onClick={() => setEditCategory({ id: null, name: "", description: "" })}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  
)}


          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          setEditCategory({ id: category.id, name: category.name , description:category.description})
                        }
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Add New Category
                </h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                 
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={addCategory}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;


