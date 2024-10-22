import React from "react";
import aboutBg from "../../assets/images/png/about-bg.png";
import greenLeaves from "../../assets/images/png/leaf.webp";

const About = () => {
  return (
    <div
      className="about-bg bg-cover bg-no-repeat object-cover"
      style={{
        backgroundImage: `url(${aboutBg})`,
      }}
    >
      <div className="about-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            About Us
          </h1>
        </div>

        {/* Green Leaf Ayurveda Wellness Centre Section */}
        <div className="visiting-consultants-container mb-12">
          <h2
            className="text-2xl font-semibold text-green-700 mb-4"
            style={{ textAlign: "center" }}
          >
            Green Leaf Ayurveda Wellness Centre
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bringing the pure essence of Ayurveda; 'the science of life'
            directly into your lives, for you to experience nature's way of
            healing. Presenting you the sacred way towards wellness written in
            the Vedas in an advanced form. Green Leaf Ayurveda Wellness Centre
            accompany you with the same quintessence of the ancient methods and
            practices of Ayurvedic treatment. We have proven excellence in
            delivering Ayurvedic treatment in a way our clients are delighted by
            the services. Equipped with prestigious doctors, exquisite
            facilities, we assure our clients an ecstatic healing experience.
          </p>
        </div>

        {/* Management Team Section */}
        <div className="visiting-consultants-container about-content">
          <h2
            className="text-2xl font-semibold text-green-700 mb-4"
            style={{ textAlign: "center" }}
          >
            Management Team
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Green Leaf Ayurveda Wellness Centres are unique and distinct. We
            have excellent facilities for rendering all kinds of treatments.
            Eminent doctors as well as trained paramedical staff provide maximum
            care to our customers. Our centers offer expert consultation
            services by experienced Ayurvedic doctors.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Treatments are available for various ailments like Arthritis,
            Rheumatoid Arthritis, Ulcers, Sinusitis, Skin diseases and other
            general illnesses. Our clinics are also unique storehouses of
            Ayurvedic Kashayas, Arishtas, Lehyas, Ghrithams, Choornams, and
            other authentic medicines.
          </p>
          <p className="text-gray-600 leading-relaxed mb-0">
            Green Leaf Ayurveda Wellness Centre offers Kerala specialty
            treatments like Panchakarma (Five-fold therapy), Oil massages,
            Rasayana Chiktsa, etc. The therapy centers are not meant for
            diseases alone, but for others too, who may benefit in many ways by
            nourishing the body, revitalizing the nervous system, overcoming
            fatigue, promoting sound sleep, improving complexion, enhancing
            immunity, and revitalizing the whole body.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
