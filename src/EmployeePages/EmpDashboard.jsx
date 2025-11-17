import React, { useEffect, useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./EmpDashboard.css";

export default function EmpDashboard() {
  const [employee, setEmployee] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    ]).then(([emp, postsData]) => {
      setEmployee(emp);
      setPosts(postsData.filter((p) => p.userId === emp.id));
    });
  }, []);

  if (!employee) return <h2 className="loading">Loading...</h2>;

  // Mock metrics
  const attendance = 94; // %
  const projects = posts.length; // JSONPlaceholder posts = projects
  const performance = 89; // %
  const completedTasks = Math.floor(projects * 0.7);

  return (
    <div className="emp-container">

      {/* =================== HEADER =================== */}
      <div className="emp-header">
        <h2>Welcome, {employee.name}</h2>
        <p>{employee.company.name} • {employee.email}</p>
      </div>

      {/* =================== SUMMARY ROW =================== */}
      <div className="summary-row">
        
        <div className="summary-card">
          <h4>Attendance</h4>
          <p className="value">{attendance}%</p>
        </div>

        <div className="summary-card">
          <h4>Projects</h4>
          <p className="value">{projects}</p>
        </div>

        <div className="summary-card">
          <h4>Performance</h4>
          <p className="value">{performance}%</p>
        </div>

        <div className="summary-card">
          <h4>Tasks Completed</h4>
          <p className="value">{completedTasks}/{projects}</p>
        </div>

      </div>

      {/* =================== CHARTS ROW =================== */}
      <div className="charts-row">

        {/* Attendance Line */}
        <div className="chart-box small">
          <h3>Attendance</h3>
          <Line
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  label: "Attendance %",
                  data: [90, 95, 92, attendance],
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>

        {/* Projects Pie */}
        <div className="chart-box small">
          <h3>Projects</h3>
          <Doughnut
            data={{
              labels: ["Completed", "Remaining"],
              datasets: [
                {
                  data: [completedTasks, projects - completedTasks],
                  backgroundColor: ["#34d399", "#d1d5db"],
                },
              ],
            }}
          />
        </div>

        {/* Performance */}
        <div className="chart-box small">
          <h3>Performance</h3>
          <Doughnut
            data={{
              labels: ["Achieved", "Pending"],
              datasets: [
                {
                  data: [performance, 100 - performance],
                  backgroundColor: ["#60a5fa", "#e5e7eb"],
                },
              ],
            }}
          />
        </div>

        {/* Tasks Bar */}
        <div className="chart-box small">
          <h3>Tasks Completed</h3>
          <Bar
            data={{
              labels: ["Tasks"],
              datasets: [
                {
                  label: "Completed",
                  data: [completedTasks],
                  backgroundColor: "#fbbf24",
                },
                {
                  label: "Remaining",
                  data: [projects - completedTasks],
                  backgroundColor: "#e5e7eb",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>

      </div>
    </div>
  );
}
