"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { BaseURL } from "../../BaseUrl";

const ContactMessagesTable = () => {
  const [contactmessages, setContactMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 2; // Number of messages per page
  const [filteredMessages, setFilteredMessages] = useState([]); // Ensure this is updated correctly

  // Fetch contact messages
  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/contactmessage/getcontactmessages`
        );
        console.log(response.data); // Check the structure of the data
        setContactMessages(response.data); // Set full list of messages
        setFilteredMessages(response.data); // Set filtered messages to all initially
      } catch (error) {
        console.error("Error fetching contactmessages:", error);
      }
    };

    fetchContactMessages();
  }, []);

  // Handle search and filter messages
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contactmessages.filter((contactmessage) => {
      return (
        contactmessage.firstName.toLowerCase().includes(query) ||
        contactmessage.lastName.toLowerCase().includes(query) ||
        contactmessage.email.toLowerCase().includes(query) ||
        contactmessage.mobile.toLowerCase().includes(query) ||
        contactmessage.message.toLowerCase().includes(query)
      );
    });
    setFilteredMessages(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleAddContactMessage = async () => {
  //   if (newMessage && newFirstName && newLastName && newEmail && newMobile) {
  //     const contactMessageData = {
  //       firstName: newFirstName,
  //       lastName: newLastName,
  //       mobile: newMobile,
  //       email: newEmail,
  //       message: newMessage,
  //     };

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:4000/api/contactmessage/addcontactmessage",
  //         contactMessageData,
  //         {
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );

  //       if (response.status === 201) {
  //         const addedContactMessage = response.data.contactmessage;
  //         setContactMessages([...contactmessages, addedContactMessage]);
  //         setFilteredMessages([...contactmessages, addedContactMessage]); // Update filteredMessages as well
  //         setNewMessage("");
  //         setNewFirstName("");
  //         setNewLastName("");
  //         setNewMobile("");
  //         setNewEmail("");
  //         setShowAddForm(false);
  //       }
  //     } catch (error) {
  //       console.error("Error adding contactmessage:", error);
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${BaseURL}/api/contactmessage/deletecontactmessage/${id}`
      );
      const updatedMessages = contactmessages.filter(
        (contactmessage) => contactmessage._id !== id
      );
      setContactMessages(updatedMessages);
      setFilteredMessages(updatedMessages); // Ensure filteredMessages are also updated
    } catch (error) {
      console.error("Error deleting contactmessage:", error);
    }
  };

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Message"}
        </button>
      </div> */}

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Messages"
        className="border p-2 w-full mb-4"
      />

      {/* {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Message</h3>
          <input
            type="text"
            placeholder="First Name"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
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
          <input
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <button
            onClick={handleAddContactMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Message
          </button>
        </div>
      )} */}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">First Name</th>
            <th className="border px-4 py-2 text-left">Last Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((contactmessage) => (
            <tr key={contactmessage._id}>
              <td className="border px-4 py-2">{contactmessage.firstName}</td>
              <td className="border px-4 py-2">{contactmessage.lastName}</td>
              <td className="border px-4 py-2">{contactmessage.email}</td>
              <td className="border px-4 py-2">{contactmessage.mobile}</td>
              <td className="border px-4 py-2">{contactmessage.message}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(contactmessage._id)}
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

export default ContactMessagesTable;
