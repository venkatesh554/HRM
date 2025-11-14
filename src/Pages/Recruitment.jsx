import React, { useEffect, useState } from "react";
import "./Recruitment.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RecruitmentDashboard() {
  const BASE_URL = "http://192.168.0.129:8080/api/recruitment/jobs";

  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [summaryCards, setSummaryCards] = useState([]);
  const [skillZones, setSkillZones] = useState([]);
  const [offerData, setOfferData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // --- Fetch Jobs ---
        const jobsRes = await fetch(`${BASE_URL}`);
        const jobsData = await jobsRes.json();
        setJobs(jobsData);

        // --- Fetch Candidates ---
        const candRes = await fetch(`${BASE_URL}/2/candidates`);
        const candData = await candRes.json();
        setCandidates(candData);

        // --- Compute Summary Cards ---
        const totalVacancies = jobsData.length;
        const ongoingRecruitments = jobsData.filter(
          (job) => job.status === "Open"
        ).length;
        const hiredCandidates = candData.filter(
          (c) => c.status === "Confirmed"
        ).length;
        const conversionRate =
          totalVacancies > 0
            ? ((hiredCandidates / totalVacancies) * 100).toFixed(1) + "%"
            : "0%";

        const offerAccepted = candData.filter(
          (c) => c.status === "Accepted"
        ).length;
        const offerAcceptanceRate =
          totalVacancies > 0
            ? ((offerAccepted / totalVacancies) * 100).toFixed(1) + "%"
            : "0%";

        setSummaryCards([
          { title: "Total Vacancies", value: totalVacancies, color: "#FBC02D" },
          {
            title: "Ongoing Recruitments",
            value: ongoingRecruitments,
            color: "#E53935",
          },
          { title: "Hired Candidates", value: hiredCandidates, color: "#43A047" },
          { title: "Conversion Rate", value: conversionRate, color: "#3949AB" },
          {
            title: "Offer Acceptance Rate (OAR)",
            value: offerAcceptanceRate,
            color: "#00897B",
          },
        ]);

        // --- Compute Skill Zones dynamically based on job skills ---
        const skillsCount = {};
        jobsData.forEach((job) => {
          if (job.skillsRequired) {
            const skills = job.skillsRequired
              .split(",")
              .map((s) => s.trim());
            skills.forEach((skill) => {
              skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
          }
        });

        const skillsArray = Object.keys(skillsCount).map((skill, idx) => ({
          name: skill,
          count: skillsCount[skill],
          color: ["#5C6BC0", "#8E24AA", "#43A047", "#039BE5", "#FB8C00"][idx % 5],
          short: skill.substring(0, 2).toUpperCase(),
        }));

        setSkillZones(skillsArray);

        // --- Offer Letter Status Pie Chart ---
        const offerStatusCounts = {
          "Not Sent": candData.filter((c) => c.status === "Not Sent").length,
          Sent: candData.filter((c) => c.status === "Sent").length,
          Accepted: candData.filter((c) => c.status === "Accepted").length,
          Rejected: candData.filter((c) => c.status === "Rejected").length,
          Joined: candData.filter((c) => c.status === "Joined").length,
        };

        setOfferData({
          labels: Object.keys(offerStatusCounts),
          datasets: [
            {
              data: Object.values(offerStatusCounts),
              backgroundColor: [
                "#CFD8DC",
                "#FFCA28",
                "#66BB6A",
                "#EF5350",
                "#42A5F5",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("❌ Error fetching recruitment data:", error);
      }
    };

    fetchAllData();
  }, []);

  // --- Handle Status Change ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );

      await fetch(`${BASE_URL}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="recruitment-dashboard">
      {/* --- Summary Cards --- */}
      <div className="summary-section">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="summary-card">
            <div
              className="summary-indicator"
              style={{ backgroundColor: card.color }}
            ></div>
            <div className="summary-content">
              <h4>{card.title}</h4>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recruitment-main">
        {/* --- Skill Zone --- */}
        <div className="recruitment-card skill-zone">
          <h3>Department-wise Candidates</h3>
          <ul>
            {skillZones.map((zone, idx) => (
              <li key={idx} className="zone-item">
                <div
                  className="badge"
                  style={{ backgroundColor: zone.color }}
                >
                  {zone.short}
                </div>
                <div className="zone-info">
                  <p className="zone-title">{zone.name}</p>
                  <p className="zone-sub">{zone.count} Candidates</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Offer Letter Status --- */}
        <div className="recruitment-card offer-status">
          <h3>Candidate Offer Letter Status</h3>
          <div className="chart-wrapper">
            <Pie data={offerData} />
          </div>
          <div className="legend">
            {offerData.labels.map((label, idx) => (
              <div key={idx} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    backgroundColor: offerData.datasets[0].backgroundColor[idx],
                  }}
                ></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* --- Candidates Onboard Table --- */}
        <div className="recruitment-card onboard">
          <h3>Candidates Onboard</h3>
          <table className="onboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((cand) => (
                <tr key={cand.id}>
                  <td>{cand.id}</td>
                  <td>{cand.name}</td>
                  <td>{cand.role}</td>
                  <td>{cand.department}</td>
                  <td>{cand.joiningDate}</td>
                  <td>{cand.email}</td>
                  <td>
                    <select
                      className={`status-dropdown ${cand.status.toLowerCase()}`}
                      value={cand.status}
                      onChange={(e) =>
                        handleStatusChange(cand.id, e.target.value)
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Probation">Probation</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Sent">Sent</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Joined">Joined</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Jobs Table --- */}
        <div className="recruitment-card jobs">
          <h3>Open Jobs</h3>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.jobId}>
                  <td>{job.jobId}</td>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.experienceRequired}</td>
                  <td>{job.jobType}</td>
                  <td>{job.location}</td>
                  <td>{job.skillsRequired}</td>
                  <td>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
