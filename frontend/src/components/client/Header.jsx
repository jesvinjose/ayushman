import React, { useEffect, useState } from "react";
import dropdownArrow from "../../assets/images/svg/dropdown_arrow.svg";
import logo from "../../assets/images/svg/logo.svg";
import hamburgerIcon from "../../assets/images/png/hamburger_icon.png";
import closeIcon from "../../assets/images/png/close_icon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageHelper from "../../services/helper";
import { BaseURL } from "../../BaseUrl";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [treatments, setTreatments] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/api/contactdetails/getcontacts`
        );
        console.log(response.data[0], "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,");

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

  return (
    <div className="nav-wrapper bg-white shadow-md">
      <div className="nav-wrapper-content flex justify-between items-center p-4">
        {/* {contacts?.image ? ( */}
        <Link to="/">
          {contacts?.image ? (
            <ImageHelper
              image={contacts.image}
              size="80px"
              width="80px"
              className="w-24"
            />
          ) : (
            <p>logo</p>
          )}
        </Link>
        <ul
          className="nav-list hidden md:flex space-x-8"
          style={{ alignItems: "center" }}
        >
          <li className="nav-items">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-items relative">
            <div
              className="treatent-wrapper flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Link to="/therapies">Treatments</Link>
              <span>
                <img src={dropdownArrow} alt="arrow" />
              </span>
            </div>
            {/* Dropdown */}
            {isDropdownOpen && (
              <ul className="treatments-dropdown absolute top-10 bg-white shadow-lg p-4 grid grid-cols-2 gap-4 w-[500px]">
                {treatments.map((treatment) => {
                  return (
                    <li>
                      <button className="bg-green-300 text-white rounded-md hover:bg-green-900 transition w-full">
                        <Link to={`/treatment/${treatment._id}`}  onClick={() => setIsDropdownOpen(false)}>
                          {treatment.name}
                        </Link>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li className="nav-items">
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className="nav-items">
            <Link to="/career">Career</Link>
          </li>
          <li className="nav-items">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-items">
            <button className="book-appoinment-btn bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-800">
              <Link to="/booking">Book Appointment</Link>
            </button>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="hamburger-main-wrapper md:hidden">
          <div
            className="hamburger-wrapper cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={hamburgerIcon} alt="hamburger icon" />
          </div>

          {/* Mobile Menu List */}
          {isMenuOpen && (
            <ul
              className="nav-list-mob bg-white shadow-lg p-4 space-y-4 absolute top-16 right-0 w-64"
              id="navListMob"
            >
              <li className="nav-close-mob-li flex justify-end">
                <div
                  className="nav-close-icon cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={closeIcon} alt="close icon" />
                </div>
              </li>
              <li className="nav-items-mob">
                {/* <a href="https://www.ayushmanayurvedic.in/about">About</a> */}
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li className="nav-items-mob">
                <div
                  className="treatent-wrapper flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {/* <p>Treatments</p> */}
                  <Link to="/therapies" onClick={() => setIsMenuOpen(false)}>
                    Treatments
                  </Link>
                  <span>
                    <img src={dropdownArrow} alt="arrow" />
                  </span>
                </div>
                {isDropdownOpen && (
                  <ul className="treatments-dropdown-mob bg-gray-100 p-2">
                    {treatments.map((treatment) => {
                      return (
                        <li>
                          <button
                            className="bg-green-300 text-white rounded-md hover:bg-green-900 transition w-full"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Link to={`/treatment/${treatment._id}`}>
                              {treatment.name}
                            </Link>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li className="nav-items-mob">
                <Link to="/doctors" onClick={() => setIsMenuOpen(false)}>
                  Doctors
                </Link>
              </li>
              <li className="nav-items-mob">
                <Link to="/career" onClick={() => setIsMenuOpen(false)}>
                  Career
                </Link>
              </li>
              <li className="nav-items-mob">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className="nav-items-mob">
                <button className="book-appoinment-btn bg-blue-500 text-white px-4 py-2 rounded-md">
                  <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                    Book Appointment
                  </Link>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
