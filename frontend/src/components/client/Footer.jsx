import React, { useEffect, useState } from "react";
import Kottackkal from "../../assets/images/png/footer_kottakkal_hov_bg.png";
<<<<<<< Updated upstream
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

=======
import ImageHelper from "../../services/helper";
import axios from "axios";


const Footer = () => {
  const [contacts, setContacts] = useState([])


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/contactdetails/getcontacts"
        );
        console.log(response.data[0],"my image");
        
        setContacts(response.data[0]);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);


>>>>>>> Stashed changes
  return (
    <div className="bg-white">
      <div className="footer-container max-w-[1380px] mx-auto px-4 py-8">
        <ul className="footer-content-section flex flex-col md:flex-row justify-between px-0 space-y-8 md:space-y-0">
          {/* Logo and Contact Info Section */}
          <li className="footer-section-item space-y-4">
            <a href="/">
              {/* <img
                src="http://www.ayushmanayurvedic.in/assets/images/svg/footer_logo.svg"
                alt="footer logo"
                className="h-10"
              /> */}
              <ImageHelper image={contacts.image} size="100px" 
              />
            </a>
            <div className="footer-company-mail flex items-center space-x-2">
              <img
                src="http://localhost:4000/uploads/images/mail.svg"
                alt="mail icon"
                className="h-6"
              />
              <a
                href="mailto:${contacts.email}"
                className="text-gray-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contacts.email}
              </a>
            </div>
            <div className="footer-social-media flex space-x-4">
              <a
                href={contacts.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="http://localhost:4000/uploads/images/fb.svg"
                  alt="facebook logo"
                  className="h-6"
                />
              </a>
              <a
                href={contacts.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="http://localhost:4000/uploads/images/x.svg"
                  alt="x logo"
                  className="h-6"
                />
              </a>
              <a
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="http://localhost:4000/uploads/images/ig.svg"
                  alt="instagram logo"
                  className="h-6"
                />
              </a>
              <a
                href={contacts.linkdin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="http://localhost:4000/uploads/images/ln.svg"
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
