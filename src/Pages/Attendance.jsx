import React, { useEffect, useState } from "react";
import styles from './attendance.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function Attendance() {

  const [employees, setEmployees] = useState([]);
  const [attendanceTrend, setAttendanceTrend] = useState([]);

  /*useEffect(() => {
    // Fetch fake employee data
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employee data:", err));
  }, []); */

  useEffect(() => {
    // employee data
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);

        // 30 days attendance data
        const trend = Array.from({ length: 30 }, (_, i) => {
          const presentCount = Math.floor(
            data.length * (0.75 + Math.random() * 0.25)
          );
          return {
            date: i + 1,
            attendance: presentCount,
          };
        });

        setAttendanceTrend(trend);
      })
      .catch((err) => console.error("Error fetching employee data:", err));
  }, []);

  const totalEmployees = employees.length;
  const presentToday = Math.floor(totalEmployees * 0.88);
  const absentToday = totalEmployees - presentToday;
  const avgCheckInTime = "9:42 AM";

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const attendanceData = {
    total: 12,
    present: 10,
    absent: 2,
    avgCheckIn: "9:42 AM",
  };

  // attendance data for the month
  const attendanceTrendData = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    attendance: Math.floor(80 + Math.random() * 20), // 80–100%
  }));
  const averageAttendance = (
    attendanceTrendData.reduce((sum, d) => sum + d.attendance, 0) /
    attendanceTrendData.length
  ).toFixed(1);

  // punctual and absentee data
  const topPunctual = employees.slice(0, 3).map((e, i) => ({
    name: e.name.split(" ")[0],
    time: ["9:00 AM", "9:05 AM", "9:08 AM"][i],
  }));

  const frequentAbsentees = employees.slice(3, 6).map((e, i) => ({
    name: e.name.split(" ")[0],
    days: [3, 2, 2][i],
  }));


  return (

    <div className={styles.attendanceSection}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.gradientTitle}>Attendance Overview</h2>
        <p>Track employee attendance, punctuality, and working hours.</p>
      </div>

      {/* Attendance Summary*/}
      <div className={styles.attendanceSummary}>
        <h2>{today}</h2>
        <div className={styles.attendanceGrid}>
          <div className={styles.attendanceCard}>
            <h4>Total Employees</h4>
            <p>{attendanceData.total}</p>
          </div>
          <div className={styles.attendanceCard}>
            <h4>Present Today</h4>
            <p>{attendanceData.present}</p>
          </div>
          <div className={styles.attendanceCard}>
            <h4>Absent Today</h4>
            <p>{attendanceData.absent}</p>
          </div>
          <div className={styles.attendanceCard}>
            <h4>Avg Log-In Time</h4>
            <p>{attendanceData.avgCheckIn}</p>
          </div>
        </div>
      </div>


      {/* Attendance Trends Chart */}
      <div className={styles.attendanceTrendsSection}>
        <h3>📈 Attendance Trends</h3>
        <p>Monthly overview of employee attendance</p>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fill: "#333" }} />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="attendance"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dafea4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#f254a8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Summary chart */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryBox}>
            <h4>Total Employees</h4>
            <p>{totalEmployees}</p>
          </div>
          <div className={styles.summaryBox}>
            <h4>Present Today</h4>
            <p>{presentToday}</p>
          </div>
          <div className={styles.summaryBox}>
            <h4>Absent Today</h4>
            <p>{absentToday}</p>
          </div>
          <div className={styles.summaryBox}>
            <h4>Avg Check-In</h4>
            <p>{avgCheckInTime}</p>
          </div>
        </div>
      </div>

      {/* Attendance Insights */}
      <div className={styles.attendanceInsights}>
        <div className={styles.insightCard}>
          <h4>🏅 Top 3 Most Punctual Employees</h4>
          <ul>
            {topPunctual.map((emp, idx) => (
              <li key={idx}>
                {emp.name} – <span>{emp.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.insightCard}>
          <h4>🚫 Frequent Absentees</h4>
          <ul>
            {frequentAbsentees.map((emp, idx) => (
              <li key={idx}>
                {emp.name} – <span>{emp.days} days</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Check-in Summary Table */}
      <div className={styles.dailyCheckinSection}>
        <h3>🕓 Daily Check-in Summary</h3>
        <table className={styles.checkinTable}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.slice(0, 5).map((emp, idx) => (
              <tr key={idx}>
                <td>{emp.name}</td>
                <td>{emp.company.bs.split(" ")[0]}</td>
                <td>{idx % 2 === 0 ? "9:15 AM" : "—"}</td>
                <td>{idx % 2 === 0 ? "6:00 PM" : "—"}</td>
                <td className={idx % 2 === 0 ? styles.present : styles.absent}>
                  {idx % 2 === 0 ? "Present" : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>




    </div>

  );
}
