import React, { useState, useEffect } from "react";
import "./Employees.css";
import EmployeeLogin from "./EmployeeLogin";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("directory");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    department: "",
    designation: "",
    status: "",
  });

  // ✅ Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.129:8080/api/employees/all/5/admin"
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // ✅ Filter employees by name
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // ✅ View employee details
  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setShowViewModal(true);
  };

  // ✅ Open Edit Modal
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setEditForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      department: emp.jobDetails?.department || "",
      designation: emp.jobDetails?.designation || emp.jobDetails?.jobTitle || "",
      status: emp.status || "",
    });
    setShowEditModal(true);
  };

  // ✅ Handle edit field changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save Edit (PUT request)
  const handleSaveEdit = async () => {
    if (!selectedEmployee) return;

    const updatedEmployee = {
      ...selectedEmployee,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      status: editForm.status,
      jobDetails: {
        ...selectedEmployee.jobDetails,
        department: editForm.department,
        designation: editForm.designation,
      },
    };

    setSaving(true);

    try {
      const url = `http://192.168.0.129:8080/api/employees/update/employee/${selectedEmployee.employeeId}/5/admin`;
      console.log("PUT URL:", url);
      console.log("Payload:", updatedEmployee);

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok)
        throw new Error(`Failed to update employee. Status: ${response.status}`);

      const savedEmployee = await response.json();

      // ✅ Update UI instantly
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.employeeId === savedEmployee.employeeId ? savedEmployee : emp
        )
      );

      setShowEditModal(false);
      alert("✅ Employee details updated successfully!");
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("❌ Failed to update employee. Please check backend or CORS settings.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Delete employee
  const handleDelete = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setEmployees((prev) =>
      prev.filter((e) => e.employeeId !== selectedEmployee.employeeId)
    );
    setShowDeleteConfirm(false);
  };

  return (
    <div className="page page-employees">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 className="emp-title">Employees</h2>
          <p className="emp-subtitle">Employee directory, profiles and actions.</p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setView("directory")}
            className={`subnav-btn ${view === "directory" ? "active" : ""}`}
          >
            Directory
          </button>
          <button
            onClick={() => setView("login")}
            className={`subnav-btn ${view === "login" ? "active" : ""}`}
          >
            Login Details
          </button>
        </div>
      </div>

      {/* Main Section */}
      {view === "login" ? (
        <div style={{ marginTop: 12 }}>
          <EmployeeLogin />
        </div>
      ) : loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading employees...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div>
          {/* Search Bar */}
          <div
            className="employee-actions"
            style={{
              marginTop: 12,
              marginBottom: 12,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              type="text"
              className="employee-search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 220 }}
            />
            
          </div>
          
          

          {/* Employee Table */}
          <div className="employee-table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeId}</td>
                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>{emp.jobDetails?.department || "—"}</td>
                      <td>
                        {emp.jobDetails?.designation ||
                          emp.jobDetails?.jobTitle ||
                          "—"}
                      </td>
                      <td>{emp.jobDetails?.joinDate || "—"}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            emp.status === "ACTIVE"
                              ? "active"
                              : emp.status === "INACTIVE"
                              ? "inactive"
                              : "onleave"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <button className="btn-view" onClick={() => handleView(emp)}>
                          View
                        </button>
                        <button className="btn-edit" onClick={() => handleEdit(emp)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(emp)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Employee Details</h3>
            <ul>
              <li>
                <strong>Name:</strong> {selectedEmployee.firstName}{" "}
                {selectedEmployee.lastName}
              </li>
              <li>
                <strong>Department:</strong>{" "}
                {selectedEmployee.jobDetails?.department}
              </li>
              <li>
                <strong>Designation:</strong>{" "}
                {selectedEmployee.jobDetails?.designation}
              </li>
              <li>
                <strong>Status:</strong> {selectedEmployee.status}
              </li>
            </ul>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Employee</h3>
            <div className="modal-form">
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="department"
                value={editForm.department}
                onChange={handleEditChange}
                placeholder="Department"
              />
              <input
                type="text"
                name="designation"
                value={editForm.designation}
                onChange={handleEditChange}
                placeholder="Designation"
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ON_LEAVE">On Leave</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSaveEdit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button className="btn-delete" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
