import React, { useEffect, useState } from "react";
import doctorsBg from "../../assets/images/png/doctors-bg.png";
import greenLeaves from "../../assets/images/png/leaf.webp";

import axios from "axios";
import ImageHelper from "../../services/helper";

function Doctors() {
  const [consultants, setConsultants] = useState([]);
  const [dutyDoctors, setDutyDoctors] = useState([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/consultant/getconsultants"
        );
        //set the consultants data
        setConsultants(response.data);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    fetchConsultants();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/dutydoctor/getdutydoctors"
        );
        console.log(response.data); // Check the structure of the data
        setDutyDoctors(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching duty doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <div
        className="doctors-bg bg-cover bg-no-repeat object-cover"
        style={{
          backgroundImage: `url(${doctorsBg})`,
        }}
      >
        <div className="doctors-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Doctors
            </h1>
          </div>
          <div className="visiting-consultants-container mb-0">
            <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">
              Visiting Consultants
            </h2>
            <div className="main-doctors-container flex flex-wrap justify-center">
              {consultants.map((consultant) => (
                <div>
                  <div
                    className="flex flex-col items-center m-4"
                    style={{ height: "60%" }}
                  >
                    <ImageHelper size="300px" image={consultant.image} />
                  </div>
                  <div className="doctor-details flex flex-col items-center">
                    <h6 className="mt-10 text-lg">{consultant.name}</h6>
                    <p className="text-sm">{consultant.qualification}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="doctors-wrapper max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Duty Doctors
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {dutyDoctors.map((doctor) => (
              <div className="doctors-main-wrapper">
                <div className="doctors-img w-full aspect-square rounded-lg">
                  <ImageHelper size="300px" image={doctor.image} />
                </div>
                <div className="doctor-details text-center mt-4">
                  <h6 className="text-lg">{doctor.name}</h6>
                  <p className="text-sm">{doctor.qualification}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Doctors;
