import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const tabs = [
    "Organization",
    "Users & Roles",
    "Attendance",
    "Leaves",
    "Payroll",
    "Recruitment",
    "Performance",
    "Notifications",
    "Security",
  ];

  const [active, setActive] = useState("Organization");

  return (
    <div className="settings-wrapper">
      <div className="page-header">
        <h1>HRMS Settings</h1>
        <p>Manage HR policies, workflows & system configurations.</p>
      </div>

      <div className="tabs-container">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`tab-btn ${active === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h2>{active} Settings</h2>
        <p className="subtext">Configure {active.toLowerCase()} system settings below.</p>

        <div className="content-card">
          {/* ---- ORGANIZATION ---- */}
          {active === "Organization" && (
            <>
              <div className="form-group">
                <label>Company Name</label>
                <input placeholder="Enter company name" />
              </div>

              <div className="form-row-2">
                <div>
                  <label>Company Email</label>
                  <input type="email" placeholder="admin@company.com" />
                </div>

                <div>
                  <label>GST / Registration Number</label>
                  <input placeholder="GSTIN / CIN" />
                </div>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Country</label>
                  <select>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div>
                  <label>Timezone</label>
                  <select>
                    <option>Asia/Kolkata</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea placeholder="Company address"></textarea>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Date Format</label>
                  <select>
                    <option>DD-MM-YYYY</option>
                    <option>MM-DD-YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label>Logo Upload URL</label>
                  <input placeholder="https://logo-url" />
                </div>
              </div>

              <button className="save-btn">Save Organization</button>
            </>
          )}

          {/* ---- USERS & ROLES ---- */}
          {active === "Users & Roles" && (
            <>
              <div className="form-group">
                <label>Create New Role</label>
                <input placeholder="Role Name" />
              </div>

              <div className="form-group">
                <label>Role Description</label>
                <input placeholder="Short description" />
              </div>

              <div className="form-group">
                <label>Permission Template</label>
                <select>
                  <option>Full Access</option>
                  <option>HR Manager Access</option>
                  <option>Finance Access</option>
                  <option>Manager Access</option>
                </select>
              </div>

              <div className="permission-section">
                <h4>Module Access</h4>

                <div className="checkbox-row"><input type="checkbox" /> Employees Mgmt</div>
                <div className="checkbox-row"><input type="checkbox" /> Attendance Mgmt</div>
                <div className="checkbox-row"><input type="checkbox" /> Leave Approval</div>
                <div className="checkbox-row"><input type="checkbox" /> Payroll Access</div>
                <div className="checkbox-row"><input type="checkbox" /> Recruitment Access</div>
                <div className="checkbox-row"><input type="checkbox" /> Performance Mgmt</div>

              </div>

              <button className="save-btn">Save Role</button>
            </>
          )}

          {/* ---- ATTENDANCE ---- */}
          {active === "Attendance" && (
            <>
              <div className="form-row-2">
                <div>
                  <label>Work Hours / Day</label>
                  <input type="number" placeholder="9" />
                </div>

                <div>
                  <label>Late Grace (mins)</label>
                  <input type="number" placeholder="10" />
                </div>
              </div>

              <div className="form-group">
                <label>Minimum Work Minutes to Mark Present</label>
                <input type="number" placeholder="480" />
              </div>

              <div className="toggle-row">
                <span>Enable Geo-Fencing</span>
                <input type="checkbox" />
              </div>

              <div className="toggle-row">
                <span>Auto Approve Manual Punches</span>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <label>Attendance Rounding</label>
                <select>
                  <option>None</option>
                  <option>Round to 15 mins</option>
                  <option>Round to 30 mins</option>
                </select>
              </div>

              <button className="save-btn">Save Attendance Settings</button>
            </>
          )}

          {/* ---- LEAVES ---- */}
          {active === "Leaves" && (
            <>
              <div className="form-row-2">
                <div>
                  <label>Leave Type</label>
                  <select>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Paid Leave</option>
                    <option>Maternity Leave</option>
                  </select>
                </div>

                <div>
                  <label>Total Leaves Per Year</label>
                  <input type="number" placeholder="12" />
                </div>
              </div>

              <div className="toggle-row">
                <span>Allow Carry Forward</span>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <label>Max Carry Forward Days</label>
                <input type="number" placeholder="5" />
              </div>

              <div className="form-group">
                <label>Approval Flow</label>
                <select>
                  <option>Reporting Manager</option>
                  <option>HR Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="toggle-row">
                <span>Leave Encashment Allowed</span>
                <input type="checkbox" />
              </div>

              <button className="save-btn">Save Leaves Settings</button>
            </>
          )}

          {/* ---- PAYROLL ---- */}
          {active === "Payroll" && (
            <>
              <div className="form-row-2">
                <div>
                  <label>Currency</label>
                  <select>
                    <option>INR</option>
                    <option>USD</option>
                    <option>GBP</option>
                  </select>
                </div>

                <div>
                  <label>Pay Cycle</label>
                  <select>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Bi-Monthly</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div>
                  <label>Basic % of CTC</label>
                  <input type="number" placeholder="40" />
                </div>

                <div>
                  <label>HRA % of CTC</label>
                  <input type="number" placeholder="20" />
                </div>
              </div>

              <div className="toggle-row">
                <span>Enable Overtime</span>
                <input type="checkbox" />
              </div>

              <h4>Statutory Deductions</h4>
              <div className="checkbox-row"><input type="checkbox" /> PF</div>
              <div className="checkbox-row"><input type="checkbox" /> ESI</div>
              <div className="checkbox-row"><input type="checkbox" /> TDS</div>

              <button className="save-btn">Save Payroll Settings</button>
            </>
          )}

          {/* ---- RECRUITMENT ---- */}
          {active === "Recruitment" && (
            <>
              <div className="form-group">
                <label>Hiring Stages</label>
                <input placeholder="Applied → Screening → Interview → Offer" />
              </div>

              <div className="form-group">
                <label>Auto Reject After (Days)</label>
                <input type="number" placeholder="30" />
              </div>

              <div className="toggle-row">
                <span>Enable Public Job Board</span>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <label>Candidate Email Template</label>
                <textarea rows="5" placeholder="Thank you for applying..."></textarea>
              </div>

              <button className="save-btn">Save Recruitment Settings</button>
            </>
          )}

          {/* ---- PERFORMANCE ---- */}
          {active === "Performance" && (
            <>
              <div className="form-row-2">
                <div>
                  <label>Appraisal Cycle</label>
                  <select>
                    <option>Annual</option>
                    <option>Bi-Annual</option>
                    <option>Quarterly</option>
                  </select>
                </div>

                <div>
                  <label>Rating Scale</label>
                  <select>
                    <option>1–5</option>
                    <option>1–10</option>
                  </select>
                </div>
              </div>

              <div className="toggle-row">
                <span>360° Feedback</span>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <label>Goal Types</label>
                <input placeholder="KRAs, Objectives, OKRs" />
              </div>

              <button className="save-btn">Save Performance Settings</button>
            </>
          )}

          {/* ---- NOTIFICATIONS ---- */}
          {active === "Notifications" && (
            <>
              <div className="toggle-row">
                <span>Email Notifications</span>
                <input type="checkbox" />
              </div>

              <div className="toggle-row">
                <span>SMS Notifications</span>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <label>Webhook URL</label>
                <input placeholder="https://webhook.url" />
              </div>

              <button className="save-btn">Save Notification Settings</button>
            </>
          )}

          {/* ---- SECURITY ---- */}
          {active === "Security" && (
            <>
              <div className="form-row-2">
                <div>
                  <label>Password Min Length</label>
                  <input type="number" placeholder="8" />
                </div>

                <div>
                  <label>Session Timeout (mins)</label>
                  <input type="number" placeholder="60" />
                </div>
              </div>

              <div className="checkbox-row"><input type="checkbox" /> Require Numbers</div>
              <div className="checkbox-row"><input type="checkbox" /> Require Special Characters</div>
              <div className="checkbox-row"><input type="checkbox" /> Enable 2FA Authentication</div>

              <div className="form-group">
                <label>Allowed IP Addresses</label>
                <input placeholder="192.168.1.1, 103.14.22.0/24" />
              </div>

              <button className="save-btn">Save Security Settings</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
