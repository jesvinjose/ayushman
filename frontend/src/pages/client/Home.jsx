import React, { useEffect, useState } from "react";
import hero from "../../assets/images/png/hero.jpg";
import abhyangam from "../../assets/images/png/abhyangam-preview.webp";
import panchakarma from "../../assets/images/png/panchakarma-preview.webp";
import shirodhara from "../../assets/images/png/shirodhara-preview.webp";
import beautyTherapy from "../../assets/images/png/beauty-therapy-preview.webp";
import { Link } from "react-router-dom";
import play_button from "../../assets/images/png/play_button.png";
import video_image from "../../assets/images/png/video_image.png";
import wellness from "../../assets/images/jpg/wellness.jpg";
import hospital from "../../assets/images/jpg/hospital.jpg";
import institute from "../../assets/images/jpg/institute.jpg";

import doctorsImg from "../../assets/images/png/ayur_doctors_img_main.png";
import doctorOne from "../../assets/images/png/D_Kerrthana_BAMS-preview.webp";
import doctorTwo from "../../assets/images/png/Dr_Mruthula_M_BAMS-preview.webp";

import bookingBg from "../../assets/images/png/book_appointment_modal_bg.svg"
import bookingBgMob from "../../assets/images/png/book_appointment_bg_mob_one.png";

import franchiseBg from "../../assets/images/png/franchise_bg.png";
import franchiseBgMob from "../../assets/images/png/franchise_bg_mob.svg";

import indiraNagar from "../../assets/images/png/INDIRANAGAR-preview.webp";
import map from "../../assets/images/png/map.svg";
import nandiHills from "../../assets/images/png/all_around_card_img-preview.webp";
import kasthuriNagar from "../../assets/images/png/KASTHURI-NAGAR-preview.webp";

import testimonialOne from "../../assets/images/png/testimonialOne.webp";
import testimonialTwo from "../../assets/images/png/testimonialTwo.webp";
import testimonialThree from "../../assets/images/png/testimonialThree.webp";

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(bookingBg);
  const [franchiseBackgroundImage, setFranchiseBackgroundImage] =
    useState(franchiseBg);

  // Function to update the background image based on screen size
  const updateBackgroundImage = () => {
    if (window.innerWidth <= 912) {
      setBackgroundImage(bookingBgMob); // Mobile background
      setFranchiseBackgroundImage(franchiseBgMob);
    } else {
      setBackgroundImage(bookingBg); // Default background
      setFranchiseBackgroundImage(franchiseBg);
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
    <div>
      <div
        className="home-bg bg-cover bg-no-repeat object-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${hero})`, height: "100vh" }}
      >
        <h1 className="text-white font-bold text-center text-[32px] max-md:text-[20px]">
          Nurturing Life <br />
          with Ayurvedic Wisdom
        </h1>
      </div>

      <div className="max-w-[1106px] px-[22px] mx-auto flex flex-col md:flex-row justify-center items-center gap-[20px] md:gap-[50px] mt-[-110px] z-[10] relative">
        {/* Wellness Card */}
        <div className="flex-1 z-[11] w-full md:w-auto">
          <div
            className="flex flex-col rounded-[34px] border-2 border-[#3DB549] md:border-[#F1F1F1] border-solid w-full bg-[#F1F1F1] p-2"
            style={{
              filter: "drop-shadow(30px 30px 10px rgba(61, 181, 73, 0.3))",
            }}
          >
            <img
              className="rounded-[32px] h-[200px] w-full object-cover"
              src={wellness}
              alt="Wellness"
            />
            <div className="rounded-b-[32px] mt-[-20px]">
              <p className="text-[20px] font-semibold text-[#3DB549] text-center mb-2">
                Wellness
              </p>
              <p className="text-[14px] text-[#454545] text-center pt-2 pb-3 mb-4">
                Ayushman centers are unique <br /> ayurvedic treatment centers.
              </p>
            </div>
          </div>
        </div>

        {/* Hospital Card */}
        <div className="flex-1 z-[12] w-full md:w-auto">
          <div
            className="flex flex-col rounded-[34px] border-2 border-[#F1F1F1] border-solid w-full bg-[#F1F1F1] p-2"
            style={{ filter: "drop-shadow(30px 30px 10px rgba(0, 0, 0, 0.1))" }}
          >
            <img
              className="rounded-[32px] h-[200px] w-full object-cover"
              src={hospital}
              alt="Hospital"
            />
            <div className="rounded-b-[32px] mt-[-20px]">
              <p className="text-[20px] font-semibold text-[#3DB549] text-center mb-2">
                Hospital
              </p>
              <p className="text-[14px] text-[#454545] text-center pt-2 pb-3 mb-4">
                Ayushman centers are unique <br /> ayurvedic treatment centers.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="bg-[#3DB549] hover:bg-[#286d2f] text-white rounded-full text-[16px] font-medium w-[196px] h-[52px] text-center flex items-center justify-center mt-[-20px] z-[13]"
              href="/hospital"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Institute Card */}
        <div className="flex-1 z-[13] w-full md:w-auto">
          <div
            className="flex flex-col rounded-[34px] border-2 border-[#F1F1F1] border-solid w-full bg-[#F1F1F1] p-2"
            style={{ filter: "drop-shadow(30px 30px 10px rgba(0, 0, 0, 0.1))" }}
          >
            <img
              className="rounded-[32px] h-[200px] w-full object-cover"
              src={institute}
              alt="Institute"
            />
            <div className="rounded-b-[32px] mt-[-20px]">
              <p className="text-[20px] font-semibold text-[#3DB549] text-center mb-2">
                Institute
              </p>
              <p className="text-[14px] text-[#454545] text-center pt-2 pb-3 mb-4">
                Ayushman centers are unique <br /> ayurvedic treatment centers.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="bg-[#3DB549] hover:bg-[#286d2f] text-white rounded-full text-[16px] font-medium w-[196px] h-[52px] text-center flex items-center justify-center mt-[-20px] z-[14]"
              href="/institute"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      <div className="border border-brown mx-auto">
        <div className="bg-[#f1f1f1]">
          <div className="flex flex-col lg:flex-row py-0 lg:py-10 max-w-[1380px] mx-auto px-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Left Section - Text Content */}
            <div className="bg-white shadow rounded-lg flex flex-col justify-center p-6 w-full h-auto lg:flex-1">
              <h1 className="text-green-800 font-bold text-2xl lg:text-3xl mb-4">
                Welcome to <br /> Ayushman Ayurveda
              </h1>
              <p className="text-gray-700 text-sm lg:text-base">
                Ayushman centres are unique ayurvedic treatment centres with
                excellent facilities for rendering all kinds of Ayurvedic
                treatments. Eminent doctors as well as trained paramedical staff
                provide maximum care to the customers. Our centres offer expert
                consultation services by experienced ayurvedic doctors.
                Treatments are available for various ailments like Arthritis,
                Rheumatoid Arthritis, Ulcer, Sinusitis, Skin diseases, and other
                general illnesses. Our clinics are also a unique storehouse of
                Ayurvedic Kashayas, Arishtas, Lehyas, Ghrithams, Choornams, and
                other authentic medicines.
              </p>
              <div className="mt-6">
                <Link
                  to="/about"
                  className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Right Section - Video Content */}
            <div className="w-full flex justify-center items-center h-[282px] lg:h-auto lg:flex-1">
              <a
                className="relative w-full h-full"
                href="https://www.youtube.com/watch?v=vvFnrHH1M00"
                id="openVideoModalBtn"
              >
                <span className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center rounded-lg">
                  <img
                    className="w-12 h-12"
                    src={play_button}
                    alt="Play Button"
                  />
                </span>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={video_image}
                  alt="Ayushman Video Thumbnail"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-200">
        <div className="treatment-wrapper max-w-[1380px] mx-auto px-5 py-12 border border-yellow-400">
          <h2 className="text-green-600 text-3xl font-bold text-center">
            Treatments
          </h2>
          <p className="text-center mt-2">
            We offer a wide range of specially curated treatments that
            revitalize your body, mind, and spirit.
          </p>
          <ul className="treatment-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <li>
              <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span className="block mb-4">
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={panchakarma}
                    alt="Panchakarma"
                  />
                </span>
                <div className="treatment-card-content">
                  <h6 className="text-xl font-semibold">Panchakarma</h6>
                  <p className="text-gray-700 mt-2">
                    This five-fold purification therapy aims at correcting the
                    imbalance of the doshas - Vata, Pitta, Kapha in order to
                    maintain their inherent equilibrium.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/panchakarma"
                      className="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span className="block mb-4">
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={abhyangam}
                    alt="Abhyangam"
                  />
                </span>
                <div className="treatment-card-content">
                  <h6 className="text-xl font-semibold">Abhyangam</h6>
                  <p className="text-gray-700 mt-2">
                    This stimulating treatment with complete body oil
                    application increases blood circulation and revitalizes the
                    body.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/abhyangam"
                      className="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span className="block mb-4">
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={shirodhara}
                    alt="Shirodhara"
                  />
                </span>
                <div className="treatment-card-content">
                  <h6 className="text-xl font-semibold">Shirodhara</h6>
                  <p className="text-gray-700 mt-2">
                    This one-of-a-kind therapy induces a relaxed state by
                    dripping medicated oil on the forehead to soothe the body as
                    well as the mind.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/shirodhara"
                      className="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                <span className="block mb-4">
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={beautyTherapy}
                    alt="Beauty Therapy"
                  />
                </span>
                <div className="treatment-card-content">
                  <h6 className="text-xl font-semibold">Beauty Therapy</h6>
                  <p className="text-gray-700 mt-2">
                    Ayurvedic beauty therapy follows the ancient methods of
                    beauty enhancement. It rejuvenates the skin and brings about
                    a healthy glow.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://www.ayushmanayurvedic.in/treatment/beauty-therapy"
                      className="read-more-button-dark text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="text-center mt-8">
            <Link to="/therapies">
              <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700">
                View all Treatments
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 border-black">
        <h2 className="text-green-600 text-3xl font-bold text-center p-5 lg:pb-10">
          Doctors
        </h2>

        <div className="w-full h-auto lg:h-[80vh] flex flex-col lg:flex-row gap-5 justify-center items-center p-3 border">
          {/* Doctors Image */}
          <div className="w-full lg:w-[40%] h-[40vh] lg:h-[70vh] border">
            <img
              className="w-full h-full object-contain"
              src={doctorsImg}
              alt="doctors_img"
            />
          </div>

          {/* Doctors Details */}
          <div className="w-full lg:w-[40%] h-auto lg:h-[70vh] flex flex-col justify-center items-center border mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 justify-center items-center">
              {/* Doctor One */}
              <div className="w-full lg:w-1/2 h-[30vh] lg:h-[80%] text-center rounded-lg overflow-hidden border">
                <img
                  className="h-[70%] w-full object-contain"
                  src={doctorOne}
                  alt="doctor_one"
                />
                <h2 className="mt-2 text-black">Dr.Keerthana</h2>
                <p className="mt-2 text-blue-300">BAMS</p>
              </div>

              {/* Doctor Two */}
              <div className="w-full lg:w-1/2 h-[30vh] lg:h-[80%] text-center rounded-lg overflow-hidden border">
                <img
                  className="h-[70%] w-full object-contain"
                  src={doctorTwo}
                  alt="doctor_two"
                />
                <h2 className="mt-2 text-black">Dr.Mruthula M</h2>
                <p className="mt-2 text-blue-300">BAMS</p>
              </div>
            </div>

            {/* View All Doctors Button */}
            <div className="w-full flex justify-center items-center mt-5">
              <Link
                to="/doctors"
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
              >
                View all Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}

      <div className="w-full bg-green-200 p-5 h-auto">
        <h2 className="text-green-600 text-3xl font-bold text-center p-5 lg:pb-10">
          Testimonials
        </h2>
        <div className="flex w-full flex-wrap gap-5 justify-center lg:justify-between">
          {/* Testimonial One */}
          <div className="w-full  bg-green-200  rounded-lg sm:w-1/2 lg:w-1/4 flex justify-center items-center h-[200px] lg:h-[282px]">
            <a
              className="relative w-full h-full overflow-hidden"
              href="https://www.youtube.com/watch?v=vvFnrHH1M00"
              id="openVideoModalBtn"
            >
              <span className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <img className="w-6 h-6" src={play_button} alt="Play Button" />
              </span>
              <img
                className="w-full h-full object-contain rounded-lg"
                src={testimonialOne}
                alt="Testimonial One"
              />
            </a>
          </div>

          {/* Testimonial Two */}
          <div className="w-full  bg-green-200 rounded-lg sm:w-1/2 lg:w-1/4 flex justify-center items-center h-[200px] lg:h-[282px]">
            <a
              className="relative w-full h-full overflow-hidden"
              href="https://www.youtube.com/watch?v=vvFnrHH1M00"
              id="openVideoModalBtn"
            >
              <span className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <img className="w-6 h-6" src={play_button} alt="Play Button" />
              </span>
              <img
                className="w-full h-full object-contain rounded-lg"
                src={testimonialTwo}
                alt="Testimonial Two"
              />
            </a>
          </div>

          {/* Testimonial Three */}
          <div className="w-full  bg-green-200 sm:w-1/2 lg:w-1/4 flex justify-center rounded-lg items-center h-[200px] lg:h-[282px]">
            <a
              className="relative w-full h-full overflow-hidden"
              href="https://www.youtube.com/watch?v=vvFnrHH1M00"
              id="openVideoModalBtn"
            >
              <span className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <img className="w-6 h-6" src={play_button} alt="Play Button" />
              </span>
              <img
                className="w-full h-full object-contain rounded-lg"
                src={testimonialThree}
                alt="Testimonial Three"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="bg-[#f1f1f1]">
        <div className="max-w-[1380px] mx-auto px-[22px] pb-16 mb-25">
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
            {/* Add similar cards for the rest */}
          </ul>
          {/* View All Branches Button */}
          <div className="w-full flex justify-center items-center mt-5">
            <Link
              to="/contact"
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              View all Branches
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div
        style={{
          padding: "35px",
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
      {/* Franchise Section */}
      <div
        className="bg-gray-200"
        style={{
          padding: "35px",
        }}
      >
        <div
          className="book-appointment-wrapper relative p-[20px] md:p-[40px] w-full mt-0 mx-auto min-h-96"
          style={{
            backgroundImage: `url(${franchiseBackgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            height: "100%",
            minHeight: "450px",
          }}
        >
          {/* Background overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-[15px]"></div>

          {/* Content on top of the overlay */}
          <div className="book-appointment-container relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12 z-10">
            {/* Left Section: Title */}
            <div className="lg:w-1/2 lg:pr-8 flex flex-col justify-center items-center">
              <h2 className="text-[24px] sm:text-[28px] md:text-[41px] leading-[45px] text-center font-bold text-white m-12 ">
                Interested in a <br />
                franchise?
              </h2>
              <p className="text-center text-white">
                We are offering franchise <br />
                opportunities for you to grow along with us
              </p>
              <Link
                to="/contact"
                className="bg-green-700 text-white px-4 py-2 m-5 rounded-lg hover:bg-green-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
