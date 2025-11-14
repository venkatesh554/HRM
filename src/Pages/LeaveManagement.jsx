import React, { useState } from "react";
import styles from './leave.module.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const employeeLeaveData = [
  { id: 1, name: "Aarav Patel", department: "Engineering", leaveRecords: [{ from: "2025-11-01", to: "2025-11-03", type: "Casual", status: "Approved" }, { from: "2025-11-10", to: "2025-11-11", type: "Sick", status: "Pending" }] },
  { id: 2, name: "Meera Sharma", department: "HR", leaveRecords: [{ from: "2025-11-04", to: "2025-11-05", type: "Casual", status: "Approved" }] },
  { id: 3, name: "Rohan Gupta", department: "Design", leaveRecords: [{ from: "2025-11-07", to: "2025-11-09", type: "Sick", status: "Rejected" }, { from: "2025-11-15", to: "2025-11-15", type: "Casual", status: "Pending" }] },
  { id: 4, name: "Ishita Verma", department: "Finance", leaveRecords: [{ from: "2025-11-02", to: "2025-11-03", type: "Sick", status: "Approved" }] },
  { id: 5, name: "Karan Singh", department: "Engineering", leaveRecords: [{ from: "2025-11-08", to: "2025-11-09", type: "Casual", status: "Rejected" }] },
  { id: 6, name: "Simran Kaur", department: "Marketing", leaveRecords: [{ from: "2025-11-05", to: "2025-11-06", type: "Sick", status: "Approved" }] },
  { id: 7, name: "Devansh Rao", department: "Operations", leaveRecords: [{ from: "2025-11-01", to: "2025-11-02", type: "Casual", status: "Pending" }] },
];

const data = [
  { name: "Sick Leave", value: 40 },
  { name: "Casual Leave", value: 30 },
  { name: "Earned Leave", value: 30 },
];

const COLORS = [
  "url(#sickGradient)",
  "url(#casualGradient)",
  "url(#earnedGradient)",
];

const upcomingLeaves = [
  { name: "Ananya", from: "2025-11-07", to: "2025-11-09", type: "Casual Leave" },
  { name: "Rahul", from: "2025-11-08", to: "2025-11-08", type: "Sick Leave" },
  { name: "Priya", from: "2025-11-09", to: "2025-11-11", type: "Earned Leave" },
];


export default function LeaveManagement() {

  const [query, setQuery] = useState("");
  const [foundEmployee, setFoundEmployee] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = employeeLeaveData.find((emp) =>
      emp.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoundEmployee(match || "notfound");
  };

  const handleViewAll = () => {
    alert("Redirect to full HR Leave Management page!");
  };

  return (
    <div className={styles.container}>
      {/* Header + Search Section */}
      <div className={styles.headerRow}>
        <div className={styles.headerText}>
          <h2>Leave Management</h2>
          <p>Overview of employee leave requests and approvals</p>
        </div>

        <form onSubmit={handleSearch} className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search employee name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Search Result Section */}
      <div className={styles.results}>
        {foundEmployee === "notfound" ? (
          <p className={styles.noResult}>No employee found</p>
        ) : foundEmployee ? (
          <div className={styles.employeeCard}>
            <h3>
              {foundEmployee.name} <span>({foundEmployee.department})</span>
            </h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {foundEmployee.leaveRecords.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.from}</td>
                    <td>{record.to}</td>
                    <td>{record.type}</td>
                    <td
                      className={
                        record.status === "Approved"
                          ? styles.approved
                          : record.status === "Pending"
                            ? styles.pending
                            : styles.rejected
                      }
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>


      {/* 📊 Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h4>🧾 Total Requests</h4>
          <p>32</p>
          <span>This Month</span>
        </div>
        <div className={styles.card}>
          <h4>⏳ Pending</h4>
          <p>5</p>
          <span>Waiting for Approval</span>
        </div>
        <div className={styles.card}>
          <h4>✅ Approved</h4>
          <p>24</p>
          <span>Approved Leaves</span>
        </div>
        <div className={styles.card}>
          <h4>❌ Rejected</h4>
          <p>3</p>
          <span>Declined Requests</span>
        </div>
      </div>

      {/* 📈 Chart + 📆 Upcoming Leaves Row */}

      <div className={styles.chartLeavesWrapper}>
        <div className={styles.chartLeavesRow}>
          {/* ================== LEFT: LEAVE REQUESTS BY TYPE ================== */}
          <div className={styles.chartSection}>
            <h3>Leave Requests by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="sickGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff7e5f" />
                    <stop offset="100%" stopColor="#feb47b" />
                  </linearGradient>
                  <linearGradient id="casualGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#43cea2" />
                    <stop offset="100%" stopColor="#185a9d" />
                  </linearGradient>
                  <linearGradient id="earnedGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6a11cb" />
                    <stop offset="100%" stopColor="#2575fc" />
                  </linearGradient>
                </defs>

                <Pie
                  data={[
                    { name: "Sick Leave", value: 40 },
                    { name: "Casual Leave", value: 30 },
                    { name: "Earned Leave", value: 30 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  <Cell fill="url(#sickGradient)" />
                  <Cell fill="url(#casualGradient)" />
                  <Cell fill="url(#earnedGradient)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={`${styles.colorBox} ${styles.sick}`}></span> Sick Leave
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.colorBox} ${styles.casual}`}></span> Casual Leave
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.colorBox} ${styles.earned}`}></span> Earned Leave
              </div>
            </div>
          </div>

          {/* ================== RIGHT: UPCOMING LEAVES ================== */}
          <div className={styles.upcomingSection}>
            <h3>Upcoming Leaves</h3>
            <ul>
              <li>
                <strong>Ananya</strong> — 7 Nov to 9 Nov <br />
                <small>Casual Leave</small>
              </li>
              <li>
                <strong>Rahul</strong> — 8 Nov <br />
                <small>Sick Leave</small>
              </li>
              <li>
                <strong>Meera</strong> — 10 Nov to 11 Nov <br />
                <small>Earned Leave</small>
              </li>
              <li>
                <strong>Ravi</strong> — 12 Nov <br />
                <small>Casual Leave</small>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* 📋 Recent Leave Requests Table */}



      <div className={styles.recentRequestsSection}>
        <h3>Recent Leave Requests</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.leaveTable}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Varun Kumar</td>
                <td>3 Nov</td>
                <td>5 Nov</td>
                <td>Casual</td>
                <td><span className={styles.pending}>Pending</span></td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                  <button className={styles.rejectBtn}>Reject</button>
                </td>
              </tr>
              <tr>
                <td>Sneha R</td>
                <td>1 Nov</td>
                <td>2 Nov</td>
                <td>Sick</td>
                <td><span className={styles.approved}>Approved</span></td>
                <td>—</td>
              </tr>
              <tr>
                <td>Deepa</td>
                <td>4 Nov</td>
                <td>4 Nov</td>
                <td>Emergency</td>
                <td><span className={styles.rejected}>Rejected</span></td>
                <td>—</td>
              </tr>
              <tr>
                <td>Arjun Patel</td>
                <td>6 Nov</td>
                <td>7 Nov</td>
                <td>Casual</td>
                <td><span className={styles.pending}>Pending</span></td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                  <button className={styles.rejectBtn}>Reject</button>
                </td>
              </tr>
              <tr>
                <td>Meera</td>
                <td>9 Nov</td>
                <td>9 Nov</td>
                <td>Earned</td>
                <td><span className={styles.approved}>Approved</span></td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className={styles.viewAllContainer}>
          <button
            className={styles.viewAllBtn}
            onClick={() => alert("Redirect to full HR Leave Management page!")}
          >
            View All Requests →
          </button>
        </div>
      </div>



    </div>

  );
}



