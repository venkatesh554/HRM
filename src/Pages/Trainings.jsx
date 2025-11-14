import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Trainings.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Training() {
  // --- Summary Cards ---
  const summaryCards = [
    { title: "Active Trainings", value: 8, color: "#3949ab" },
    { title: "Completed Trainings", value: 24, color: "#43a047" },
    { title: "Upcoming Trainings", value: 5, color: "#fb8c00" },
    { title: "Trainers", value: 6, color: "#1e88e5" },
  ];

  // --- Bar Chart: Training Completion Rate by Department ---
  const barData = {
    labels: ["HR", "IT", "Finance", "Sales", "Operations"],
    datasets: [
      {
        label: "Completion Rate (%)",
        data: [92, 85, 74, 88, 79],
        backgroundColor: "#5c6bc0",
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 20 } },
      x: { grid: { display: false } },
    },
  };

  // --- Doughnut Chart: Training Type Distribution ---
  const doughnutData = {
    labels: ["Technical", "Soft Skills", "Compliance", "Leadership"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: ["#3949ab", "#43a047", "#fb8c00", "#1e88e5"],
        borderWidth: 0,
      },
    ],
  };

  // --- Training Calendar / Schedule ---
  const trainingSchedule = [
    {
      title: "Advanced Java Workshop",
      trainer: "Amit Sharma",
      date: "2025-11-15",
      duration: "3 Days",
      status: "Upcoming",
    },
    {
      title: "Leadership Bootcamp",
      trainer: "Priya Nair",
      date: "2025-11-05",
      duration: "2 Days",
      status: "Completed",
    },
    {
      title: "Cybersecurity Awareness",
      trainer: "Ravi Verma",
      date: "2025-11-20",
      duration: "1 Day",
      status: "Upcoming",
    },
    {
      title: "Communication Mastery",
      trainer: "Sneha Patel",
      date: "2025-10-28",
      duration: "2 Days",
      status: "Completed",
    },
  ];

  return (
    <div className="training-dashboard">
      <h2 className="section-title">Training & Development Dashboard</h2>

      {/* Summary Cards */}
      <div className="training-cards">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="training-card"
            style={{ borderTop: `4px solid ${card.color}` }}
          >
            <h4>{card.title}</h4>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="training-charts">
        <div className="chart-box">
          <h3>Department-wise Completion Rate</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="chart-box">
          <h3>Training Type Distribution</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Training Schedule Table */}
      <div className="training-table-section">
        <h3>Training Schedule & Status</h3>
        <table className="training-table">
          <thead>
            <tr>
              <th>Training Title</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trainingSchedule.map((training, index) => (
              <tr key={index}>
                <td>{training.title}</td>
                <td>{training.trainer}</td>
                <td>{training.date}</td>
                <td>{training.duration}</td>
                <td>
                  <span
                    className={`status-badge ${
                      training.status === "Upcoming" ? "upcoming" : "completed"
                    }`}
                  >
                    {training.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
