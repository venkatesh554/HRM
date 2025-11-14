// import React from "react";
// import empData from "./emp.json";
// import "./EmployeeLogin.css";

// export default function EmployeeLogin() {
//   const rows = (empData || []).map((emp) => {
//     const initials = (emp.name || "").split(/\s+/).map(n => n[0]).join('').toUpperCase();
//     const username = (emp.name || "").toLowerCase().split(/\s+/).map(n => n[0]).join('') + (emp.id || '').slice(-3);
//     const email = emp.email || ((emp.name || '').toLowerCase().replace(/\s+/g, '.') + '@example.com');
//     const lastLogin = emp.lastLogin || '2025-11-09 09:00';
//     return { id: emp.id, name: emp.name, initials, username, email, role: emp.role, lastLogin, status: emp.status };
//   });

//   return (
//     <div className="employee-login-page">
//       <div className="login-header">
//         <h3>Login Details</h3>
//         <p className="login-sub">Usernames, emails and recent login times for employees.</p>
//       </div>

//       <div className="login-table-wrap">
//         <table className="login-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Mobile Number</th>
//               <th>Last Login</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r) => (
//               <tr key={r.id || r.email}>
//                 <td className="user-cell">
//                   <div className="avatar">{r.initials}</div>
//                   <div className="user-meta">
//                     <div className="user-name">{r.name}</div>
//                     <div className="user-id">{r.id}</div>
//                   </div>
//                 </td>
//                 <td className="mono">{r.username}</td>
//                 <td>{r.email}</td>
//                 <td>{r.role}</td>
//                 <td className="mono">{r.lastLogin}</td>
//                 <td>
//                   <span className={`status-badge ${r.status === 'Active' ? 'active' : r.status === 'Inactive' ? 'inactive' : 'onleave'}`}>
//                     {r.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }












// import React, { useEffect, useState } from "react";
// import "./EmployeeLogin.css";

// export default function EmployeeLogin() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Fetch employees from backend
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch(
//           "http://192.168.0.179:8080/api/employees/all/5/admin"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setEmployees(data);
//       } catch (err) {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee login data. Check server or CORS.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   // ✅ Format employees for display
//   const rows = employees.map((emp) => {
//     const initials = `${emp.firstName?.[0] || ""}${emp.lastName?.[0] || ""}`.toUpperCase();
//     const username = (emp.firstName + emp.lastName).toLowerCase();
//     const email = emp.email || "—";
//     const phone = emp.phone || "—";
//     const lastLogin = emp.updatedAt || "—";
//     const status = emp.status || "—";

//     return {
//       id: emp.employeeId,
//       name: `${emp.firstName} ${emp.lastName}`,
//       initials,
//       username,
//       email,
//       phone,
//       lastLogin,
//       status,
//     };
//   });

//   return (
//     <div className="employee-login-page">
//       <div className="login-header">
//         <h3>Login Details</h3>
//         <p className="login-sub">
//           Usernames, emails, and recent login times for employees.
//         </p>
//       </div>

//       {loading ? (
//         <p style={{ textAlign: "center", marginTop: 20 }}>Loading data...</p>
//       ) : error ? (
//         <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//       ) : (
//         <div className="login-table-wrap">
//           <table className="login-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Last Update</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.length > 0 ? (
//                 rows.map((r) => (
//                   <tr key={r.id}>
//                     <td className="user-cell">
//                       <div className="avatar">{r.initials}</div>
//                       <div className="user-meta">
//                         <div className="user-name">{r.name}</div>
//                         <div className="user-id">ID: {r.id}</div>
//                       </div>
//                     </td>
//                     <td className="mono">{r.username}</td>
//                     <td>{r.email}</td>
//                     <td>{r.phone}</td>
//                     <td className="mono">{r.lastLogin}</td>
//                     <td>
//                       <span
//                         className={`status-badge ${
//                           r.status === "ACTIVE"
//                             ? "active"
//                             : r.status === "INACTIVE"
//                             ? "inactive"
//                             : "onleave"
//                         }`}
//                       >
//                         {r.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
//                     No employee records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import "./EmployeeLogin.css";

// export default function EmployeeLogin() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Fetch employees from API
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         setEmployees(data);
//       } catch (err) {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee login data. Check server or CORS.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   // ✅ Safely format employees for display
//   const rows = employees.map((emp) => {
//     const firstName = emp.name?.split(" ")[0] || ""; // from jsonplaceholder "name"
//     const lastName = emp.name?.split(" ")[1] || "";
//     const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
//     const username = emp.username || ""; // exists in jsonplaceholder
//     const email = emp.email || "—";
//     const phone = emp.phone || "—";
//     const lastLogin = emp.updatedAt || "—"; // placeholder doesn’t have this
//     const status = emp.status || "—"; // placeholder doesn’t have this

//     return {
//       id: emp.id || "",
//       name: `${firstName} ${lastName}`.trim(),
//       initials,
//       username,
//       email,
//       phone,
//       lastLogin,
//       status,
//     };
//   });

//   return (
//     <div className="employee-login-page">
//       <div className="login-header">
//         <h3>Login Details</h3>
//         <p className="login-sub">
//           Usernames, emails, and recent login times for employees.
//         </p>
//       </div>

//       {loading ? (
//         <p style={{ textAlign: "center", marginTop: 20 }}>Loading data...</p>
//       ) : error ? (
//         <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//       ) : (
//         <div className="login-table-wrap">
//           <table className="login-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Last Update</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.length > 0 ? (
//                 rows.map((r) => (
//                   <tr key={r.id}>
//                     <td className="user-cell">
//                       <div className="avatar">{r.initials || "?"}</div>
//                       <div className="user-meta">
//                         <div className="user-name">{r.name || "—"}</div>
//                         <div className="user-id">ID: {r.id || "—"}</div>
//                       </div>
//                     </td>
//                     <td className="mono">{r.username || "—"}</td>
//                     <td>{r.email || "—"}</td>
//                     <td>{r.phone || "—"}</td>
//                     <td className="mono">{r.lastLogin || "—"}</td>
//                     <td>
//                       <span
//                         className={`status-badge ${
//                           r.status === "ACTIVE"
//                             ? "active"
//                             : r.status === "INACTIVE"
//                             ? "inactive"
//                             : "onleave"
//                         }`}
//                       >
//                         {r.status || "—"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
//                     No employee records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }













import React, { useEffect, useState } from "react";
import "./EmployeeLogin.css";

export default function EmployeeLogin() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://192.168.0.179:8080/api/employees/all/5/admin";
  const FALLBACK_URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("🔍 Trying backend:", BACKEND_URL);

        // Try backend first
        let response = await fetch(FALLBACK_URL, { timeout: 5000 });
        if (!response.ok) throw new Error("Backend not reachable");

        const data = await response.json();
        console.log("✅ Loaded data from backend");
        setEmployees(data);
      } catch (err) {
        console.warn("⚠️ Backend unavailable, switching to fallback data.");

        // Try JSON placeholder if backend fails
        try {
          const response = await fetch(FALLBACK_URL);
          const data = await response.json();
          setEmployees(data);
        } catch (fallbackErr) {
          console.error("❌ Both backend and fallback failed:", fallbackErr);
          setError("Failed to load employee login data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // ✅ Safely format employee data (handles missing fields)
  const rows = employees.map((emp) => {
    const firstName = emp.firstName || emp.name?.split(" ")[0] || "";
    const lastName = emp.lastName || emp.name?.split(" ")[1] || "";
    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    const username = (firstName + lastName).toLowerCase() || "";
    const email = emp.email || "";
    const phone = emp.phone || "";
    const lastLogin = emp.updatedAt || emp.website || "";
    const status = emp.status || "ACTIVE";

    return {
      id: emp.employeeId || emp.id,
      name: `${firstName} ${lastName}`.trim(),
      initials,
      username,
      email,
      phone,
      lastLogin,
      status,
    };
  });

  return (
    <div className="employee-login-page">
      <div className="login-header">
        <h3>Login Details</h3>
        <p className="login-sub">
          Usernames, emails, and recent login times for employees.
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div className="login-table-wrap">
          <table className="login-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Last Update</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="user-cell">
                      <div className="avatar">{r.initials}</div>
                      <div className="user-meta">
                        <div className="user-name">{r.name}</div>
                        <div className="user-id">ID: {r.id}</div>
                      </div>
                    </td>
                    <td className="mono">{r.username}</td>
                    <td>{r.email}</td>
                    <td>{r.phone}</td>
                    <td className="mono">{r.lastLogin}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          r.status === "ACTIVE"
                            ? "active"
                            : r.status === "INACTIVE"
                            ? "inactive"
                            : "onleave"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "15px" }}
                  >
                    No employee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
