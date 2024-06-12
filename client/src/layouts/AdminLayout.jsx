import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {/* Admin-specific sidebar or navigation */}
            <aside>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/profile">Profile</Link>
                <Link to="/admin/invoices">Invoices</Link>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;