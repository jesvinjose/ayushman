import React, { useEffect, useState } from "react";
import careerBg from "../../assets/images/png/career-bg.png";
import greenLeaves from "../../assets/images/png/leaf.webp";
import axios from "axios";
import placeholderImage from "../../assets/images/png/no-vacancy.png"; // Update this path accordingly

function Career() {
  const [jobs, setJobs] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [noVacancies, setNoVacancies] = useState(false); // State for no vacancies message
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [newDesignation, setNewDesignation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/job/getjobs"
        );

        // Set the jobs data
        setJobs(response.data); // Assuming API returns an array of job objects

        // Filter for designations with vacancies > 0
        const filteredDesignations = response.data.filter(
          (job) => job.jobvacancies > 0
        );
        setDesignations(filteredDesignations); // Set the filtered designations

        // If no designations, set noVacancies state after a delay
        if (filteredDesignations.length === 0) {
          setTimeout(() => {
            setNoVacancies(true);
            setLoading(false);
          }, 2000); // Show no vacancies after 2 seconds
        } else {
          setLoading(false); // Data fetched successfully
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchJobs();
  }, []); // Run once on mount

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (newName && newEmail && newMobile && newResume && newDesignation) {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("email", newEmail);
      formData.append("mobile", newMobile);
      formData.append("resume", newResume);
      formData.append("designation", newDesignation);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/application/addapplication",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          // Application submission successful, show success message
          setIsSubmitted(true);

          // Clear the form
          setNewName("");
          setNewEmail("");
          setNewMobile("");
          setNewResume(null);
          setNewDesignation("");
        }
      } catch (error) {
        console.error("Error adding application:", error);
      }
    }
  };

  // Loading state UI
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div
      className="career-bg bg-cover bg-no-repeat object-cover"
      style={{
        backgroundImage: `url(${careerBg})`,
      }}
    >
      <div className="career-head-wrapper max-w-[1380px] border mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Career</h1>
        </div>

        {/* Conditional Rendering */}
        {noVacancies ? (
          <div className="h-[100vh]">
            <h2 className="text-3xl font-semibold text-green-700 m-4 text-center">
              Sorry No vacancies!
            </h2>
            <div className="flex justify-center items-center">
              <img
                src={placeholderImage}
                alt="No Vacancies"
                className="max-w-xs h-96 m-24"
              />
            </div>
          </div>
        ) : (
          <div className="visiting-consultants-container mb-0">
            <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">
              We are Hiring!
            </h2>

            {isSubmitted ? (
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                  Application Submitted Successfully!
                </h3>
                <p>Thank you for applying. We will get back to you soon.</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <form
                  onSubmit={handleAddApplication}
                  className="h-[70vh] w-full md:w-[50%] lg:w-[40%] flex flex-col items-center p-5 space-y-5 border-yellow-700"
                >
                  {/* Job Dropdown */}
                  <select
                    name="job"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-[80%] border border-black rounded-md p-2"
                    required
                  >
                    <option value="">Select Job</option>
                    {designations.map((job, index) => (
                      <option key={index} value={job._id}>
                        {job.designation}
                      </option>
                    ))}
                  </select>

                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-[80%] border border-black rounded-md p-2"
                    required
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-[80%] border border-black rounded-md p-2"
                    required
                  />

                  {/* Phone Number */}
                  <div className="w-[80%] flex space-x-2">
                    <select className="w-1/4 border border-black rounded-md p-2">
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="text"
                      name="phone_number"
                      placeholder="0000000000"
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      pattern="[6789][0-9]{9}"
                      maxLength="10"
                      className="w-3/4 border border-black rounded-md p-2"
                      required
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="w-[80%] flex flex-col">
                    <input
                      type="file"
                      name="resume"
                      onChange={(e) => setNewResume(e.target.files[0])}
                      className="mb-2"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Upload resume in PDF (max 2 MB)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-green-500 text-white w-[60%] py-2 rounded-md hover:bg-green-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Career;

