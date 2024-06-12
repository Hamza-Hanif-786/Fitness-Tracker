import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="root-layout">
            {/* Common header, navigation (for both client and admin) */}
            <header>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/admin">Admin</Link>
            </header>
            
            <main>
                <Outlet /> 
            </main>
        </div>
    );
};

export default RootLayout;