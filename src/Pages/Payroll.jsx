import React, { useState, useEffect } from "react";
import employeeData from "./emp.json"
import "./Payroll.css";

export default function Payroll() {
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    // Add salary and totalPaid dynamically
    const dataWithSalary = employeeData.map((emp) => {
      const salary = generateRandomSalary(emp.department);
      const totalPaid = Math.round(salary * (Math.random() * 12)); // Random months paid
      return { ...emp, salary, totalPaid };
    });
    setPayroll(dataWithSalary);
  }, []);

  // Function to assign random salary ranges by department
  const generateRandomSalary = (department) => {
    switch (department.toLowerCase()) {
      case "engineering":
      case "development":
        return Math.floor(Math.random() * 20000) + 50000; // ₹50k–₹70k
      case "hr":
        return Math.floor(Math.random() * 10000) + 30000; // ₹30k–₹40k
      case "sales":
        return Math.floor(Math.random() * 15000) + 40000; // ₹40k–₹55k
      case "finance":
        return Math.floor(Math.random() * 10000) + 35000; // ₹35k–₹45k
      case "designer":
        return Math.floor(Math.random() * 15000) + 40000; // ₹40k–₹55k
      default:
        return Math.floor(Math.random() * 10000) + 25000;
    }
  };

  return (
    <div className="payroll-container">
      <h2>Employee Payroll Summary</h2>

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
          {payroll.map((emp) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
