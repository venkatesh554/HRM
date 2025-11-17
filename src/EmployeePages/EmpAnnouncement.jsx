<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./EmpAnnouncement.css";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // sample data
    const sample = [
      {
        id: 1,
        title: "Diwali Holiday Announcement",
        message:
          "Office will remain closed on 1st November for Diwali celebrations.",
        department: "All",
        category: "Holiday",
        startDate: "2025-10-28",
        endDate: "2025-11-01",
        postedBy: "HR Admin",
      },
      {
        id: 2,
        title: "New Leave Policy Update",
        message:
          "The updated leave policy is now available. Please review in HR Portal.",
        department: "All",
        category: "Policy",
        startDate: "2025-11-05",
        endDate: "2025-11-30",
        postedBy: "HR Admin",
      },
    ];
    setAnnouncements(sample);
  }, []);

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      filterDept === "All" || a.department === filterDept;
    const matchesCat =
      filterCategory === "All" || a.category === filterCategory;
    return matchesSearch && matchesDept && matchesCat;
  });

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedAnnouncement({
      id: null,
      title: "",
      message: "",
      department: "All",
      category: "General",
      startDate: "",
      endDate: "",
      postedBy: "HR Admin",
    });
    setShowModal(true);
  };

  const handleEdit = (a) => {
    setIsEditing(true);
    setSelectedAnnouncement(a);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  const handleSave = () => {
    if (
      !selectedAnnouncement.title ||
      !selectedAnnouncement.message ||
      !selectedAnnouncement.startDate ||
      !selectedAnnouncement.endDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === selectedAnnouncement.id ? selectedAnnouncement : a
        )
      );
      alert("✅ Announcement updated successfully!");
    } else {
      const newId = announcements.length
        ? announcements[announcements.length - 1].id + 1
        : 1;
      setAnnouncements([
        ...announcements,
        { ...selectedAnnouncement, id: newId },
      ]);
      alert("✅ Announcement added successfully!");
    }
    setShowModal(false);
  };

  return (
    <div className="announcement-container">
      <div className="announcement-header">
        <h2>HR Announcements</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Development">Development</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Holiday">Holiday</option>
            <option value="Policy">Policy</option>
            <option value="Event">Event</option>
          </select>
          <button className="add-btn" onClick={handleAdd}>
            <FaPlus /> Add Announcement
          </button>
        </div>
      </div>

      <div className="announcement-table-wrapper">
        <table className="announcement-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Department</th>
              <th>Start</th>
              <th>End</th>
              <th>Posted By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.category}</td>
                  <td>{a.department}</td>
                  <td>{a.startDate}</td>
                  <td>{a.endDate}</td>
                  <td>{a.postedBy}</td>
                  <td className="action-icons">
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEdit(a)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDelete(a.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="announcement-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </span>
            <h3>
              {isEditing
                ? "Edit Announcement"
                : "Add New Announcement"}
            </h3>
            <div className="modal-grid">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={selectedAnnouncement.title}
                  onChange={(e) =>
                    setSelectedAnnouncement({
                      ...selectedAnnouncement,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  value={selectedAnnouncement.category}
                  onChange={(e) =>
                    setSelectedAnnouncement({
                      ...selectedAnnouncement,
                      category: e.target.value,
                    })
                  }
                >
                  <option>General</option>
                  <option>Holiday</option>
                  <option>Policy</option>
                  <option>Event</option>
                </select>
              </div>
              <div>
                <label>Department</label>
                <select
                  value={selectedAnnouncement.department}
                  onChange={(e) =>
                    setSelectedAnnouncement({
                      ...selectedAnnouncement,
                      department: e.target.value,
                    })
                  }
                >
                  <option>All</option>
                  <option>HR</option>
                  <option>Development</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  value={selectedAnnouncement.startDate}
                  onChange={(e) =>
                    setSelectedAnnouncement({
                      ...selectedAnnouncement,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>End Date</label>
                <input
                  type="date"
                  value={selectedAnnouncement.endDate}
                  onChange={(e) =>
                    setSelectedAnnouncement({
                      ...selectedAnnouncement,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-message">
              <label>Message</label>
              <textarea
                rows="4"
                value={selectedAnnouncement.message}
                onChange={(e) =>
                  setSelectedAnnouncement({
                    ...selectedAnnouncement,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <button className="save-btn" onClick={handleSave}>
              {isEditing ? "Update" : "Add"} Announcement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
=======
import React from 'react';


export default function EmpAnnouncement() {


  return (
    <div>EmpAnnouncement</div>
  )
}
>>>>>>> 7d5c5e5f565e0bdbef21473502ed27520b15afa4
