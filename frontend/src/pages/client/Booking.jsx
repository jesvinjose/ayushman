import React, { useState, useEffect } from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import bookingBg from "../../assets/images/png/book_appointment_modal_bg.svg";
import bookingBgMob from "../../assets/images/png/book_appointment_bg_mob_one.png";
import axios from "axios";

function Booking() {
  const [backgroundImage, setBackgroundImage] = useState(bookingBg);

  // Function to update the background image based on screen size
  const updateBackgroundImage = () => {
    if (window.innerWidth <= 912) {
      setBackgroundImage(bookingBgMob); // Mobile background
    } else {
      setBackgroundImage(bookingBg); // Default background
    }
  };

  // useEffect to detect screen resize and update background accordingly
  useEffect(() => {
    updateBackgroundImage(); // Set initial background image

    // Add event listener to handle window resize
    window.addEventListener("resize", updateBackgroundImage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBackgroundImage);
    };
  }, []);

  const [treatments, setTreatments] = useState([]);

  const [branch, setBranch] = useState([]);

  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSlotDisabled, setIsTimeSlotDisabled] = useState(true);

  const [minDate, setMinDate] = useState(""); // To store tomorrow's date

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

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/treatment/gettreatments"
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
          "http://localhost:4000/api/branch/getbranch"
        );
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranch();
  }, []);

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

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData);
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/booking/registerbooking",
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
  
  return (
    <div className="treatments-bg bg bg-gray-200">
      {/* Heading Section */}
      <div
        className="treatments-head-wrapper max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12"
        style={{ marginBottom: "0px" }}
      >
        <div
          className="treatments-head-container flex justify-center items-center text-center"
          style={{
            backgroundImage: `url(${greenLeaves})`,
            backgroundSize: "auto 100%",
            padding: "20px",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Booking
          </h1>
        </div>
      </div>
      {/* Booking Form Section */}
      <div
        style={{
          paddingLeft: "35px",
          paddingRight: "35px",
          paddingBottom: "35px",
        }}
      >
        <div
          className="book-appointment-wrapper p-[20px] md:p-[40px] w-full mt-0 mx-auto"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // border: "2px solid yellow",
            borderRadius: "15px",
          }}
        >
          <div className="book-appointment-container flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="flex flex-col w-full lg:w-1/2">
              {/* Left Section: Title */}
              <div className="flex justify-center lg:justify-start lg:pr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-center lg:text-left font-bold text-white">
                  Book an Appointment (8:00 am to 7:00 pm)
                </h2>
              </div>
              <div className="mt-4 text-center lg:text-left">
                <h6 className="text-sm md:text-base" style={{ color: "red" }}>
                  Booking Not available on Tuesdays after 1:00 PM <br/>
                </h6>
              </div>
            </div>

            {/* Right Section: Form */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <form
                className="formSubmit flex flex-col items-center w-full"
                onSubmit={handleSubmit}
              >
                <ul className="flex flex-wrap gap-4 w-full">
                  {/* Input Fields */}
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      required
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <input
                      type="date"
                      placeholder="Date"
                      required
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange} // Regular handler for date input
                      min={minDate} // Set the min date to tomorrow
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>

                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <select
                      name="timeSlot"
                      required
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      disabled={isTimeSlotDisabled}
                      className="w-full p-3 border border-gray-300 rounded"
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
                    <span className="error-validation text-red-500"></span>
                  </li>

                  {/* Treatment and Location Fields */}
                  <li className="w-full sm:w-1/2 lg:w-2/5">
                    <select
                      name="treatment"
                      required
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded"
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
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full sm:w-1/2 lg:w-2/5">
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
                    <span className="error-validation text-red-500"></span>
                  </li>
                  {/* Message Field */}
                  <li className="w-full">
                    <textarea
                      name="message"
                      placeholder="Tell us more"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded h-[95px] mt-[10px]"
                    ></textarea>
                  </li>
                  {/* Submit Button */}
                  <li className="w-full text-center">
                    <button
                      type="submit"
                      className="bg-green-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
