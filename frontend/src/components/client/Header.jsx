import React, { useState } from "react";
import dropdownArrow from "../../assets/images/svg/dropdown_arrow.svg";
import logo from "../../assets/images/svg/logo.svg";
import hamburgerIcon from "../../assets/images/png/hamburger_icon.png";
import closeIcon from "../../assets/images/png/close_icon.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="nav-wrapper bg-white shadow-md">
      <div className="nav-wrapper-content flex justify-between items-center p-4">
        {/* <a href="https://www.ayushmanayurvedic.in">
          <img src={logo} alt="logo" className="w-24" />
        </a> */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-24" />
        </Link>
        <ul
          className="nav-list hidden md:flex space-x-8"
          style={{ alignItems: "center" }}
        >
          <li className="nav-items">
            {/* <a href="https://www.ayushmanayurvedic.in/about">About</a> */}
            <Link to="/about">About</Link>
          </li>
          <li className="nav-items relative">
            <div
              className="treatent-wrapper flex items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* <a href="/treatment" className="mr-1">
                Treatments
              </a> */}
              <Link to="/therapies">Treatments</Link>
              <span>
                <img src={dropdownArrow} alt="arrow" />
              </span>
            </div>
            {/* Dropdown */}
            {/* {isDropdownOpen && (
              <ul className="treatments-dropdown absolute top-10 bg-white shadow-lg p-2 space-y-2">
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/panchakarma">
                    Panchakarma
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
              </ul>
            )} */}
            {isDropdownOpen && (
              <ul className="treatments-dropdown absolute top-10 bg-white shadow-lg p-4 grid grid-cols-2 gap-4 w-[500px]">
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/panchakarma">
                    Panchakarma
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                    Abhyangam
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/shirodhara">
                    Shirodhara
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/beauty-therapy">
                    Beauty Therapy
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/pizhichil">
                    Pizhichil
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/njavarakizhi">
                    Njavara Kizhi
                  </a>
                </li>
                <li>
                  <a href="https://www.ayushmanayurvedic.in/treatment/nasya">
                    Nasya
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-items">
            {/* <a href="https://www.ayushmanayurvedic.in/doctors">Doctors</a> */}
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className="nav-items">
            {/* <a href="https://www.ayushmanayurvedic.in/career">Career</a> */}
            <Link to="/career">Career</Link>
          </li>
          <li className="nav-items">
            {/* <a href="https://www.ayushmanayurvedic.in/contact-us">Contact</a> */}
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
                <Link to="/about">About</Link>
              </li>
              <li className="nav-items-mob">
                <div
                  className="treatent-wrapper flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {/* <p>Treatments</p> */}
                  <Link to="/treatments">Treatments</Link>
                  <span>
                    <img src={dropdownArrow} alt="arrow" />
                  </span>
                </div>
                {isDropdownOpen && (
                  <ul className="treatments-dropdown-mob bg-gray-100 p-2">
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/panchakarma">
                        Panchakarma
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/abhyangam">
                        Abhyangam
                      </a>
                    </li>
                    {/* Add other treatments */}
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/shirodhara">
                        Shirodhara
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/beauty-therapy">
                        Beauty Therapy
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/pizhichil">
                        Pizhichil
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/njavarakizhi">
                        Njavara Kizhi
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ayushmanayurvedic.in/treatment/nasya">
                        Nasya
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-items-mob">
                {/* <a href="https://www.ayushmanayurvedic.in/doctors">Doctors</a> */}
                <Link to="/doctors">Doctors</Link>
              </li>
              <li className="nav-items-mob">
                {/* <a href="https://www.ayushmanayurvedic.in/career">Career</a> */}
                <Link to="/career">Career</Link>
              </li>
              <li className="nav-items-mob">
                {/* <a href="https://www.ayushmanayurvedic.in/contact-us">
                  Contact
                </a> */}
                <Link to="/contact">Contact</Link>
              </li>
              <li className="nav-items-mob">
                <button className="book-appoinment-btn bg-blue-500 text-white px-4 py-2 rounded-md">
                  <Link to="/booking">Book Appointment</Link>
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
