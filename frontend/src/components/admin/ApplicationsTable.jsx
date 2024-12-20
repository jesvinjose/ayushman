"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../BaseUrl";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [newDesignation, setNewDesignation] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 2; // Number of dutydoctors per page
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/application/getapplications`
        );
        console.log(response.data, "<------------applications");
        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/job/getjobs`
        );
        // console.log(response.data, "<--------designations");
        setDesignations(response.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchApplications();
    fetchDesignations();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = applications.filter(
      (application) =>
        application.name.toLowerCase().includes(query) ||
        application.email.toLowerCase().includes(query) ||
        application.mobile.toLowerCase().includes(query) ||
        application.designation.designation.toLowerCase().includes(query)
    );
    setFilteredApplications(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleAddApplication = async () => {
    if (newName && newEmail && newMobile && newResume && newDesignation) {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("email", newEmail);
      formData.append("mobile", newMobile);
      formData.append("resume", newResume);
      formData.append("designation", newDesignation);

      try {
        const response = await axios.post(
          `${BaseURL}/api/application/addapplication`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedApplication = response.data.application;

          console.log(addedApplication, "<--------------addedApplication");

          // Find the full designation object by ID from the designations state
          const designationObj = designations.find(
            (designation) => designation._id === addedApplication.designation
          );

          console.log(designationObj, "<------designationObj");

          // Add the full designation object to the new application
          const updatedApplication = {
            ...addedApplication,
            designation: designationObj, // Include the full designation object
          };

          setApplications([...applications, updatedApplication]);
          setNewName("");
          setNewEmail("");
          setNewMobile("");
          setNewResume(null);
          setNewDesignation("");
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding application:", error);
      }
    }
  };

  const handleEdit = (application) => {
    setCurrentApplication(application);
    setShowEditForm(true);
  };

  const handleDelete = async (id) => {
    console.log("inside handleDelete");

    try {
      await axios.delete(
        `${BaseURL}/api/application/deleteApplication/${id}`
      );
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleCancel = () => {
    setCurrentApplication(null);
    setShowEditForm(false);
    setNewName("");
    setNewEmail("");
    setNewMobile("");
    setNewDesignation("");
  };

  const handleUpdateApplication = async () => {
    console.log("inside handleUpdateApplication");

    // Check if a new designation is selected before proceeding with the update
    if (newDesignation.trim() === "") {
      alert("Please select a designation before updating.");
      return; // Stop the update if no designation is selected
    }

    if (currentApplication) {
      const formData = new FormData();
      formData.append(
        "name",
        newName.trim() !== "" ? newName : currentApplication.name
      );
      formData.append(
        "email",
        newEmail.trim() !== "" ? newEmail : currentApplication.email
      );
      formData.append(
        "mobile",
        newMobile.trim() !== "" ? newMobile : currentApplication.mobile
      );
      formData.append("resume", newResume || currentApplication.resume);
      formData.append("designation", newDesignation); // Ensure the new designation is passed

      try {
        const response = await axios.put(
          `${BaseURL}/api/application/updateapplication/${currentApplication._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedApplicationFromResponse = response.data.application;

          // Find the full designation object by ID from the designations state
          const designationObj = designations.find(
            (designation) =>
              designation._id === updatedApplicationFromResponse.designation
          );

          console.log(designationObj, "<------designationObj");

          // Add the full designation object to the updated application
          const updatedApplication = {
            ...updatedApplicationFromResponse,
            designation: designationObj, // Include the full designation object
          };

          // Update the state with the modified application
          setApplications(
            applications.map((app) =>
              app._id === updatedApplication._id ? updatedApplication : app
            )
          );

          setCurrentApplication(null);
          setShowEditForm(false);
          setNewName("");
          setNewEmail("");
          setNewMobile("");
          setNewDesignation("");
        }
      } catch (error) {
        console.error("Error updating application:", error);
      }
    }
  };

  const handleDownloadResume = (resumePath) => {
    // Normalize path separators
    const normalizedPath = resumePath.replace(/\\/g, "/");

    // Define base path
    const basePath = "public/uploads/resumes/";

    // Check if the normalizedPath includes the basePath
    if (normalizedPath.includes(basePath)) {
      const trimmedPath = normalizedPath.split(basePath)[1];
      console.log("Trimmed Path:", trimmedPath);

      // Construct the URL
      const url = `${BaseURL}/api/application/download/resumes/${trimmedPath}`;
      window.open(url, "_blank");
    } else {
      console.error("resumePath does not contain the base path:", basePath);
      // Handle the case where the path is not as expected
      alert("Invalid resume path.");
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        {/* <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Application"}
        </button> */}
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search By Name, Email, Mobile or Designation"
        className="border p-2 w-full mb-4"
      />

      {/* {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Application</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.designation}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => setNewResume(e.target.files[0])}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleAddApplication}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Application
          </button>
        </div>
      )} */}

      {/* {showEditForm && currentApplication && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Application</h3>
          <input
            type="text"
            placeholder={currentApplication.name}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentApplication.email}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentApplication.mobile}
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.designation}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => setNewResume(e.target.files[0])}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdateApplication}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Application
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 ml-2"
          >
            Cancel
          </button>
        </div>
      )} */}

      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Mobile</th>
            <th className="border p-2 text-left">Designation</th>
            <th className="border p-2 text-left">Resume</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((application) => (
            <tr key={application._id}>
              <td className="border p-2">{application.name}</td>
              <td className="border p-2">{application.email}</td>
              <td className="border p-2">{application.mobile}</td>
              <td className="border p-2">
                {application.designation
                  ? application.designation.designation
                  : "No designation found"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDownloadResume(application.resumeFile)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Download Resume
                </button>
              </td>
              <td className="border p-2">
                {/* <button
                  onClick={() => handleEdit(application)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(application._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
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

export default ApplicationsTable;
