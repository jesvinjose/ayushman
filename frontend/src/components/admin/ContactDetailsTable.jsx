"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ImageHelper from "../../services/helper";

const ContactDetailsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newTwitter, setNewTwitter] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newLinkdin, setNewLinkdin] = useState("");
  const [newImage, setNewImage] = useState(null);
//   const [newBigImage, setNewBigImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentContacts, setCurrentContacts] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/contactdetails/getcontacts"
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleImageUpload = (e) => {
    setNewImage(e.target.files[0]);
  };

//   const handleBigImageUpload = (e) => {
//     setNewTreatmentBigImage(e.target.files[0]);
//   };

  const handleAddContacts = async () => {
    console.log(newEmail,"My email");
    console.log(newInstagram,"My Instagram");

    console.log(newTwitter,"My Twitter");
    console.log(newFacebook,"My Facebook");
    console.log(newLinkdin,"My Linkdin");
    console.log(newImage,"my image");
    



    
    // setShowEditForm(false);
    if (
      newEmail &&
      newInstagram &&
      newTwitter &&
      newFacebook &&
      newLinkdin &&
      newImage 
      
    ) {
      const formData = new FormData();
      formData.append("email", newEmail);
      formData.append("instagram", newInstagram);
      formData.append("twitter", newTwitter);
      formData.append("facebook", newFacebook);
      formData.append("linkdin", newLinkdin);
      formData.append("image", newImage);
    
      try {
        const response = await axios.post(
          "http://localhost:4000/api/contactdetails/addDetails",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedcontacts = response.data.contactDetails;

          setContacts([...contacts, addedcontacts ]);
          setNewEmail("");
          setNewInstagram("");
          setNewTwitter("");
          setNewLinkdin("");
          setNewImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding contacts:", error);
      }
    } else {
      alert("Add the required fields: email, instagram, linkdin, twitter and image");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/contactdetails/deletecontact/${id}`
      );
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  const handleCancel = () => {
    setCurrentContacts(null);
    setShowEditForm(false);
    setNewEmail("");
    setNewFacebook("");
    setNewInstagram("");
    setNewLinkdin("");
    setNewImage(null);
  };

  const handleEdit = (contact) => {
    setCurrentContacts(contact); // Set the current treatment to be edited
    setNewEmail(contact.email);
    setNewInstagram(contact.instagram); // Initialize with the current name
    setNewFacebook(contact.twitter)
    setNewLinkdin(contact.linkdin)
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateContacts = async () => {
    try {
      if (currentContacts) {
        const formData = new FormData();
        formData.append("email", newEmail);
        formData.append("facebook", newFacebook);
        formData.append("instagram", newInstagram);
        formData.append("twitter", newTwitter);
        formData.append("linkdin", newLinkdin);

     
        if (newImage) {
          formData.append("image", newImage);
        }
        // if (newTreatmentBigImage) {
        //   formData.append("bigImage", newTreatmentBigImage);
        // }
        const response = await axios.put(
          `http://localhost:4000/api/contactdetails/updatecontacts/${currentContacts._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          const updatedContacts = response.data.contactDetails;

          setContacts(
            contacts.map((contact) =>
              contact._id === updatedContacts._id
                ? updatedContacts
                : contact
            )
          );

          setCurrentContacts(null); // Clear the current consultant state
          setShowEditForm(false); // Hide the edit form
          setNewEmail("");
          setNewInstagram("");
          setNewLinkdin("");
          setNewTwitter("");
          setNewImage(null);
        }
      }
    } catch (error) {
      console.error("Error updating contacts:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contacts</h2>
       {contacts.length<1 ?  <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm   ? "Cancel" : "Add Contacts"}
        </button> : <p></p>
       }
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add Contacts</h3>
          <input
            type="text"
            placeholder="Treatment Name"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Treatment Name"
            value={newInstagram}
            onChange={(e) => setNewInstagram(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Treatment Name"
            value={newTwitter}
            onChange={(e) => setNewTwitter(e.target.value)}
            className="border p-2 w-full mb-4"
          />
           <input
            type="text"
            placeholder="Treatment Name"
            value={newFacebook}
            onChange={(e) => setNewFacebook(e.target.value)}
            className="border p-2 w-full mb-4"
          />
           <input
            type="text"
            placeholder="Treatment Name"
            value={newLinkdin}
            onChange={(e) => setNewLinkdin(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          {/* <ReactQuill
            value={newTreatmentDescription}
            onChange={setNewTreatmentDescription}
            className="mb-4"
            placeholder="Enter treatment description..."
          /> */}
          {/* <ReactQuill
            value={newTreatmentBigDescription}
            onChange={setNewTreatmentBigDescription}
            className="mb-4"
            placeholder="Enter bigTreatment description..."
          /> */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          {/* <label className="block mb-2">Upload Big Image:</label>
          <input
            type="file"
            onChange={handleBigImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          /> */}
          <button
            onClick={handleAddContacts}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Treatment
          </button>
        </div>
      )}

      {showEditForm && currentContacts && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Contacts</h3>
          <input
            type="text"
            placeholder="E-mail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Facebook"
            value={newFacebook}
            onChange={(e) => setNewFacebook(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Instagram"
            value={newInstagram}
            onChange={(e) => setNewInstagram(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Twitter"
            value={newTwitter}
            onChange={(e) => setNewTwitter(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={newLinkdin}
            onChange={(e) => setNewLinkdin(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          {/* <ReactQuill
            value={newTreatmentDescription}
            placeholder={currentTreatment.description}
            onChange={setNewTreatmentDescription} // Directly use the state setter function
            className="border p-2 w-full mb-4"
          /> */}
          {/* <ReactQuill
            value={newTreatmentBigDescription}
            placeholder={currentTreatment.bigDescription}
            onChange={setNewTreatmentBigDescription} // Directly use the state setter function
            className="border p-2 w-full mb-4"
          /> */}
          <label className="block mb-2">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          {/* <label className="block mb-2">Upload Big Image:</label>
          <input
            type="file"
            onChange={handleBigImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          /> */}
          <button
            onClick={handleUpdateContacts}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Contacts
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 my-2 sm:my-0 sm:ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
          <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">E-mail</th>
            <th className="border px-4 py-2 text-left">Instagram</th>
            <th className="border px-4 py-2 text-left">Facebook</th>
            <th className="border px-4 py-2 text-left">Linkdin</th>
            <th className="border px-4 py-2 text-left">Twitter</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="border px-4 py-2">
                <ImageHelper size="200px" image={contact.image} />
              </td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.instagram}</td>
              <td className="border px-4 py-2">{contact.facebook}</td>
              <td className="border px-4 py-2">{contact.linkdin}</td>
              <td className="border px-4 py-2">{contact.twitter}</td>


              {/* <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{ __html: treatment.description }}
              /> */}
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDetailsTable;
