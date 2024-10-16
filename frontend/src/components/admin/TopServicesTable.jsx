"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const TopServicesTable = () => {
  const [treatments, setTreatments] = useState([]);
  const [topservices, setTopServices] = useState([]);
  const [service, setService] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/treatment/gettreatments"
        );
        setTreatments(response.data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/topservice/getalltopservices"
        );
        console.log(response.data); // Check the structure of the data
        setTopServices(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching topservices:", error);
      }
    };

    fetchTopServices();
  }, []);

  const handleAddtoTopService = async () => {
    if (service) {
      // Create a JSON object for the data
      const topServiceData = {
        service: service,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/topservice/addtotopservices",
          topServiceData, // Send the JSON object instead of FormData
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201) {
          const addedTopService = response.data.topservice;

          // Update state with the newly added consultant
          setTopServices([...topservices, addedTopService]);
          setService("");
          setShowAddForm(false);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // If the error has a response from the server (like a time slot being fully booked)
          alert(error.response.data.message);
        } else {
          // If it's some other error
          alert("An error occurred. Please try again.");
        }
        console.error("Error adding topservice:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/topservice/deletetopservice/${id}`
      );
      setTopServices(topservices.filter((topservice) => topservice._id !== id));
    } catch (error) {
      console.error("Error deleting topservice:", error);
    }
  };

  const handleCancel = () => {
    setService("");
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Top Services</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Top Service
        </button>
      </div>
    
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow max-w-md mx-auto md:max-w-xl lg:max-w-2xl">
          <h3 className="text-lg font-medium mb-4">Add New Top Service</h3>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full md:w-3/4 border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Treatment</option>
              {treatments.map((treatment) => (
                <option key={treatment._id} value={treatment._id}>
                  {treatment.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handleAddtoTopService}
              className="bg-green-600 text-white w-full md:w-1/2 px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Topservice
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white w-full md:w-1/2 px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Treatment Name</th>
            <th className="border px-4 py-2 text-left">Treatment Id</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {topservices.map((topservice) => (
            <tr key={topservice._id}>
              <td className="border px-4 py-2">{topservice.name}</td>
              <td className="border px-4 py-2">{topservice.service}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(topservice._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopServicesTable;
