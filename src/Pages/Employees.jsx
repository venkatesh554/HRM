import React, { useState, useEffect } from "react";
import employeeData from "./emp.json";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    department: "",
    role: "",
    joiningDate: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setEmployees(employeeData);
    };
    fetchData();
  }, []);

  // Search filter
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Add new employee
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.department || !newEmployee.role) {
      alert("Please fill all fields!");
      return;
    }
    const newEmp = {
      ...newEmployee,
      id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
    };
    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
    resetNewEmployee();
  };

  const resetNewEmployee = () => {
    setNewEmployee({
      id: "",
      name: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "Active",
    });
  };

  // View employee
  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setShowViewModal(true);
  };

  // Edit employee
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setNewEmployee(emp);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp))
    );
    setShowEditModal(false);
    resetNewEmployee();
  };

  // Delete employee
  const handleDelete = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== selectedEmployee.id));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="page page-employees">
      <div className="employee-header">
        <div>
          <h2 className="emp-title">Employees</h2>
          <p className="emp-subtitle">Employee directory, profiles and actions.</p>
        </div>

        <div className="employee-actions">
          <input
            type="text"
            className="employee-search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-add" onClick={() => setShowAddModal(true)}>
            + Add Employee
          </button>
        </div>
      </div>

      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>{emp.joiningDate}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        emp.status === "Active"
                          ? "active"
                          : emp.status === "Inactive"
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

      {/* ADD / EDIT Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{showEditModal ? "Edit Employee" : "Add New Employee"}</h3>

            <div className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleChange}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newEmployee.role}
                onChange={handleChange}
              />
              <input
                type="date"
                name="joiningDate"
                value={newEmployee.joiningDate}
                onChange={handleChange}
              />
              <select
                name="status"
                value={newEmployee.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
              }}>
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={showEditModal ? handleSaveEdit : handleAddEmployee}
              >
                {showEditModal ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW Modal */}
      {showViewModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal view-modal">
            <h3>Employee Details</h3>
            <ul>
              <li><strong>ID:</strong> {selectedEmployee.id}</li>
              <li><strong>Name:</strong> {selectedEmployee.name}</li>
              <li><strong>Department:</strong> {selectedEmployee.department}</li>
              <li><strong>Role:</strong> {selectedEmployee.role}</li>
              <li><strong>Joining Date:</strong> {selectedEmployee.joiningDate}</li>
              <li><strong>Status:</strong> {selectedEmployee.status}</li>
            </ul>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE Confirmation */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove <b>{selectedEmployee?.name}</b>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
