import React, { useState, useEffect } from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import bookingBg from "../../assets/images/png/book_appointment_modal_bg.svg";
import bookingBgMob from "../../assets/images/png/book_appointment_bg_mob_one.png";

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
            {/* Left Section: Title */}
            <div className="lg:w-1/2 lg:pr-8 flex justify-center items-center">
              <h2 className="text-[24px] sm:text-[28px] md:text-[41px] leading-[45px] text-center font-bold text-white">
                Book an Appointment
              </h2>
            </div>

            {/* Right Section: Form */}
            <div className="lg:w-1/2 mt-16 lg:mt-0">
              <form
                method="post"
                className="formSubmit flex flex-col items-center w-full"
                name="formSubmit"
                id="formSubmit"
                data-content="/appointment/create"
                encType="multipart/form-data"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="iwtJ3b9nO8hND583OVvp2uIEft9sG0w7axgTGYSD"
                />
                <ul className="flex flex-wrap gap-4 w-full">
                  {/* Input Fields */}
                  <li className="w-full lg:w-2/5">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      name="first_name"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full lg:w-2/5">
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      name="last_name"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full lg:w-2/5">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full lg:w-2/5">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      name="phone_number"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    <span className="error-validation text-red-500"></span>
                  </li>

                  {/* Dropdown Fields */}
                  <li className="w-full lg:w-2/5">
                    <select
                      name="treatment"
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    >
                      <option value="">Treatment</option>
                      <option value="6">Panchakarma</option>
                      {/* Add other options here */}
                    </select>
                    <span className="error-validation text-red-500"></span>
                  </li>
                  <li className="w-full lg:w-2/5">
                    <select
                      name="location"
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    >
                      <option value="">Location</option>
                      <option value="2">KASTURI NAGAR</option>
                      {/* Add other options here */}
                    </select>
                    <span className="error-validation text-red-500"></span>
                  </li>

                  {/* Message Field */}
                  <li className="w-full">
                    <textarea
                      name="message"
                      placeholder="Tell us more"
                      className="w-full p-3 border border-gray-300 rounded h-[95px] mt-[10px]"
                    ></textarea>
                  </li>

                  {/* Submit Button */}
                  <li className="w-full text-center">
                    <button className="bg-green-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition">
                      Submit
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
