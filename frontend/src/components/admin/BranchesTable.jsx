"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import ImageHelper from "../../services/helper";
import "mapbox-gl/dist/mapbox-gl.css";

const BranchTable = () => {
  const [branch, setBranch] = useState([]);
  const [newBranch, setNewBranch] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newBranchImage, setNewBranchImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [location, setLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  }); // default location
  const [zoom, setZoom] = useState(8);

  // Mapbox map and marker references
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/branch/getbranch"
        );
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranch();
  }, []);

  // Initialize map when the component is mounted or when form state changes
  useEffect(() => {
    if (mapContainer.current) {
      // Clear previous map instance if exists
      if (map.current) {
        map.current.remove();
      }

      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

      // Initialize the new map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [location.longitude, location.latitude],
        zoom: zoom,
      });

      marker.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);

      marker.current.on("dragend", () => {
        const lngLat = marker.current.getLngLat();
        setLocation({
          latitude: lngLat.lat.toFixed(4),
          longitude: lngLat.lng.toFixed(4),
        });
      });

      map.current.on("move", () => {
        setZoom(map.current.getZoom().toFixed(2));
      });
    }

    // Cleanup on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [showAddForm, showEditForm, location.latitude, location.longitude]);

  // Handle image upload
  const handleImageUpload = (e) => {
    setNewBranchImage(e.target.files[0]);
  };

  // Add new branch
  const handleAddBranch = async () => {
    if (
      newBranch &&
      newMobile &&
      newBranchImage &&
      location.latitude &&
      location.longitude
    ) {
      const formData = new FormData();
      formData.append("place", newBranch);
      formData.append("mobile", newMobile);
      formData.append("image", newBranchImage);
      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/branch/addbranch",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedBranch = response.data.branch;
          setBranch([...branch, addedBranch]);
          setNewBranch("");
          setNewMobile("");
          setNewBranchImage(null);
          setLocation({ latitude: 14.35, longitude: 77.9 }); // Reset location
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding branch:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleUpdateBranch = async () => {
    if (currentBranch) {
      const formData = new FormData();
      formData.append("place", newBranch || currentBranch.place);
      formData.append("mobile", newMobile || currentBranch.mobile);
      formData.append("latitude", location.latitude); // Latitude should be included here
      formData.append("longitude", location.longitude); // Longitude should be included here
      if (newBranchImage) {
        formData.append("image", newBranchImage);
      }

      console.log("Payload before sending: ", formData);

      try {
        const response = await axios.put(
          `http://localhost:4000/api/branch/updatebranch/${currentBranch._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedBranch = response.data.branch;
          setBranch(
            branch.map((b) => (b._id === updatedBranch._id ? updatedBranch : b))
          );
          setCurrentBranch(null);
          setShowEditForm(false);
          setNewBranch("");
          setNewMobile("");
          setNewBranchImage(null);
        }
      } catch (error) {
        console.error("Error updating branch:", error);
      }
    }
  };

  // Cancel action
  const handleCancel = () => {
    setCurrentBranch(null);
    setShowEditForm(false);
    setNewBranch("");
    setNewMobile("");
    setNewBranchImage(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/branch/deletebranch/${id}`);
      setBranch(branch.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Branch</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false); // Reset edit form if switching to add
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Branch"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Branch</h3>
          <input
            type="text"
            placeholder="Branch Name"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={newMobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setNewMobile(value);
              }
            }}
            className="border p-2 w-full mb-4"
            inputMode="numeric"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />

          <div ref={mapContainer} style={{ height: "300px", width: "100%" }} />
          <div>
            Longitude: {location.longitude} | Latitude: {location.latitude} |
            Zoom: {zoom}
          </div>

          <button
            onClick={handleAddBranch}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Branch
          </button>
        </div>
      )}

      {showEditForm && currentBranch && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Branch</h3>
          <input
            type="text"
            placeholder="Branch Name"
            value={newBranch || currentBranch.place}
            onChange={(e) => setNewBranch(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={newMobile || currentBranch.mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setNewMobile(value);
              }
            }}
            className="border p-2 w-full mb-4"
            inputMode="numeric"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />

          <div ref={mapContainer} style={{ height: "300px", width: "100%" }} />
          <div>
            Longitude: {location.longitude} | Latitude: {location.latitude} |
            Zoom: {zoom}
          </div>

          <button
            onClick={handleUpdateBranch}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Update Branch
          </button>
          <button
            onClick={handleCancel}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full text-left bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Branch Name</th>
            <th className="py-2 px-4 border-b">Branch Image</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branch.map((b) => (
            <tr key={b._id}>
              <td className="py-2 px-4 border-b">{b.place}</td>
              <td className="border-b p-4">
                {b.image ? (
                  <ImageHelper size="200px" image={b.image} />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="py-2 px-4 border-b">{b.mobile}</td>

              <td className="py-2 px-4 border-b">
                Lat: {b.latitude}, Lng: {b.longitude}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setShowEditForm(true);
                    setShowAddForm(false); // Hide add form if switching to edit
                    setCurrentBranch(b);
                    setLocation({
                      latitude: b.latitude,
                      longitude: b.longitude,
                    });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
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

export default BranchTable;
