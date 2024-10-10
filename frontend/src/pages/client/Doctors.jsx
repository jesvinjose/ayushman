import React from "react";
import doctorsBg from "../../assets/images/png/doctors-bg.png";
import greenLeaves from "../../assets/images/png/leaf.webp";
import doctorOne from "../../assets/images/png/D_Kerrthana_BAMS-preview.webp";
import doctorTwo from "../../assets/images/png/Dr_Mruthula_M_BAMS-preview.webp";
import doctorThree from "../../assets/images/png/Dr_Navya_KK_BAMS-preview.webp";
import doctorFour from "../../assets/images/png/Dr_Sreya_Sreedhar_BAMS-preview.webp";

import dr1copypreview from "../../assets/images/png/dr1-copy-preview.webp";
import dr2copypreview from "../../assets/images/png/dr2-copy-(1)-preview.webp";
import dr3copypreview from "../../assets/images/png/dr3-copy-preview.webp";

function Doctors() {
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
              <div
                className="flex flex-col items-center m-4"
                style={{ height: "60%" }}
              >
                <img
                  src={dr1copypreview}
                  alt=""
                  className="h-32 md:h-40 lg:h-48"
                />
                <div className="doctor-details flex flex-col items-center">
                  <h6 className="mt-2 text-lg">Dr. K C Balram</h6>
                  <p className="text-sm">BAMS</p>
                </div>
              </div>
              <div
                className="flex flex-col items-center m-4"
                style={{ height: "60%" }}
              >
                <img
                  src={dr2copypreview}
                  alt=""
                  className="h-32 md:h-40 lg:h-48"
                />
                <div className="doctor-details flex flex-col items-center">
                  <h6 className="mt-2 text-lg">Dr. Adarsh E K</h6>
                  <p className="text-sm">BAMS, MD</p>
                </div>
              </div>
              <div
                className="flex flex-col items-center m-4"
                style={{ height: "60%" }}
              >
                <img
                  src={dr3copypreview}
                  alt=""
                  className="h-32 md:h-40 lg:h-48"
                />
                <div className="doctor-details flex flex-col items-center">
                  <h6 className="mt-2 text-lg">Dr. Muhammed Anwar</h6>
                  <p className="text-sm">BAMS</p>
                </div>
              </div>
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
            {/* Doctor 1 */}
            <div className="doctors-main-wrapper">
              <div className="doctors-img w-full aspect-square rounded-lg">
                <img
                  className="object-cover w-full rounded-lg bg-gray-300"
                  src={doctorOne}
                  alt="Dr. Keerthana"
                />
              </div>
              <div className="doctor-details text-center mt-4">
                <h6 className="font-semibold">Dr. Keerthana</h6>
                <p className="text-gray-600">BAMS</p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="doctors-main-wrapper">
              <div className="doctors-img w-full aspect-square rounded-lg">
                <img
                  className="object-cover w-full rounded-lg bg-gray-300"
                  src={doctorTwo}
                  alt="Dr. Mruthula M"
                />
              </div>
              <div className="doctor-details text-center mt-4">
                <h6 className="font-semibold">Dr. Mruthula M</h6>
                <p className="text-gray-600">BAMS</p>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="doctors-main-wrapper">
              <div className="doctors-img w-full aspect-square rounded-lg">
                <img
                  className="object-cover w-full rounded-lg bg-gray-300"
                  src={doctorThree}
                  alt="Dr. Navya K K"
                />
              </div>
              <div className="doctor-details text-center mt-4">
                <h6 className="font-semibold">Dr. Navya K K</h6>
                <p className="text-gray-600">BAMS</p>
              </div>
            </div>

            {/* Doctor 4 */}
            <div className="doctors-main-wrapper">
              <div className="doctors-img w-full aspect-square rounded-lg">
                <img
                  className="object-cover w-full rounded-lg bg-gray-300"
                  src={doctorFour}
                  alt="Dr. Sreya Sreedhar"
                />
              </div>
              <div className="doctor-details text-center mt-4">
                <h6 className="font-semibold">Dr. Sreya Sreedhar</h6>
                <p className="text-gray-600">BAMS</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Doctors;
