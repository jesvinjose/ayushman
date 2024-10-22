import React, { useEffect, useState } from "react";
import Kottackkal from "../../assets/images/png/footer_kottakkal_hov_bg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageHelper from "../../services/helper";
import { BaseURL } from "../../BaseUrl";

const Footer = () => {
  const [topservices, setTopServices] = useState([]);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/topservice/getalltopservices`
        );
        console.log(response.data); // Check the structure of the data
        setTopServices(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching topservices:", error);
      }
    };

    fetchTopServices();
  }, []);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/contactdetails/getcontacts`
        );
        if (response.data && response.data.length > 0) {
          setContacts(response.data[0]); // Assuming you need the first contact only
        } else {
          console.log("No contacts found");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-white">
      <div className="footer-container max-w-[1380px] mx-auto px-4 py-8">
        <ul className="footer-content-section flex flex-col md:flex-row justify-between px-0 space-y-8 md:space-y-0">
          {/* Logo and Contact Info Section */}
          <li className="footer-section-item space-y-4">
            <Link to="/">
              {contacts?.image ? (
                <ImageHelper
                  image={contacts.image}
                  size="80px"
                  width="80px"
                  className="w-24"
                />
              ) : (
                <p>Logo</p>
              )}
            </Link>

            <div className="footer-company-mail flex items-center space-x-2">
              <img
                src={`${BaseURL}/uploads/images/mail.svg`}
                alt="mail icon"
                className="h-6"
              />

              <Link
                to="mailto:${contacts.email}"
                className="text-gray-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contacts.email}
              </Link>
            </div>
            <div className="footer-social-media flex space-x-4">
              {contacts?.facebook ? (
                <Link
                  to={contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${BaseURL}/uploads/images/fb.svg`}
                    alt="facebook logo"
                    className="h-6"
                  />
                </Link>
              ) : null}

              {contacts?.twitter ? (
                <Link
                  to={contacts.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${BaseURL}/uploads/images/x.svg`}
                    alt="facebook logo"
                    className="h-6"
                  />
                </Link>
              ) : null}

              {contacts?.instagram ? (
                <Link
                  to={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${BaseURL}/uploads/images/ig.svg`}
                    alt="facebook logo"
                    className="h-6"
                  />
                </Link>
              ) : null}

              {contacts?.linkdin ? (
                <Link
                  to={contacts.linkdin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${BaseURL}/uploads/images/ln.svg`}
                    alt="facebook logo"
                    className="h-6"
                  />
                </Link>
              ) : null}
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
          © Copyright {new Date().getFullYear()} Green Leaf
          Ayurveda Wellness Centre{" "}
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
