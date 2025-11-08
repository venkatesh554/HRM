import React from 'react';
import styles from './leave.module.css';

export default function LeaveManagement() {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-IN", options);

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2>Leave Management</h2>
        <p>Today: {formattedDate}</p>
      </div>

      {/* Leave Summary Section */}
      <div className={styles.summarySection}>
        <div className={styles.card}>
          <h3>Total Leaves</h3>
          <p>24 Days</p>
        </div>
        <div className={styles.card}>
          <h3>Used</h3>
          <p>12 Days</p>
        </div>
        <div className={styles.card}>
          <h3>Remaining</h3>
          <p>12 Days</p>
        </div>
      </div>

      {/* Apply for Leave Section */}
      <div className={styles.applySection}>
        <h3>Apply for Leave</h3>
        <form className={styles.form} onSubmit={(e) => {
    e.preventDefault(); // prevent page reload
    alert("Leave request submitted successfully!");
  }}>
          <div className={styles.formGroup}>
            <label>Leave Type</label>
            <select>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Earned Leave</option>
              <option>Unpaid Leave</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>From Date</label>
            <input type="date" />
          </div>

          <div className={styles.formGroup}>
            <label>To Date</label>
            <input type="date" />
          </div>

          <div className={styles.formGroup}>
            <label>Reason</label>
            <textarea rows="3" placeholder="Enter reason for leave..."></textarea>
          </div>

          <button type="submit" className={styles.applyBtn}>
            Submit Application
          </button>
        </form>
      </div>

      {/* Leave History Section */}
      <div className={styles.historySection}>
        <h3>Leave History</h3>
        <div className={styles.historyTable}>
          <div className={styles.tableHeader}>
            <span>Date Range</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          <div className={styles.tableRow}>
            <span>2–4 Oct 2025</span>
            <span>Sick Leave</span>
            <span className={styles.approved}>Approved</span>
          </div>
          <div className={styles.tableRow}>
            <span>15 Oct 2025</span>
            <span>Casual Leave</span>
            <span className={styles.pending}>Pending</span>
          </div>
          <div className={styles.tableRow}>
            <span>1–3 Nov 2025</span>
            <span>Earned Leave</span>
            <span className={styles.rejected}>Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
