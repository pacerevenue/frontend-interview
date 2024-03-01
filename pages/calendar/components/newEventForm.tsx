import React, { useState } from "react";
import { useSaveEvent } from "../hooks/useSaveEvent";

export const NewEventForm = ({ onClose }) => {
  const { saveEvent, loading } = useSaveEvent();

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = (e) => {
    e.preventDefault();

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveEvent(formData);
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      style={{
        zIndex: "100000",
        position: "absolute",
        left: "50vw",
        top: "50vh",
        transform: "translate(-50%, -50%)",
      }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
    >
      <label className="block mb-2 text-sm font-bold text-gray-600">
        Title:
      </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <label className="block mb-2 text-sm font-bold text-gray-600">
        Start:
      </label>
      <input
        type="text"
        name="start"
        value={formData.start}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <label className="block mb-2 text-sm font-bold text-gray-600">End:</label>
      <input
        type="text"
        name="end"
        value={formData.end}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save"}
      </button>
      <button
        onClick={handleClose}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 ml-2"
      >
        Close
      </button>
    </form>
  );
};
