import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import "./EmpProfile.css";

export default function EmpProfile() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  // --- Sample Data ---
  useEffect(() => {
    const sampleEmployees = [
      {
        empId: "EMP1001",
        name: "Niha Sharma",
        email: "niha.sharma@example.com",
        phone: "+91 9876543210",
        address: "Hyderabad, Telangana, India",
        gender: "Female",
        dob: "1999-04-12",
        department: "Development",
        designation: "Software Engineer",
        workEmail: "niha@gyantrix.in",
        employmentType: "Full-Time",
        startDate: "2023-07-18",
        contractDuration: "Permanent",
        bankName: "HDFC Bank",
        accountNumber: "XXXX XXXX 2345",
        ifsc: "HDFC0001234",
        payrollMode: "Bank Transfer",
        pan: "ABCPX1234D",
        uan: "100234567890",
        pfNo: "HYD/4567/2023",
        shift: "Morning (9 AM - 6 PM)",
        workType: "Hybrid",
        education: "B.Tech - Computer Science, Osmania University",
        skills: "Java, Spring Boot, React, MySQL",
        experience: "2 Years",
        manager: "Rohit Sharma",
        coach: "Priya Menon",
      },
      {
        empId: "EMP1002",
        name: "Arjun Mehta",
        email: "arjun.mehta@example.com",
        phone: "+91 9123456789",
        address: "Mumbai, Maharashtra, India",
        gender: "Male",
        dob: "1997-09-20",
        department: "Marketing",
        designation: "Marketing Executive",
        workEmail: "arjun@gyantrix.in",
        employmentType: "Contract",
        startDate: "2024-02-01",
        contractDuration: "1 Year",
        bankName: "ICICI Bank",
        accountNumber: "XXXX XXXX 7890",
        ifsc: "ICIC0009876",
        payrollMode: "Cheque",
        pan: "BNAPM2345Q",
        uan: "100678909876",
        pfNo: "MUM/5678/2023",
        shift: "Day Shift",
        workType: "On-site",
        education: "MBA - NMIMS",
        skills: "SEO, Digital Marketing, CRM, Content Writing",
        experience: "3 Years",
        manager: "Suman Rao",
        coach: "Anita Verma",
      },
    ];
    setEmployees(sampleEmployees);
  }, []);

  // --- Filter Logic ---
  const filteredEmployees = employees.filter(
    (emp) =>
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDept === "All" || emp.department === filterDept)
  );

  const handleInputChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updated = employees.map((emp) =>
      emp.empId === selectedEmployee.empId ? selectedEmployee : emp
    );
    setEmployees(updated);
    setIsEditing(false);
    alert("✅ Employee details updated successfully!");
  };

  const tabs = [
    ["personal", "Personal Info"],
    ["work", "Work Info"],
    ["contract", "Contract"],
    ["bank", "Bank Info"],
    ["payroll", "Payroll"],
    ["shift", "Work & Shift"],
    ["hr", "HR Settings"],
  ];

  const renderTabContent = () => {
    const e = selectedEmployee;
    const fields = {
      personal: [
        ["Name", "name"],
        ["Email", "email"],
        ["Phone", "phone"],
        ["Gender", "gender"],
        ["DOB", "dob"],
        ["Address", "address"],
      ],
      work: [
        ["Department", "department"],
        ["Designation", "designation"],
        ["Work Email", "workEmail"],
      ],
      contract: [
        ["Employment Type", "employmentType"],
        ["Start Date", "startDate"],
        ["Contract Duration", "contractDuration"],
      ],
      bank: [
        ["Bank Name", "bankName"],
        ["Account Number", "accountNumber"],
        ["IFSC Code", "ifsc"],
      ],
      payroll: [
        ["Payroll Mode", "payrollMode"],
        ["PAN", "pan"],
        ["UAN", "uan"],
        ["PF Number", "pfNo"],
      ],
      shift: [
        ["Work Type", "workType"],
        ["Shift", "shift"],
      ],
      hr: [
        ["Education", "education"],
        ["Skills", "skills"],
        ["Experience", "experience"],
        ["Manager", "manager"],
        ["Coach", "coach"],
      ],
    };

    return (
      <div className="modal-grid">
        {fields[activeTab].map(([label, key]) => (
          <div key={key}>
            <label>{label}</label>
            <input
              name={key}
              type="text"
              value={e[key] || ""}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="emp-profile-container">
      <div className="emp-profile-header">
        <h2>Employee Directory</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      {/* --- Employee Table --- */}
      <div className="emp-table-wrapper">
        <table className="emp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Manager</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.email}</td>
                  <td>{emp.manager}</td>
                  <td className="action-icons">
                    <FaEye
                      className="icon view-icon"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsEditing(false);
                        setActiveTab("personal");
                      }}
                    />
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsEditing(true);
                        setActiveTab("personal");
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Modal --- */}
      {selectedEmployee && (
        <div className="profile-modal">
          <div className="modal-content small-modal">
            <span
              className="close-btn"
              onClick={() => setSelectedEmployee(null)}
            >
              ✕
            </span>
            <h3>
              {isEditing
                ? `Edit ${selectedEmployee.name}'s Details`
                : `${selectedEmployee.name}'s Profile`}
            </h3>

            <div className="tabs">
              {tabs.map(([key, label]) => (
                <button
                  key={key}
                  className={activeTab === key ? "tab-active" : ""}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {renderTabContent()}

            {isEditing && (
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
