import React, { useState } from "react";
import contactBg from "../../assets/images/png/contact-us-bg.png";
import greenLeaves from "../../assets/images/png/leaf.webp";
import indiraNagar from "../../assets/images/png/INDIRANAGAR-preview.webp";
import map from "../../assets/images/png/map.svg";
import nandiHills from "../../assets/images/png/all_around_card_img-preview.webp";
import kasthuriNagar from "../../assets/images/png/KASTHURI-NAGAR-preview.webp";
import babusaPalya from "../../assets/images/png/Babusapalya-preview.webp";
import kalyanNagar from "../../assets/images/png/KALYAN-NAGAR-preview.webp";
import { Link } from "react-router-dom";
import axios from "axios";

function Contact() {
  const [messageData, setMessageData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contactmessage/addcontactmessage",
        {
          firstName: messageData.firstName,
          lastName: messageData.lastName,
          email: messageData.email,
          mobile: messageData.mobile,
          message: messageData.message,
        }
      );

      // Show success alert with response message
      alert(response.data.message);

      // Optionally reset the form after submission
      setMessageData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle validation error from the backend
        alert(`Validation Error: ${error.response.data.message}`);
      } else if (error.response && error.response.data) {
        // Handle other types of backend errors
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Handle unexpected errors (e.g., network or server issues)
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div
        className="about-bg bg-cover bg-no-repeat object-cover"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="contact-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div
            className="treatments-head-container mb-8 flex justify-center items-center text-center"
            style={{
              backgroundImage: `url(${greenLeaves})`,
              backgroundSize: "auto 100%",
              padding: "20px",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Contact Us
            </h1>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center text-center p-4 sm:p-6 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">
              Want to know more?
            </h2>
            <p className="mt-2">Reach out to us right now</p>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            {/* Left Section with Logo and Social Media */}
            <div className="w-full md:w-1/4 h-auto md:h-[50vh] flex flex-col items-center justify-between py-10">
              <img
                src="http://www.ayushmanayurvedic.in/assets/images/svg/footer_logo.svg"
                alt="footer logo"
                className="h-20 mb-6"
              />
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/AyushmanAyurvedicofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="http://www.ayushmanayurvedic.in/assets/images/svg/fb.svg"
                    alt="facebook logo"
                    className="h-6"
                  />
                </a>
                <a
                  href="https://twitter.com/ayushmanayurve1?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="http://www.ayushmanayurvedic.in/assets/images/svg/x.svg"
                    alt="x logo"
                    className="h-6"
                  />
                </a>
                <a
                  href="https://www.instagram.com/ayushmanayurvedaofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="http://www.ayushmanayurvedic.in/assets/images/svg/ig.svg"
                    alt="instagram logo"
                    className="h-6"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/100897299/admin/feed/posts/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="http://www.ayushmanayurvedic.in/assets/images/svg/ln.svg"
                    alt="linkedin logo"
                    className="h-6"
                  />
                </a>
              </div>
            </div>

            {/* Right Section with Form */}
            <div className="w-full md:w-3/4 border border-green-500 rounded-lg h-auto md:h-[50vh] flex items-center justify-center p-4">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg"
                name="formSubmit"
                id="myForm"
                encType="multipart/form-data"
              >
                <div className="flex flex-wrap w-full">
                  <div className="w-full md:w-1/2 p-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="border border-gray-300 rounded p-2 w-full"
                      value={messageData.firstName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="border border-gray-300 rounded p-2 w-full"
                      value={messageData.lastName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-2">
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      className="border border-gray-300 rounded p-2 w-full"
                      value={messageData.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-2 flex space-x-2">
                    <select
                      className="border border-gray-300 rounded p-0 w-1/4"
                      required
                    >
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      name="mobile"
                      className="border border-gray-300 rounded p-2 w-3/4"
                      value={messageData.mobile}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="w-full p-2">
                    <textarea
                      placeholder="Message/Comment"
                      name="message"
                      className="border border-gray-300 rounded p-2 w-full"
                      value={messageData.message}
                      onChange={handleOnChange}
                    ></textarea>
                  </div>
                  <div className="w-full p-2">
                    <div
                      className="g-recaptcha"
                      data-sitekey="your-site-key"
                    ></div>
                  </div>
                  <div className="w-full flex justify-center p-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f1f1f1]">
        <div className="max-w-[1380px] mx-auto px-[22px] pb-0 mb-25">
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bolder",
              color: "green",
            }}
          >
            We are all around
          </h2>
          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            We are present at 13 prime locations around Karnataka
          </p>

          <ul className="flex flex-wrap justify-center md:justify-between gap-6 mb-[80px]">
            {/* Card 1 */}
            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={kasthuriNagar} alt="KASTURI NAGAR" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>KASTURI NAGAR</h5>
                  <p>+91 80423 51313</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                to="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            {/* Repeat for other cards */}
            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={indiraNagar} alt="INDIRANAGAR" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>INDIRANAGAR</h5>
                  <p>+91 80500 14770</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                to="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={nandiHills} alt="NANDI HILLS" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>NANDI HILLS</h5>
                  <p>+91 95138 88668</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                to="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={kasthuriNagar} alt="KASTHURI NAGAR" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>KASTHURI NAGAR</h5>
                  <p>+91 8042351313</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                to="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={kalyanNagar} alt="KALYAN NAGAR" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>KALYAN NAGAR</h5>
                  <p>+91 87227 58684</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                href="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            <li className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5">
              <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                <div className="relative">
                  <img src={babusaPalya} alt="BABUSAPALAYA" />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-4 text-center">
                  <h5>BABUSAPALAYA</h5>
                  <p>+91 95381 61313</p>
                </div>
              </div>
              <Link
                className="block mt-2 text-center"
                target="_blank"
                to="https://g.page/r/CZL4gJ4KkqoEEAI/review"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>
                  <img src={map} alt="Map" />
                </span>
              </Link>
            </li>

            {/* Add similar cards for the rest */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Contact;
