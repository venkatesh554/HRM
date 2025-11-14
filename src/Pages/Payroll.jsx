import React, { useState, useEffect } from "react";
import employeeData from "./emp.json";
import "./Payroll.css";

export default function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    id: "",
    name: "",
    department: "",
    role: "",
    joiningDate: "",
    status: "Active",
    salary: "",
    totalPaid: "",
  });

  const generatePayrollData = () => {
    const dataWithSalary = employeeData.map((emp) => {
      const salary = generateRandomSalary(emp.department);
      const totalPaid = Math.round(salary * (Math.random() * 12));
      return { ...emp, salary, totalPaid };
    });
    setPayroll(dataWithSalary);
  };

  useEffect(() => {
    generatePayrollData();
  }, []);

  const generateRandomSalary = (department) => {
    switch (department.toLowerCase()) {
      case "engineering":
      case "development":
        return Math.floor(Math.random() * 20000) + 50000;
      case "hr":
        return Math.floor(Math.random() * 10000) + 30000;
      case "sales":
        return Math.floor(Math.random() * 15000) + 40000;
      case "finance":
        return Math.floor(Math.random() * 10000) + 35000;
      case "designer":
        return Math.floor(Math.random() * 15000) + 40000;
      default:
        return Math.floor(Math.random() * 10000) + 25000;
    }
  };

  // 🔍 Search
  const filteredPayroll = payroll.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ➕ Add new employee
  const handleAddPayroll = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...newEmp,
      id: `EMP${(payroll.length + 1).toString().padStart(3, "0")}`,
      salary: Number(newEmp.salary),
      totalPaid: Number(newEmp.totalPaid),
    };
    setPayroll([...payroll, newEmployee]);
    setNewEmp({
      id: "",
      name: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "Active",
      salary: "",
      totalPaid: "",
    });
    setShowForm(false);
  };

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <h2>Employee Payroll Summary</h2>

        <div className="payroll-actions">
          <input
            type="text"
            placeholder="🔍 Search by name or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="payroll-search"
          />

          <div className="action-buttons">
            <button className="generate-btn" onClick={generatePayrollData}>
              ⚙️ Generate Payroll
            </button>
            <button
              className="add-btn"
              onClick={() => setShowForm((prev) => !prev)}
            >
              ➕ Add Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Add Payroll Form */}
      {showForm && (
        <form className="add-form" onSubmit={handleAddPayroll}>
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmp.name}
            onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmp.department}
            onChange={(e) =>
              setNewEmp({ ...newEmp, department: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={newEmp.role}
            onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
            required
          />
          <input
            type="date"
            value={newEmp.joiningDate}
            onChange={(e) =>
              setNewEmp({ ...newEmp, joiningDate: e.target.value })
            }
            required
          />
          <select
            value={newEmp.status}
            onChange={(e) => setNewEmp({ ...newEmp, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            type="number"
            placeholder="Monthly Salary (₹)"
            value={newEmp.salary}
            onChange={(e) => setNewEmp({ ...newEmp, salary: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Total Paid This Year (₹)"
            value={newEmp.totalPaid}
            onChange={(e) =>
              setNewEmp({ ...newEmp, totalPaid: e.target.value })
            }
            required
          />
          <button type="submit" className="save-btn">
            ✅ Save
          </button>
        </form>
      )}

      {/* Payroll Table */}
      <table className="payroll-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Monthly Salary (₹)</th>
            <th>Total Paid This Year (₹)</th>
          </tr>
        </thead>

        <tbody>
          {filteredPayroll.length > 0 ? (
            filteredPayroll.map((emp) => (
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
                        : emp.status === "On Leave"
                        ? "leave"
                        : "inactive"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td>₹ {emp.salary.toLocaleString("en-IN")}</td>
                <td>₹ {emp.totalPaid.toLocaleString("en-IN")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-results">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
