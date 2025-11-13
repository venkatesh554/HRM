import React, { useState, useEffect, useRef } from "react";
import "./EmpPayslips.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function EmpPayslip() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const payslipRef = useRef();

  const BACKEND_URL = "http://192.168.0.179:8080/api/employees/all/5/admin";
  const FALLBACK_URL = "https://jsonplaceholder.typicode.com/users";

  // ⚡ Helper: timeout fetch
  const fetchWithTimeout = (url, options = {}, timeout = 3000) =>
    Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);

  // ✅ Fast Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetchWithTimeout(BACKEND_URL);
        if (!res.ok) throw new Error("Backend error");
        const data = await res.json();
        setEmployees(data);
      } catch {
        const res = await fetch(FALLBACK_URL);
        const data = await res.json();
        setEmployees(data);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Scroll to top when opening payslip
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedEmp]);

  // 🧮 Generate payslip data
  const generatePayslip = (emp) => {
    const base = 30000 + ((emp.employeeId || emp.id) % 5) * 5000;
    const hra = base * 0.4;
    const allowance = base * 0.1;
    const deductions = base * 0.12;
    const total = base + hra + allowance - deductions;
    return { emp, base, hra, allowance, deductions, total, date: "November 2025" };
  };

  // 📄 Download PDF
  const handleDownloadPDF = () => {
    const payslipElement = payslipRef.current;
    html2canvas(payslipElement, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("Payslip.pdf");
    });
  };

  // 🦴 Skeleton Loader
  if (loading)
    return (
      <div className="payslip-list-container">
        <h2 className="payslip-title">Employee Payslips</h2>
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
        <p className="loading-text">Loading employee payslips...</p>
      </div>
    );

  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: 30 }}>{error}</p>
    );

  // 💳 Payslip View
  if (selectedEmp) {
    const p = generatePayslip(selectedEmp);
    const monthlyHistory = [
      { month: "July", net: p.total - 1200 },
      { month: "August", net: p.total - 800 },
      { month: "September", net: p.total + 500 },
      { month: "October", net: p.total },
      { month: "November", net: p.total },
    ];

    return (
      <div className="payslip-container">
        <button className="back-btn" onClick={() => setSelectedEmp(null)}>
          ← Back to Employee List
        </button>

        <div ref={payslipRef} className="payslip-card fade-in">
          <header className="payslip-header">
            <div className="payslip-company">
              <div className="company-monogram">UR</div>
              <div>
                <h2 className="company-name">UR HRM Pvt. Ltd.</h2>
                <p className="company-address">Hyderabad, India</p>
              </div>
            </div>
            <div className="payslip-meta">
              <span className="meta-label">Payslip For:</span>
              <span className="meta-value">{p.date}</span>
            </div>
          </header>

          <section className="payslip-info">
            <div className="info-block">
              <p><strong>Employee:</strong> {selectedEmp.firstName || selectedEmp.name}</p>
              <p><strong>Email:</strong> {selectedEmp.email}</p>
              <p><strong>Department:</strong> {selectedEmp.jobDetails?.department || "Development"}</p>
            </div>
            <div className="info-block">
              <p><strong>Designation:</strong> {selectedEmp.jobDetails?.designation || "Software Engineer"}</p>
              <p><strong>Phone:</strong> {selectedEmp.phone}</p>
              <p><strong>Location:</strong> {selectedEmp.address?.city}</p>
            </div>
          </section>

          <section className="payslip-tables">
            <div className="table-column">
              <h3>Earnings</h3>
              <table>
                <tbody>
                  <tr><td>Basic Pay</td><td className="right">₹{p.base.toLocaleString()}</td></tr>
                  <tr><td>HRA</td><td className="right">₹{p.hra.toLocaleString()}</td></tr>
                  <tr><td>Allowance</td><td className="right">₹{p.allowance.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="table-column">
              <h3>Deductions</h3>
              <table>
                <tbody>
                  <tr><td>PF & Tax</td><td className="right">₹{p.deductions.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="payslip-summary">
            <div className="summary-item">
              <span>Gross Earnings</span>
              <span>₹{(p.base + p.hra + p.allowance).toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Total Deductions</span>
              <span>₹{p.deductions.toLocaleString()}</span>
            </div>
            <div className="summary-item net">
              <span>Net Pay</span>
              <span>₹{p.total.toLocaleString()}</span>
            </div>
          </section>

          <footer className="payslip-footer">
            <p className="note">This is a computer-generated payslip.</p>
            <div className="signature">
              <div className="line"></div>
              <p>Authorized Signatory</p>
            </div>
          </footer>
        </div>

        {/* 📄 Download Button */}
        <button className="download-btn" onClick={handleDownloadPDF}>
          ⬇ Download PDF
        </button>

        {/* 📅 Monthly Salary History */}
        <div className="salary-history">
          <h3>Salary History</h3>
          <div className="history-grid">
            {monthlyHistory.map((m, idx) => (
              <div key={idx} className="history-card">
                <p className="month">{m.month}</p>
                <p className="amount">₹{m.net.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 👥 Employee List View
  return (
    <div className="payslip-list-container fade-in">
      <h2 className="payslip-title">Employee Payslips</h2>
      <div className="payslip-list">
        {employees.map((emp) => (
          <div
            key={emp.employeeId || emp.id}
            className="payslip-list-item"
            onClick={() => setSelectedEmp(emp)}
          >
            <div className="emp-avatar">
              {(emp.firstName?.[0] || emp.name?.[0] || "E").toUpperCase()}
            </div>
            <div>
              <div className="emp-name">
                {emp.firstName
                  ? `${emp.firstName} ${emp.lastName || ""}`
                  : emp.name}
              </div>
              <div className="emp-email">{emp.email || "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
