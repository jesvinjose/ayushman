"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ImageHelper from "../../services/helper";

const TestimonialsTable = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");
  const [testimonialImage, setTestimonialImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 2; // Number of testimonials per page

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/testimonial/gettestimonials"
        );
        setTestimonials(response.data);
        setFilteredTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(query) ||
        testimonial.designation.toLowerCase().includes(query) ||
        testimonial.message.toLowerCase().includes(query)
    );
    setFilteredTestimonials(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleImageUpload = (e) => {
    setTestimonialImage(e.target.files[0]);
  };

  const handleAddTestimonial = async () => {
    if (name && designation && message && testimonialImage && videoUrl) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("image", testimonialImage);
      formData.append("message", message);
      formData.append("videoUrl", videoUrl);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/testimonial/addtestimonial",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedTestimonial = response.data.testimonial;

          setTestimonials([...testimonials, addedTestimonial]);
          setFilteredTestimonials([...filteredTestimonials, addedTestimonial]);
          setName("");
          setDesignation("");
          setTestimonialImage(null);
          setMessage("");
          setVideoUrl("");
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding testimonial:", error);
      }
    } else {
      alert(
        "Add the required fields: name, designation, message, videoUrl and image"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/testimonial/deletetestimonial/${id}`
      );
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== id)
      );
      setFilteredTestimonials(
        filteredTestimonials.filter((testimonial) => testimonial._id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleCancel = () => {
    if (name || designation || message || videoUrl || testimonialImage) {
      setName("");
      setDesignation("");
      setMessage("");
      setVideoUrl("");
      setTestimonialImage(null);
    } else {
      alert("Fill in the fields");
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTestimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm); // Toggle the Add form
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Close" : "Add Testimonial"}
        </button>
      </div>

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Testimonials"
        className="border p-2 w-full mb-4"
      />

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Testimonial</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <input
            type="text"
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="videourl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 m-5"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTestimonial}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 m-5"
          >
            Save Testimonial
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Designation</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Video URL</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((testimonial) => (
            <tr key={testimonial._id}>
              <td className="border px-4 py-2">
                <ImageHelper size="200px" image={testimonial.image} />
              </td>
              <td className="border px-4 py-2">{testimonial.name}</td>
              <td className="border px-4 py-2">{testimonial.designation}</td>
              <td className="border px-4 py-2">{testimonial.message}</td>
              <td className="border px-4 py-2">{testimonial.videoUrl}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(testimonial._id)}
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

export default TestimonialsTable;
