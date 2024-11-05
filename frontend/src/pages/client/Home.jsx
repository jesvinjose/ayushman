import React, { useEffect, useState } from "react";
import hero from "../../assets/images/png/hero.jpg";
import { Link } from "react-router-dom";
import play_button from "../../assets/images/png/play_button.png";
import video_image from "../../assets/images/png/video_image.png";
import wellness from "../../assets/images/jpg/wellness.jpg";
// import hospital from "../../assets/images/jpg/hospital.jpg";
// import institute from "../../assets/images/jpg/institute.jpg";

import doctorsImg from "../../assets/images/png/ayur_doctors_img_main.png";

import bookingBg from "../../assets/images/png/book_appointment_modal_bg.svg";
import bookingBgMob from "../../assets/images/png/book_appointment_bg_mob_one.png";

import franchiseBg from "../../assets/images/png/franchise_bg.png";
import franchiseBgMob from "../../assets/images/png/franchise_bg_mob.svg";

import map from "../../assets/images/png/map.svg";

import testimonialOne from "../../assets/images/png/testimonialOne.webp";
import testimonialTwo from "../../assets/images/png/testimonialTwo.webp";
import testimonialThree from "../../assets/images/png/testimonialThree.webp";

import axios from "axios";
import ImageHelper from "../../services/helper";
import { BaseURL } from "../../BaseUrl";

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

  const [treatments, setTreatments] = useState([]);
  const [dutyDoctors, setDutyDoctors] = useState([]);
  const [branch, setBranch] = useState([]);

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/dutydoctor/getdutydoctors`
        );
        console.log(response.data); // Check the structure of the data
        setDutyDoctors(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching duty doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/branch/getbranch`);
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranch();
  }, []);

  // Show only 1/3 of the total treatments
  const treatmentsToShow = treatments.slice(
    0,
    Math.floor(treatments.length / 3)
  );

  // Show only 2 of the total doctors
  const doctorsToShow = dutyDoctors.slice(0, 2);

  // Show only 1/2 of the total branches
  const branchesToShow = branch.slice(0, Math.floor(branch.length / 2));

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

  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSlotDisabled, setIsTimeSlotDisabled] = useState(true);

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

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/testimonial/gettestimonials`
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
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
        <div className="flex-1 z-[11] w-full md:w-auto flex justify-center items-center">
          <div
            className="flex flex-col rounded-[34px] border-2 border-[#3DB549] md:border-[#F1F1F1] border-solid w-1/3 bg-[#F1F1F1] p-2 mx-auto"
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
                Green Leaf Ayurveda Wellness centers are unique <br /> ayurvedic
                treatment centers.
              </p>
            </div>
          </div>
        </div>

        {/* Hospital Card */}
        {/* <div className="flex-1 z-[12] w-full md:w-auto">
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
        </div> */}

        {/* Institute Card */}
        {/* <div className="flex-1 z-[13] w-full md:w-auto">
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
        </div> */}
      </div>

      <div className="border border-brown mx-auto">
        <div className="bg-[#f1f1f1]">
          <div className="flex flex-col lg:flex-row py-0 lg:py-10 max-w-[1380px] mx-auto px-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Left Section - Text Content */}
            <div className="bg-white shadow rounded-lg flex flex-col justify-center p-6 w-full h-auto lg:flex-1">
              <h1 className="text-green-800 font-bold text-2xl lg:text-3xl mb-4">
                Welcome to Green Leaf
                <br /> Ayurveda Wellness Centre
              </h1>
              <p className="text-gray-700 text-sm lg:text-base">
                Green Leaf Ayurveda Wellness centres are unique ayurvedic
                treatment centres with excellent facilities for rendering all
                kinds of Ayurvedic treatments. Eminent doctors as well as
                trained paramedical staff provide maximum care to the customers.
                Our centres offer expert consultation services by experienced
                ayurvedic doctors. Treatments are available for various ailments
                like Arthritis, Rheumatoid Arthritis, Ulcer, Sinusitis, Skin
                diseases, and other general illnesses. Our clinics are also a
                unique storehouse of Ayurvedic Kashayas, Arishtas, Lehyas,
                Ghrithams, Choornams, and other authentic medicines.
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
                  alt="Green Leaf Ayurveda Wellness Centre Video Thumbnail"
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
            {treatmentsToShow.map((treatment, index) => (
              <li key={index}>
                <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                  <span className="block mb-4">
                    <ImageHelper image={treatment.image} size={200} />
                  </span>
                  <div className="treatment-card-content">
                    <h6 className="text-xl font-semibold">{treatment.title}</h6>
                    <p
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: treatment.description,
                      }}
                    />
                    <div className="mt-4">
                      <Link
                        to={`/treatment/${treatment._id}`} // Dynamic route to read more based on treatment ID
                        className="read-more-button-dark text-blue-500 hover:text-blue-700"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
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

        <div className="w-full h-auto lg:h-[80vh] flex flex-col lg:flex-row gap-5 justify-between items-center p-5 lg:p-10 border">
          {/* Doctors Image */}
          <div className="w-full lg:w-[40%] h-[50vh] lg:h-[70vh] border">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={doctorsImg}
              alt="doctors_img"
            />
          </div>

          {/* Doctors Details */}
          <div className="w-full lg:w-[50%] h-auto lg:h-[70vh] flex flex-col justify-between items-center border mx-auto bg-gray-100 rounded-lg p-5 lg:p-10">
            <div className="flex flex-wrap gap-5 justify-center items-center">
              {doctorsToShow.length > 0 ? (
                doctorsToShow.map((doctor, index) => {
                  return (
                    <div
                      className="w-full md:w-1/2 lg:w-1/3 h-auto text-center rounded-lg overflow-visible border bg-white shadow-lg p-4"
                      key={index}
                    >
                      <ImageHelper image={doctor.image} size={200} />

                      <h2 className="mt-3 text-black font-semibold">
                        {doctor.name || "Doctor's Name"}
                      </h2>

                      <p className="mt-1 text-red-600">
                        {doctor.qualification || "Qualification not available"}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>No doctors available to display</p>
              )}
            </div>
            <div className="w-full flex justify-center items-center mt-5">
              <Link
                to="/doctors"
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900"
              >
                View all Doctors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}

      {/* <div className="w-full bg-green-200 p-5 h-auto">
        <h2 className="text-green-600 text-3xl font-bold text-center p-5 lg:pb-10">
          Testimonials
        </h2>
        <div className="flex w-full flex-wrap gap-5 justify-center lg:justify-between"> */}
      {/* {testimonials.map((testimonial) => {
            return (
              <div className="w-full  bg-green-200  rounded-lg sm:w-1/2 lg:w-1/4 flex justify-center items-center h-[200px] lg:h-[282px]">
                <Link
                  className="relative w-full h-full overflow-hidden flex justify-center items-center"
                  to={testimonial.videoUrl}
                  id="openVideoModalBtn"
                >
                  <span className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <img
                      className="w-6 h-6"
                      src={play_button}
                      alt="Play Button"
                    />
                  </span>
                  <ImageHelper size="200px" image={testimonial.image} />
                </Link>
              </div>
            );
          })} */}

      {/* Testimonial One */}
      {/* <div className="w-full  bg-green-200  rounded-lg sm:w-1/2 lg:w-1/4 flex justify-center items-center h-[200px] lg:h-[282px]">
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
          </div> */}

      {/* Testimonial Two */}
      {/* <div className="w-full  bg-green-200 rounded-lg sm:w-1/2 lg:w-1/4 flex justify-center items-center h-[200px] lg:h-[282px]">
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
          </div> */}

      {/* Testimonial Three */}
      {/* <div className="w-full  bg-green-200 sm:w-1/2 lg:w-1/4 flex justify-center rounded-lg items-center h-[200px] lg:h-[282px]">
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
          </div> */}
      {/* </div>
      </div> */}

      {testimonials.length > 0 ? (
        <div className="w-full bg-green-200 p-5 h-auto">
          <h2 className="text-green-600 text-3xl font-bold text-center p-5 lg:pb-10">
            Testimonials
          </h2>
          <div className="flex w-full flex-wrap gap-5 justify-center lg:justify-between">
            {testimonials.map((testimonial) => (
              <div className="w-full sm:w-1/2 lg:w-1/4 bg-white rounded-lg p-5 shadow-lg flex flex-col items-center">
                {/* Video Section */}
                <div className="relative w-full h-[200px] lg:h-[250px] rounded-md overflow-hidden mb-4">
                  <a
                    href={testimonial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex justify-center items-center"
                    id="openVideoModalBtn"
                  >
                    <span className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                      <img
                        className="w-10 h-10"
                        src={play_button}
                        alt="Play Button"
                      />
                    </span>
                    <ImageHelper size="200px" image={testimonial.image} />
                  </a>
                </div>

                {/* Testimonial Message */}
                <p className="text-center text-gray-700 mb-2 text-sm lg:text-base px-4">
                  "{testimonial.message}"
                </p>

                {/* Testimonial Name */}
                <h4 className="text-center text-green-700 font-semibold text-lg lg:text-xl">
                  {testimonial.name}
                  <br />
                  {testimonial.designation}
                </h4>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

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
          {branch.length > 1 ? (
            <p style={{ textAlign: "center", marginBottom: "30px" }}>
              We are currently present at {branch.length} prime locations around
              Karnataka.
            </p>
          ) : (
            <p style={{ textAlign: "center", marginBottom: "30px" }}>
              We are currently present at 1 location.
            </p>
          )}

          <ul className="flex flex-wrap justify-center md:justify-around gap-6 mb-[80px]">
            {branchesToShow.map((b) => (
              <li
                key={b.id}
                className="w-full sm:w-[48%] lg:w-[23%] border border-red-200 rounded-r-2xl mb-5"
              >
                <div className="border border-[#d4d4d4] bg-[#f7f7f7] rounded-[16px]">
                  <div className="relative">
                    <ImageHelper size="300px" image={b.image} />
                    <div className="absolute inset-0"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h5>{b.place}</h5>
                    <p>+91 {b.mobile}</p>
                  </div>
                </div>
                <Link
                  className="block mt-2 text-center"
                  target="_blank"
                  to={`https://maps.google.com/?q=${b.latitude},${b.longitude}`}
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
            ))}
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
                  Booking Not available on Tuesdays after 1:00 PM <br />
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
