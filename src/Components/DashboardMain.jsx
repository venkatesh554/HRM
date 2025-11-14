import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import EmployeeSidebar from "../EmployeeComponents2/EmployeeSidebar"
import './Dashboard.new.css';

import Dashboard from '../Pages/Dashboard';
import Trainings from '../Pages/Trainings';
import Employees from '../Pages/Employees';
import Attendance from '../Pages/Attendance';
import LeaveManagement from '../Pages/LeaveManagement';
import Payroll from '../Pages/Payroll';
import Recruitment from '../Pages/Recruitment';
import Settings from '../Pages/Settings';


const pageMap = {
  'dashboard': Dashboard,
  'employees': Employees,
  'attendance': Attendance,
  'leave-management': LeaveManagement,
  'payroll': Payroll,
  'Recruitment': Recruitment,
  'Trainings': Trainings,
  'Settings':Settings

};

export default function DashboardMain() {
  const [section, setSection] = useState('dashboard');

  const PageComponent = pageMap[section] || (() => <div />);

  return (
    <div className="ur-dashboard-layout">
      <Sidebar onNavigate={key => setSection(key)} />
            {/* <EmployeeSidebar onNavigate={key => setSection(key)} /> */}


      <main className="dashboard-main">
        <header className="main-header">
          <h1>{section === 'leave-management' ? 'Leave Management' : section.charAt(0).toUpperCase() + section.slice(1)}</h1>
        </header>

        <section className="main-body">
          <PageComponent />
        </section>
      </main>
    </div>
  );
}
