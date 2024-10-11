import React, { useEffect, useState } from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import { Link } from "react-router-dom";
import ImageHelper from "../../services/helper";
import axios from "axios";

function Therapies() {
  const [treatments, setTreatments] = useState([]);

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

  return (
    <div className="treatments-bg bg-gray-100">
      <div className="treatments-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="visiting-consultants-container">
          <p className="text-center text-lg md:text-xl lg:text-2xl">
            We offer a wide range of specially curated treatments that
            revitalize your body, mind, and spirit.
          </p>
          <ul className="treatment-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {treatments.map((treatment) => (
              <li key={treatment._id}>
                <div className="treatment-card-container bg-white rounded-lg shadow-lg p-4">
                  <span className="block mb-4">
                    <ImageHelper image={treatment.image} size={200} />
                  </span>
                  <div className="treatment-card-content">
                    <h6 className="text-xl font-semibold">{treatment.name}</h6>
                    {/* Render the HTML content from the description safely */}
                    <p
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: treatment.description,
                      }}
                    />
                    <div className="mt-4">
                      <Link
                        to={`/readmore/${treatment._id}`} // Dynamic route to read more based on treatment ID
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
        </div>
      </div>
    </div>
  );
}

export default Therapies;
