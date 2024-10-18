// src/components/MainLayout.jsx
import React from 'react';
import AdminSidebar from '../main_components/components/admin/components/AdminSidebar';
import Topbar from '../main_components/components/admin/components/Topbar';
import { useMode } from '../theme'; // Assuming you still need to use theme context

const MainLayout = ({ children, isAdminSidebar, setIsAdminSidebar }) => {
  return (
    <div className="app">
      <AdminSidebar isAdminSidebar={isAdminSidebar} />
      <main className="content">
        <Topbar setIsAdminSidebar={setIsAdminSidebar} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
