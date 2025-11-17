import React from 'react';
import './App.css';
import DashboardMain from './Components/DashboardMain';
import Navbar from "./Components/Navbar"
import EmployeeMainDashboard from "./EmployeeComponents2/EmployeeDashboard"
export default function App() {
  return(
    <>
    <Navbar/>
<<<<<<< HEAD
    <DashboardMain />;
    {/* <EmployeeMainDashboard />; */}
=======
    {/* <DashboardMain />;*/}
    <EmployeeMainDashboard />; 
>>>>>>> 7d5c5e5f565e0bdbef21473502ed27520b15afa4
    </>
  )
}






// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import DashboardMain from "./Components/DashboardMain"; // HR Dashboard
// import EmployeeMainDashboard from "./EmployeeComponents2/EmployeeDashboard"
// import "./App.css";

// export default function App() {
//   return (
//     <Router>
//       {/* Navbar is common for both */}
//       <Navbar />

//       <Routes>
//         {/* ✅ HR Dashboard */}
//         <Route path="/admin/*" element={<DashboardMain />} />

//         {/* ✅ Employee Dashboard */}
//         <Route path="/employee/*" element={<EmployeeMainDashboard />} />

//         {/* ✅ Default Route (for testing or login) */}
//         <Route path="/" element={<EmployeeMainDashboard />} />
//       </Routes>
//     </Router>
//   );
// }
