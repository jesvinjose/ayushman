"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { BaseURL } from "../../BaseUrl";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  // Form state for input fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    date: "",
    timeSlot: "",
    treatment: "",
    branch: "",
    message: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSlotDisabled, setIsTimeSlotDisabled] = useState(true);

  const [minDate, setMinDate] = useState(""); // To store tomorrow's date

  const [treatments, setTreatments] = useState([]);

  const [branch, setBranch] = useState([]);

  // All available time slots
  const allTimeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
  ];

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/treatment/gettreatments`
        );
        console.log(response.data); // Check the structure of the data
        setTreatments(response.data); // Assuming API returns { treatments: [...] }
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };
    fetchTreatments();
  }, []);

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/branch/getbranch`
        );
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranch();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/booking/getbookings`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Function to get tomorrow's date in 'YYYY-MM-DD' format
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = ("0" + (tomorrow.getMonth() + 1)).slice(-2); // Add leading 0 to month
    const day = ("0" + tomorrow.getDate()).slice(-2); // Add leading 0 to day
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setMinDate(getTomorrowDate()); // Set minimum date to tomorrow
  }, []);

  useEffect(() => {
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      // Enable time slot selection if a valid future date is selected
      setIsTimeSlotDisabled(false);
      const dayOfWeek = selectedDate.getDay();
      // Check if the selected day is Tuesday (day 2), and limit time slots
      if (dayOfWeek === 2) {
        setTimeSlots(allTimeSlots.slice(0, 5)); // Limit time slots on Tuesdays
      } else {
        setTimeSlots(allTimeSlots);
      }
    } else {
      // Disable time slot selection if no date is selected
      setIsTimeSlotDisabled(true);
      // setTimeSlots([]);
    }
  }, [formData.date]);

  const handleAddBooking = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(
        `${BaseURL}/api/booking/registerbooking`,
        formData
      );

      // Handle successful booking registration
      alert(response.data.message);
      console.log("Booking registered successfully:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        date: "",
        timeSlot: "",
        treatment: "",
        branch: "",
        message: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        // If the error has a response from the server (like a time slot being fully booked)
        alert(error.response.data.message);
      } else {
        // If it's some other error
        alert("An error occurred. Please try again.");
      }
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${BaseURL}/api/booking/deletebooking/${id}`
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Fetch bookings on initial load and then set up polling
  useEffect(() => {
    fetchBookings();
    const interval = setInterval(() => {
      fetchBookings();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      date: "",
      timeSlot: "",
      treatment: "",
      branch: "",
      message: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Booking
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Booking</h3>
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          />
          <input
            type="date"
            placeholder="Date"
            required
            name="date"
            value={formData.date}
            onChange={handleInputChange} // Regular handler for date input
            min={minDate} // Set the min date to tomorrow
            className="border p-2 w-full mb-4"
          />
          <select
            name="timeSlot"
            required
            value={formData.timeSlot}
            onChange={handleInputChange}
            disabled={isTimeSlotDisabled}
            className="border p-2 w-full mb-4"
          >
            <option value="" disabled>
              Select time slot (Date First)
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <select
            name="treatment"
            required
            value={formData.treatment}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          >
            <option value="">Treatment</option>
            {/*<option value="6">Panchakarma</option> */}
            {treatments.map((treatment) => {
              return (
                <option key={treatment._id} value={treatment._id}>
                  {treatment.name}
                </option>
              );
            })}
          </select>
          <select
            name="branch"
            required
            value={formData.branch}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Branch</option>
            {/* <option value="2">KASTURI NAGAR</option> */}
            {branch.map((branch) => {
              return (
                <option key={branch._id} value={branch._id}>
                  {branch.place}
                </option>
              );
            })}
          </select>
          <textarea
            name="message"
            placeholder="Tell us more"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded h-[95px] mt-[10px]"
          ></textarea>
          <button
            onClick={handleAddBooking}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Book Now
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">First Name</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            {/* <th className="border px-4 py-2 text-left">Email</th> */}
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Time</th>
            <th className="border px-4 py-2 text-left">Treatment</th>
            <th className="border px-4 py-2 text-left">Branch</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border px-4 py-2">{booking.firstName}</td>
              <td className="border px-4 py-2">{booking.mobile}</td>
              {/* <td className="border px-4 py-2">{booking.email}</td> */}
              <td className="border px-4 py-2">{booking.date}</td>
              <td className="border px-4 py-2">{booking.timeSlot}</td>
              <td className="border px-4 py-2">
                {booking.treatment.name}
              </td>{" "}
              {/* Treatment name */}
              <td className="border px-4 py-2">{booking.branch.place}</td>{" "}
              {/* Branch name */}
              <td className="border px-4 py-2">{booking.message}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(booking._id)}
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

export default BookingsTable;
