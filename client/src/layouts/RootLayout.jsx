import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="root-layout">
            {/* Common header, navigation (for both client and admin) */}
            <header>
                {/* Your header content */}
            </header>
            
            <main>
                <Outlet /> 
            </main>
        </div>
    );
};

export default RootLayout;