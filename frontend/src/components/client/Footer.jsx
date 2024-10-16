import React, { useEffect, useState } from "react";
import Kottackkal from "../../assets/images/png/footer_kottakkal_hov_bg.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [topservices, setTopServices] = useState([]);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/topservice/getalltopservices"
        );
        console.log(response.data); // Check the structure of the data
        setTopServices(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching topservices:", error);
      }
    };

    fetchTopServices();
  }, []);

  return (
    <div className="bg-white">
      <div className="footer-container max-w-[1380px] mx-auto px-4 py-8">
        <ul className="footer-content-section flex flex-col md:flex-row justify-between px-0 space-y-8 md:space-y-0">
          {/* Logo and Contact Info Section */}
          <li className="footer-section-item space-y-4">
            <a href="/">
              <img
                src="http://www.ayushmanayurvedic.in/assets/images/svg/footer_logo.svg"
                alt="footer logo"
                className="h-10"
              />
            </a>
            <div className="footer-company-mail flex items-center space-x-2">
              <img
                src="http://www.ayushmanayurvedic.in/assets/images/svg/mail.svg"
                alt="mail icon"
                className="h-6"
              />
              <a
                href="mailto:info@ayushmanayurvedic.in"
                className="text-gray-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                info@ayushmanayurvedic.in
              </a>
            </div>
            <div className="footer-social-media flex space-x-4">
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
          </li>

          {/* Top Services Section */}
          <li className="footer-section-item">
            <ul className="footer-top-services space-y-2">
              <li className="top-services-item text-lg font-bold">
                Top Services
              </li>
              {topservices.map((topservice) => {
                return (
                  <li className="top-services-item">
                    <Link
                      to={`/treatment/${topservice.service}`}
                      className="text-gray-600 hover:text-blue-500"
                    >
                      {topservice.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Placeholder Section */}
          <li className="footer-section-item">
            <div className="footer-image-container">
              <img src={Kottackkal} alt="" />
            </div>
          </li>
        </ul>
      </div>

      {/* Copyright Section */}
      <div className="footer-copy-right bg-gray-100 py-4 text-center text-sm text-gray-500">
        <p>
          © Copyright {new Date().getFullYear()} Ayushman Ayurveda{" "}
          <span>|</span> Design:
          <Link
            to="https://dashing-naiad-4b4d23.netlify.app/"
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Jesvin Jose
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
