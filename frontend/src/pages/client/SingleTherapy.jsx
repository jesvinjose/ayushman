import React, { useEffect, useState } from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import rightArrow from "../../assets/images/png/right-arrow-dark-green.png";
import { Link, useParams } from "react-router-dom";
import ImageHelper from "../../services/helper";
import axios from "axios";
import { BaseURL } from "../../BaseUrl";

function SingleTherapy() {
  const { id } = useParams(); // Get the ID from the URL
  const [treatment, setTreatment] = useState({});

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/treatment/getsingletreatment/${id}`
        );
        setTreatment(response.data.treatment); // Set the fetched treatment data
      } catch (error) {
        console.error("Error fetching treatment:", error);
      }
    };
    if (id) {
      fetchTreatment(); // Fetch the treatment if ID exists
    }
  }, [id]);

  const [treatments, setTreatments] = useState([]);

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

  // Safeguard: If treatment is undefined, return a loading state
  if (!treatment) {
    return <div>Loading...</div>; // Or return null, or a loading spinner
  }
  return (
    <div>
      <div className="max-w-[1380px] mx-auto px-[22px] py-12">
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
            Treatments
          </h1>
        </div>
        <ul className="flex flex-col md:flex-row w-full">
          <li className="md:w-1/2 mb-8 md:mb-0">
            <div className="panchakarma-short-desc-content p-4">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#3db549" }}
              >
                {treatment.name}
              </h2>
              <p
                className="text-gray-700 mt-2"
                dangerouslySetInnerHTML={{
                  __html: treatment.bigDescription,
                }}
              />
            </div>
          </li>
          <li className="md:w-1/2">
            <div className="short-desc-content-img p-4">
              <ImageHelper image={treatment.bigImage} size={400} />
            </div>
          </li>
        </ul>
      </div>
      <div className="book-appointment-wrapper max-w-[1380px] mx-auto px-[22px] bg-[#f1f1f1] py-6">
        <h3 className="text-xl font-bold text-center mb-6">Other Treatments</h3>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {treatments.map((treatment, index) => (
            <li key={index} className="our-treatment-item">
              <div
                className={`our-treatment-item-wrapper flex justify-between items-center p-4 border rounded-lg ${
                  treatment.active ? "bg-green-100" : "bg-white"
                } hover:bg-green-900 transition`}
              >
                <p className="text-lg">
                  <Link
                    to={`/treatment/${treatment._id}`}
                    className="text-green-600 hover:underline"
                  >
                    {treatment.name}
                  </Link>
                </p>
                <span>
                  <Link
                    to={`/treatment/${treatment._id}`}
                    className="text-green-600 hover:underline"
                  >
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                      <img className="w-4 h-4" src={rightArrow} alt="arrow" />
                    </div>
                  </Link>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleTherapy;
