"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ImageHelper from "../../services/helper";

const TreatmentTable = () => {
  const [treatments, setTreatments] = useState([]);
  const [newTreatmentName, setNewTreatmentName] = useState("");
  const [newTreatmentDescription, setNewTreatmentDescription] = useState("");
  const [newTreatmentBigDescription, setNewTreatmentBigDescription] =
    useState("");
  const [newTreatmentImage, setNewTreatmentImage] = useState(null);
  const [newTreatmentBigImage, setNewTreatmentBigImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentTreatment, setCurrentTreatment] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 2; // Number of items per page

  const [filteredTreatments, setFilteredTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/treatment/gettreatments"
        );
        setTreatments(response.data);
        setFilteredTreatments(response.data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = treatments.filter(
      (treatment) =>
        treatment.name.toLowerCase().includes(query) ||
        treatment.description.toLowerCase().includes(query)
    );
    setFilteredTreatments(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleImageUpload = (e) => {
    setNewTreatmentImage(e.target.files[0]);
  };

  const handleBigImageUpload = (e) => {
    setNewTreatmentBigImage(e.target.files[0]);
  };

  const handleAddTreatment = async () => {
    // setShowEditForm(false);
    if (
      newTreatmentName &&
      newTreatmentDescription &&
      newTreatmentBigDescription &&
      newTreatmentImage &&
      newTreatmentBigImage
    ) {
      const formData = new FormData();
      formData.append("name", newTreatmentName);
      formData.append("description", newTreatmentDescription);
      formData.append("image", newTreatmentImage);
      formData.append("bigImage", newTreatmentBigImage);
      formData.append("bigDescription", newTreatmentBigDescription);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/treatment/addtreatment",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedTreatment = response.data.treatment;

          setTreatments([...treatments, addedTreatment]);
          setNewTreatmentName("");
          setNewTreatmentDescription("");
          setNewTreatmentBigDescription("");
          setNewTreatmentImage(null);
          setNewTreatmentBigImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding treatment:", error);
      }
    } else {
      alert("Add the required fields: name, description and image");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/treatment/deletetreatment/${id}`
      );
      setTreatments(treatments.filter((treatment) => treatment._id !== id));
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  const handleCancel = () => {
    setCurrentTreatment(null);
    setShowEditForm(false);
    setNewTreatmentName("");
    setNewTreatmentDescription("");
    setNewTreatmentImage(null);
    setNewTreatmentBigImage(null);
  };

  const handleEdit = (treatment) => {
    setCurrentTreatment(treatment); // Set the current treatment to be edited
    setNewTreatmentName(treatment.name); // Initialize with the current name
    setNewTreatmentDescription(treatment.description); // Initialize with the current description
    setNewTreatmentBigDescription(treatment.bigDescription); // Initialize with the current bigDescription
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateTreatment = async () => {
    try {
      if (currentTreatment) {
        const formData = new FormData();
        formData.append("name", newTreatmentName);
        formData.append("description", newTreatmentDescription);
        formData.append("bigDescription", newTreatmentBigDescription);
        if (newTreatmentImage) {
          formData.append("image", newTreatmentImage);
        }
        if (newTreatmentBigImage) {
          formData.append("bigImage", newTreatmentBigImage);
        }
        const response = await axios.put(
          `http://localhost:4000/api/treatment/updatetreatment/${currentTreatment._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          const updatedTreatment = response.data.treatment;

          setTreatments(
            treatments.map((treatment) =>
              treatment._id === updatedTreatment._id
                ? updatedTreatment
                : treatment
            )
          );

          setCurrentTreatment(null); // Clear the current consultant state
          setShowEditForm(false); // Hide the edit form
          setNewTreatmentName("");
          setNewTreatmentDescription("");
          setNewTreatmentBigDescription("");
          setNewTreatmentImage(null);
          setNewTreatmentBigImage(null);
        }
      }
    } catch (error) {
      console.error("Error updating treatment:", error);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTreatments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Treatments</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Treatment"}
        </button>
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search By Treatment Name or Description"
        className="border p-2 w-full mb-4"
      />

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Treatment</h3>
          <input
            type="text"
            placeholder="Treatment Name"
            value={newTreatmentName}
            onChange={(e) => setNewTreatmentName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <ReactQuill
            value={newTreatmentDescription}
            onChange={setNewTreatmentDescription}
            className="mb-4"
            placeholder="Enter treatment description..."
          />
          <ReactQuill
            value={newTreatmentBigDescription}
            onChange={setNewTreatmentBigDescription}
            className="mb-4"
            placeholder="Enter bigTreatment description..."
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <label className="block mb-2">Upload Big Image:</label>
          <input
            type="file"
            onChange={handleBigImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleAddTreatment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Treatment
          </button>
        </div>
      )}

      {showEditForm && currentTreatment && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Treatment</h3>
          <input
            type="text"
            placeholder={currentTreatment.name}
            value={newTreatmentName}
            onChange={(e) => setNewTreatmentName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <ReactQuill
            value={newTreatmentDescription}
            placeholder={currentTreatment.description}
            onChange={setNewTreatmentDescription} // Directly use the state setter function
            className="border p-2 w-full mb-4"
          />
          <ReactQuill
            value={newTreatmentBigDescription}
            placeholder={currentTreatment.bigDescription}
            onChange={setNewTreatmentBigDescription} // Directly use the state setter function
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <label className="block mb-2">Upload Big Image:</label>
          <input
            type="file"
            onChange={handleBigImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleUpdateTreatment}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Treatment
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 my-2 sm:my-0 sm:ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Treatment Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((treatment) => (
            <tr key={treatment._id}>
              <td className="border px-4 py-2">
                <ImageHelper size="200px" image={treatment.image} />
              </td>
              <td className="border px-4 py-2">{treatment.name}</td>
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{ __html: treatment.description }}
              />
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(treatment)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(treatment._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TreatmentTable;

// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles
// import ImageHelper from "../../services/helper";

// const TreatmentTable = () => {
//   const [treatments, setTreatments] = useState([]);
//   const [newTreatmentName, setNewTreatmentName] = useState("");
//   const [newTreatmentDescription, setNewTreatmentDescription] = useState("");
//   const [newTreatmentBigDescription, setNewTreatmentBigDescription] =
//     useState("");
//   const [newTreatmentImage, setNewTreatmentImage] = useState(null);
//   const [newTreatmentBigImage, setNewTreatmentBigImage] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [currentTreatment, setCurrentTreatment] = useState(null);

//   // Search term
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Set items per page

//   useEffect(() => {
//     const fetchTreatments = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/treatment/gettreatments"
//         );
//         setTreatments(response.data);
//       } catch (error) {
//         console.error("Error fetching treatments:", error);
//       }
//     };

//     fetchTreatments();
//   }, []);

//   const handleImageUpload = (e) => {
//     setNewTreatmentImage(e.target.files[0]);
//   };

//   const handleBigImageUpload = (e) => {
//     setNewTreatmentBigImage(e.target.files[0]);
//   };

//   const handleAddTreatment = async () => {
//     if (
//       newTreatmentName &&
//       newTreatmentDescription &&
//       newTreatmentBigDescription &&
//       newTreatmentImage &&
//       newTreatmentBigImage
//     ) {
//       const formData = new FormData();
//       formData.append("name", newTreatmentName);
//       formData.append("description", newTreatmentDescription);
//       formData.append("image", newTreatmentImage);
//       formData.append("bigImage", newTreatmentBigImage);
//       formData.append("bigDescription", newTreatmentBigDescription);

//       try {
//         const response = await axios.post(
//           "http://localhost:4000/api/treatment/addtreatment",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (response.status === 201) {
//           const addedTreatment = response.data.treatment;

//           setTreatments([...treatments, addedTreatment]);
//           setNewTreatmentName("");
//           setNewTreatmentDescription("");
//           setNewTreatmentBigDescription("");
//           setNewTreatmentImage(null);
//           setNewTreatmentBigImage(null);
//           setShowAddForm(false);
//         }
//       } catch (error) {
//         console.error("Error adding treatment:", error);
//       }
//     } else {
//       alert("Add the required fields: name, description and image");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:4000/api/treatment/deletetreatment/${id}`
//       );
//       setTreatments(treatments.filter((treatment) => treatment._id !== id));
//     } catch (error) {
//       console.error("Error deleting treatment:", error);
//     }
//   };

//   const handleCancel = () => {
//     setCurrentTreatment(null);
//     setShowEditForm(false);
//     setNewTreatmentName("");
//     setNewTreatmentDescription("");
//     setNewTreatmentImage(null);
//     setNewTreatmentBigImage(null);
//   };

//   const handleEdit = (treatment) => {
//     setCurrentTreatment(treatment);
//     setNewTreatmentName(treatment.name);
//     setNewTreatmentDescription(treatment.description);
//     setNewTreatmentBigDescription(treatment.bigDescription);
//     setShowEditForm(true);
//     setShowAddForm(false);
//   };

//   const handleUpdateTreatment = async () => {
//     try {
//       if (currentTreatment) {
//         const formData = new FormData();
//         formData.append("name", newTreatmentName);
//         formData.append("description", newTreatmentDescription);
//         formData.append("bigDescription", newTreatmentBigDescription);
//         if (newTreatmentImage) {
//           formData.append("image", newTreatmentImage);
//         }
//         if (newTreatmentBigImage) {
//           formData.append("bigImage", newTreatmentBigImage);
//         }
//         const response = await axios.put(
//           `http://localhost:4000/api/treatment/updatetreatment/${currentTreatment._id}`,
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         if (response.status === 200) {
//           const updatedTreatment = response.data.treatment;

//           setTreatments(
//             treatments.map((treatment) =>
//               treatment._id === updatedTreatment._id
//                 ? updatedTreatment
//                 : treatment
//             )
//           );

//           setCurrentTreatment(null);
//           setShowEditForm(false);
//           setNewTreatmentName("");
//           setNewTreatmentDescription("");
//           setNewTreatmentBigDescription("");
//           setNewTreatmentImage(null);
//           setNewTreatmentBigImage(null);
//         }
//       }
//     } catch (error) {
//       console.error("Error updating treatment:", error);
//     }
//   };

//   // Filter treatments based on search term
//   const filteredTreatments = treatments.filter((treatment) =>
//     treatment.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTreatments = filteredTreatments.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Treatments</h2>
//         <div className="flex items-center">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border p-2 rounded-md mr-4"
//           />
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//           >
//             {showAddForm ? "Cancel" : "Add Treatment"}
//           </button>
//         </div>
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 border rounded-md bg-white shadow">
//           <h3 className="text-lg font-medium mb-2">Add New Treatment</h3>
//           <input
//             type="text"
//             placeholder="Treatment Name"
//             value={newTreatmentName}
//             onChange={(e) => setNewTreatmentName(e.target.value)}
//             className="border p-2 w-full mb-4"
//           />
//           <ReactQuill
//             value={newTreatmentDescription}
//             onChange={setNewTreatmentDescription}
//             className="mb-4"
//             placeholder="Enter treatment description..."
//           />
//           <ReactQuill
//             value={newTreatmentBigDescription}
//             onChange={setNewTreatmentBigDescription}
//             className="mb-4"
//             placeholder="Enter bigTreatment description..."
//           />
//           <input
//             type="file"
//             onChange={handleImageUpload}
//             className="border p-2 w-full mb-4"
//             accept="image/*"
//           />
//           <label className="block mb-2">Upload Big Image:</label>
//           <input
//             type="file"
//             onChange={handleBigImageUpload}
//             className="border p-2 w-full mb-4"
//             accept="image/*"
//           />
//           <button
//             onClick={handleAddTreatment}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             Save Treatment
//           </button>
//         </div>
//       )}

//       {showEditForm && currentTreatment && (
//         <div className="mb-6 p-4 border rounded-md bg-white shadow">
//           <h3 className="text-lg font-medium mb-2">Edit Treatment</h3>
//           <input
//             type="text"
//             placeholder={currentTreatment.name}
//             value={newTreatmentName}
//             onChange={(e) => setNewTreatmentName(e.target.value)}
//             className="border p-2 w-full mb-4"
//           />
//           <ReactQuill
//             value={newTreatmentDescription}
//             placeholder={currentTreatment.description}
//             onChange={setNewTreatmentDescription}
//             className="border p-2 w-full mb-4"
//           />
//           <ReactQuill
//             value={newTreatmentBigDescription}
//             placeholder={currentTreatment.bigDescription}
//             onChange={setNewTreatmentBigDescription}
//             className="border p-2 w-full mb-4"
//           />
//           <label className="block mb-2">Update Image:</label>
//           <input
//             type="file"
//             onChange={handleImageUpload}
//             className="border p-2 w-full mb-4"
//             accept="image/*"
//           />
//           <label className="block mb-2">Upload Big Image:</label>
//           <input
//             type="file"
//             onChange={handleBigImageUpload}
//             className="border p-2 w-full mb-4"
//             accept="image/*"
//           />
//           <button
//             onClick={handleUpdateTreatment}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             Update Treatment
//           </button>
//           <button
//             onClick={handleCancel}
//             className="bg-red-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-700"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Image</th>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Description</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentTreatments.map((treatment) => (
//             <tr key={treatment._id}>
//               <td className="border px-4 py-2">
//                 {/* <img
//                   src={`http://localhost:4000/${treatment.image}`}
//                   alt={treatment.name}
//                   className="w-16 h-16 object-cover"
//                 /> */}

//               <ImageHelper size="200px" image={treatment.image} />
//               </td>
//               <td className="border px-4 py-2">{treatment.name}</td>
//               <td className="border px-4 py-2">
//                 <div
//                   dangerouslySetInnerHTML={{ __html: treatment.description }}
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => handleEdit(treatment)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(treatment._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         {Array.from({
//           length: Math.ceil(filteredTreatments.length / itemsPerPage),
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => paginate(index + 1)}
//             className={`px-4 py-2 mx-1 border rounded-md ${
//               currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TreatmentTable;
