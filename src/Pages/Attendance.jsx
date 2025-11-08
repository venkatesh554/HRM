import React from 'react';
import styles from './attendance.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";



export default function Attendance() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todaySummary = {
    login: "09:25 AM",
    logout: "06:10 PM",
    hours: "8h 45m",
  };

  const attendanceData = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 6.5 },
    { day: "Fri", hours: 9 },
  ];

  const attendanceHistory = [
    { date: "2025-11-01", in: "09:20 AM", out: "06:15 PM", hours: "8h 55m", status: "Present" },
    { date: "2025-11-02", in: "—", out: "—", hours: "—", status: "Absent" },
    { date: "2025-11-03", in: "09:35 AM", out: "06:00 PM", hours: "8h 25m", status: "Present" },
    { date: "2025-11-04", in: "09:40 AM", out: "02:00 PM", hours: "4h 20m", status: "Half Day" },
    { date: "2025-11-05", in: "—", out: "—", hours: "—", status: "Leave" },
  ];

  // weekly attendance percentage
   const weeklyPercent = 85;
  const pieData = [
    { name: "Present", value: 70 },
    { name: "Half Day", value: 10 },
    { name: "Absent", value: 20 },
  ];
  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.summaryCard}>
        <h2>{today}</h2>
        <div className={styles.summaryGrid}>
          <div className={styles.subCard}>
            <h4>Login Time</h4>
            <p>{todaySummary.login}</p>
          </div>
          <div className={styles.subCard}>
            <h4>Logout Time</h4>
            <p>{todaySummary.logout}</p>
          </div>
          <div className={styles.subCard}>
            <h4>Work Hours</h4>
            <p>{todaySummary.hours}</p>
          </div>
        </div>
      </div>

      {/* Graph + Weekly % */}
      <div className={styles.graphRow}>
        <div className={styles.graphSection}>
          <h3>Attendance Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 9]} />
              <Tooltip />
              <Bar dataKey="hours" fill="url(#colorGradient)" radius={[10, 10, 0, 0]}>
                <LabelList dataKey="hours" position="top" fill="#333" />
              </Bar>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="5%" stopColor="#6a11cb" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#2575fc" stopOpacity={0.9} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.pieCard}>
          <h3>Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={styles.percentLabel}>{weeklyPercent}%</div>

          <div className={styles.legendBox}>
            <div><span className={`${styles.legend} ${styles.present}`}></span> Present</div>
            <div><span className={`${styles.legend} ${styles.half}`}></span> Half Day</div>
            <div><span className={`${styles.legend} ${styles.absent}`}></span> Absent</div>
          </div>
          <p className={styles.absentNote}>You were absent for 1 day this week.</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className={styles.tableSection}>
        <h3>Attendance History</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.in}</td>
                  <td>{item.out}</td>
                  <td>{item.hours}</td>
                  <td>
                    <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
