import React from "react";
import greenLeaves from "../../assets/images/png/leaf.webp";
import Abhyangam from "../../assets/images/png/abhyangam-detail_images_preview.webp";
import rightArrow from "../../assets/images/png/right-arrow-dark-green.png";

function SingleTherapy() {
  const treatments = [
    {
      name: "Panchakarma",
      url: "https://www.ayushmanayurvedic.in/treatment/panchakarma",
    },
    {
      name: "Abhyangam",
      url: "https://www.ayushmanayurvedic.in/treatment/abhyangam",
      active: true,
    },
    {
      name: "Shirodhara",
      url: "https://www.ayushmanayurvedic.in/treatment/shirodhara",
    },
    {
      name: "Beauty Therapy",
      url: "https://www.ayushmanayurvedic.in/treatment/beauty-therapy",
    },
    {
      name: "Pizhichil",
      url: "https://www.ayushmanayurvedic.in/treatment/pizhichil",
    },
    {
      name: "Njavara Kizhi",
      url: "https://www.ayushmanayurvedic.in/treatment/njavarakizhi",
    },
    { name: "Nasya", url: "https://www.ayushmanayurvedic.in/treatment/nasya" },
    {
      name: "Kati Vasti",
      url: "https://www.ayushmanayurvedic.in/treatment/kativasti",
    },
    {
      name: "Netra Tarpana",
      url: "https://www.ayushmanayurvedic.in/treatment/netra-tarpana",
    },
    {
      name: "Udvarthanam",
      url: "https://www.ayushmanayurvedic.in/treatment/udvarthanam",
    },
    {
      name: "Elakizhi",
      url: "https://www.ayushmanayurvedic.in/treatment/elakizhi",
    },
    { name: "Pichu", url: "https://www.ayushmanayurvedic.in/treatment/pichu" },
    {
      name: "Yoga Therapy",
      url: "https://www.ayushmanayurvedic.in/treatment/yoga-therapy",
    },
    {
      name: "Marma Therapy",
      url: "https://www.ayushmanayurvedic.in/treatment/marma-therapy",
    },
  ];
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
          {/* Left Section */}
          <li className="md:w-1/2 mb-8 md:mb-0">
            <div className="panchakarma-short-desc-content p-4">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#3db549" }}
              >
                Abhyangam
              </h2>
              <p className="leading-relaxed text-justify">
                Complete body oil application with a choice of medicated oils
                suited for your constitution. It is recommended for
                musculoskeletal health. This therapy helps tone muscles and
                removes fatigue, making your body agile. Herbalized steam
                relaxes the body, reduces tension, and opens the pores and
                channels of circulation. Performed following Abhyangam, Swedana
                promotes penetration of the medicinal effects deep into the
                bodily tissues. Abhyanga has a positive impact on the whole body
                physically, mentally, and emotionally while balancing the
                individual doshas. Its rhythmic motion helps to relieve joints
                and muscles from stiffness and makes all body movements free.
                This stimulating treatment increases blood circulation, which in
                turn encourages quick removal of metabolic wastes, while
                providing relief to diseases such as anxiety, fatigue,
                circulatory disorders, rheumatic and arthritic problems,
                backaches, and injuries. Synchronized massage is also beneficial
                in preventing wrinkles and scales, improving skin texture and
                complexion, curing spondylitis, sleep disorders, paralysis,
                improving physical consistency, inducing sound sleep, and
                increasing the general sense of well-being and life span.
              </p>
            </div>
          </li>

          {/* Right Section */}
          <li className="md:w-1/2">
            <div className="short-desc-content-img p-4">
              <img
                className="w-full h-auto object-cover"
                src={Abhyangam}
                alt="Abhyangam Therapy"
              />
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
                  <a
                    href={treatment.url}
                    className="text-green-600 hover:underline"
                  >
                    {treatment.name}
                  </a>
                </p>
                <span>
                  <a href={treatment.url}>
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                      <img className="w-4 h-4" src={rightArrow} alt="arrow" />
                    </div>
                  </a>
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
