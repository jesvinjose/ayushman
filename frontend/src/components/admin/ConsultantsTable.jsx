"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ImageHelper from "../../services/helper";
import { BaseURL } from "../../BaseUrl";

const ConsultantsTable = () => {
  const [consultants, setConsultants] = useState([]);
  const [newConsultantName, setNewConsultantName] = useState("");
  const [newConsultantQualification, setNewConsultantQualification] =
    useState("");
  const [newConsultantImage, setNewConsultantImage] = useState(null);
  const [newAvailableDays, setNewAvailableDays] = useState([]);
  const [newAvailableTiming, setNewAvailableTiming] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const itemsPerPage = 2; // Number of items per page

  const [filteredConsultants, setFilteredConsultants] = useState([]);

  const allAvailableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Handle checkbox changes
  const handleAvailableDaysChange = (day) => {
    if (newAvailableDays.includes(day)) {
      // Remove the day from the array if already selected
      setNewAvailableDays(newAvailableDays.filter((d) => d !== day));
    } else {
      // Add the day to the array if not selected
      setNewAvailableDays([...newAvailableDays, day]);
    }
  };

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/consultant/getconsultants`
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

  useEffect(() => {
    setFilteredConsultants(consultants);
  }, [consultants]); // Re-run effect when consultants

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page if consultants change
  }, [filteredConsultants]);

  const handleImageUpload = (e) => {
    // setNewConsultantImage(e.target.files[0]);
    const file = e.target.files[0];
    // Add basic validation if needed
    if (file && file.type.startsWith("image/")) {
      setNewConsultantImage(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleAddConsultant = async () => {
    setShowEditForm(false);
    if (
      newConsultantName &&
      newConsultantQualification &&
      newConsultantImage &&
      newAvailableDays &&
      newAvailableTiming
    ) {
      const formData = new FormData();
      formData.append("name", newConsultantName);
      formData.append("qualification", newConsultantQualification);
      formData.append("image", newConsultantImage);
      // Add each available day to the form data array
      newAvailableDays.forEach((day) => {
        formData.append("availableDays[]", day);
      });
      formData.append("availableTiming", newAvailableTiming);

      try {
        const response = await axios.post(
          `${BaseURL}/api/consultant/addconsultant`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedConsultant = response.data.consultant;

          setConsultants([...consultants, addedConsultant]);
          resetForm();
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
      await axios.delete(`${BaseURL}/api/consultant/deleteconsultant/${id}`);
      setConsultants(consultants.filter((consultant) => consultant._id !== id));
    } catch (error) {
      console.error("Error deleting consultant:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (consultant) => {
    setCurrentConsultant(consultant);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setNewConsultantName("");
    setNewConsultantQualification("");
    setNewConsultantImage(null);
    setNewAvailableDays([]);
    setNewAvailableTiming("");
    setShowAddForm(false);
    setShowEditForm(false);
    setCurrentConsultant(null);
  };

  const handleUpdateConsultant = async () => {
    if (currentConsultant) {
      const formData = new FormData();
      formData.append("name", newConsultantName || currentConsultant.name);
      formData.append(
        "qualification",
        newConsultantQualification || currentConsultant.qualification
      );

      // Add available days (as individual form data fields)
      newAvailableDays.forEach((day) => {
        formData.append("availableDays", day); // Removed "availableDays[]"
      });

      // Add available timing
      formData.append(
        "availableTiming",
        newAvailableTiming || currentConsultant.availableTiming
      );

      if (newConsultantImage) {
        formData.append("image", newConsultantImage);
      }

      try {
        const response = await axios.put(
          `${BaseURL}/api/consultant/updateconsultant/${currentConsultant._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedConsultant = response.data.consultant;

          // Update the consultants array with the updated consultant
          setConsultants((prevConsultants) =>
            prevConsultants.map((consultant) =>
              consultant._id === updatedConsultant._id
                ? { ...consultant, ...updatedConsultant } // Merge updated fields
                : consultant
            )
          );

          resetForm();
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
          {/* Available Days Checkboxes */}
          <div className="mb-4">
            <h4>Select Available Days:</h4>
            {allAvailableDays.map((day) => (
              <label key={day} className="block">
                <input
                  type="checkbox"
                  value={day}
                  checked={newAvailableDays.includes(day)}
                  onChange={() => handleAvailableDaysChange(day)}
                />
                {day}
              </label>
            ))}
          </div>

          <input
            type="text"
            placeholder="Available Timing"
            value={newAvailableTiming}
            onChange={(e) => setNewAvailableTiming(e.target.value)}
            className="border p-2 w-full mb-4"
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

          {/* Available Days Checkboxes */}
          <div className="mb-4">
            <h4>Select Available Days:</h4>
            {allAvailableDays.map((day, index) => (
              <label key={day} className="block">
                <input
                  type="checkbox"
                  value={day}
                  checked={
                    newAvailableDays.length > 0
                      ? newAvailableDays.includes(day) // Check if the day is selected in the edited form
                      : currentConsultant.availableDays.includes(day) // Check if the day was previously selected
                  }
                  onChange={() => handleAvailableDaysChange(day)} // Handle selection
                />
                {day}
              </label>
            ))}
          </div>

          {/* Available Timing Input */}
          <input
            type="text"
            placeholder={currentConsultant.availableTiming} // Placeholder shows original timing
            value={newAvailableTiming} // Controlled input shows new timing
            onChange={(e) => setNewAvailableTiming(e.target.value)}
            className="border p-2 w-full mb-4"
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
            <th className="border px-4 py-2 text-left">Available Days</th>
            <th className="border px-4 py-2 text-left">Available Timing</th>
            <th className="border px-4 py-2 text-center">Actions</th>
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
                {consultant.availableDays.join(", ")}
              </td>
              <td className="border px-4 py-2">{consultant.availableTiming}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex flex-col space-y-2 items-center">
                  <button
                    onClick={() => handleEdit(consultant)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(consultant._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
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
