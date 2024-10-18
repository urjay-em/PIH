import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import AdminSidebar from './main_components/components/admin/components/AdminSidebar';
import Topbar from './main_components/components/admin/components/Topbar';
import Dashboard from './main_components/components/admin/pages/dashboard/Dashboard';
import ManageAdminAcc from './main_components/components/admin/pages/manage_admin/ManageAdminAcc';
import ManageAgentAcc from './main_components/components/admin/pages/manage_agent/ManageAgentAcc';
import ManageBranches from './main_components/components/admin/pages/manage_branches/ManageBranches';
import ManageEmployeeAcc from './main_components/components/admin/pages/manage_employee/ManageEmployeeAcc';
import BackupRestore from './main_components/components/admin/pages/backuprestore/BackupRestore';
import Reports from './main_components/components/admin/pages/reports/Reports';
import Form from './main_components/components/admin/pages/form/Form';
import Contacts from './main_components/components/admin/pages/contacts/Contacts';
import Login from './auth/Login'; // Ensure this path is correct

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminSidebar, setIsAdminSidebar] = useState(true);

  // Check local storage for authentication on initial load
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setIsAuthenticated(true); // User is authenticated if tokens are present
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isAuthenticated ? (
            <Routes>
              <Route path='/login' element={<Login onLogin={() => setIsAuthenticated(true)} />} />
              <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <div className='app'>
              <AdminSidebar isAdminSidebar={isAdminSidebar} />
              <main className="content">
                <Topbar setIsAdminSidebar={setIsAdminSidebar} handleLogout={handleLogout} />
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/manageadminacc' element={<ManageAdminAcc />} />
                  <Route path='/manageagentacc' element={<ManageAgentAcc />} />
                  <Route path='/managebranches' element={<ManageBranches />} />
                  <Route path='/manageemployeeacc' element={<ManageEmployeeAcc />} />
                  <Route path='/backuprestore' element={<BackupRestore />} />
                  <Route path='/reports' element={<Reports />} />
                  <Route path='/contacts' element={<Contacts />} />
                  <Route path='/form' element={<Form />} />
                </Routes>
              </main>
            </div>
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
