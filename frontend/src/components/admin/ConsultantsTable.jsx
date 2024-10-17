"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ImageHelper from "../../services/helper";

const ConsultantsTable = () => {
  const [consultants, setConsultants] = useState([]);
  const [newConsultantName, setNewConsultantName] = useState("");
  const [newConsultantQualification, setNewConsultantQualification] =
    useState("");
  const [newConsultantImage, setNewConsultantImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 2; // Number of items per page

  const [filteredConsultants, setFilteredConsultants] = useState([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/consultant/getconsultants"
        );
        setConsultants(response.data);
        setFilteredConsultants(response.data);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };

    fetchConsultants();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = consultants.filter(
      (consultant) =>
        consultant.name.toLowerCase().includes(query) ||
        consultant.qualification.toLowerCase().includes(query)
    );
    setFilteredConsultants(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleImageUpload = (e) => {
    setNewConsultantImage(e.target.files[0]);
  };

  const handleAddConsultant = async () => {
    setShowEditForm(false);
    if (newConsultantName && newConsultantQualification && newConsultantImage) {
      const formData = new FormData();
      formData.append("name", newConsultantName);
      formData.append("qualification", newConsultantQualification);
      formData.append("image", newConsultantImage);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/consultant/addconsultant",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedConsultant = response.data.consultant;

          setConsultants([...consultants, addedConsultant]);
          setNewConsultantName("");
          setNewConsultantQualification("");
          setNewConsultantImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding consultant:", error);
      }
    } else {
      alert("Add the required fields: name, qualification and image");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/consultant/deleteconsultant/${id}`
      );
      setConsultants(consultants.filter((consultant) => consultant._id !== id));
    } catch (error) {
      console.error("Error deleting consultant:", error);
    }
  };

  const handleCancel = () => {
    setCurrentConsultant(null);
    setShowEditForm(false);
    setNewConsultantName("");
    setNewConsultantQualification("");
    setNewConsultantImage(null);
  };

  const handleEdit = (consultant) => {
    setCurrentConsultant(consultant);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleUpdateConsultant = async () => {
    if (currentConsultant) {
      const formData = new FormData();
      formData.append("name", newConsultantName || currentConsultant.name);
      formData.append(
        "qualification",
        newConsultantQualification || currentConsultant.qualification
      );

      if (newConsultantImage) {
        formData.append("image", newConsultantImage);
      }

      try {
        const response = await axios.put(
          `http://localhost:4000/api/consultant/updateconsultant/${currentConsultant._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedConsultant = response.data.consultant;

          setConsultants(
            consultants.map((consultant) =>
              consultant._id === updatedConsultant._id
                ? updatedConsultant
                : consultant
            )
          );

          setCurrentConsultant(null);
          setShowEditForm(false);
          setNewConsultantName("");
          setNewConsultantQualification("");
          setNewConsultantImage(null);
        }
      } catch (error) {
        console.error("Error updating consultant:", error);
      }
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredConsultants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Consultants</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Consultant"}
        </button>
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search By Name or Qualification"
        className="border p-2 w-full mb-4"
      />

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Consultant</h3>
          <input
            type="text"
            placeholder="Consultant Name"
            value={newConsultantName}
            onChange={(e) => setNewConsultantName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={newConsultantQualification}
            onChange={(e) => setNewConsultantQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleAddConsultant}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Consultant
          </button>
        </div>
      )}

      {showEditForm && currentConsultant && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Consultant</h3>
          <input
            type="text"
            placeholder={currentConsultant.name}
            value={newConsultantName}
            onChange={(e) => setNewConsultantName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentConsultant.qualification}
            value={newConsultantQualification}
            onChange={(e) => setNewConsultantQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleUpdateConsultant}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Consultant
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
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Qualification</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((consultant) => (
            <tr key={consultant._id}>
              <td className="border px-4 py-2">
                <ImageHelper size="200px" image={consultant.image} />
              </td>
              <td className="border px-4 py-2">{consultant.name}</td>
              <td className="border px-4 py-2">{consultant.qualification}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(consultant)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(consultant._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
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

export default ConsultantsTable;
