import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Outlet, Link } from 'react-router-dom';

const RootLayout = () => {
    const [visible, setVisible] = useState(false);
    const options = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Admin', to: '/admin' }
    ];

    const customHeader = (
        <div className="flex align-items-center gap-2">
            <img src="/vite.svg" alt="Logo" />
            <p className='text-blue-500 text-2xl font-bold'>Vite + React</p>
        </div>
    );
    return (
        <div className="root-layout">
            <div>
                <header className='flex flex-row align-items-center justify-content-between p-2 surface-200 w-full mb-1'>
                    <div className='flex flex-row align-items-center justify-content-between gap-6'>
                        <div className="flex flex-row align-items-center gap-2">
                            <img src="/vite.svg" alt="Logo" />
                            <p className='text-blue-500 text-2xl font-bold'>Vite + React</p>
                        </div>

                        <div className="md:hidden lg:flex lg:flex-row hidden justify-content-between align-items-center">
                            {options.map((option) => (
                              <Link key={option.label} to={option.to} className='p-2 no-underline text-xl font-bold text-blue-500'>
                                {option.label}
                              </Link>
                            ))}
                        </div>
                    </div>
                    <div className='hidden md:hidden lg:flex lg:flex-row align-items-center gap-2'>
                        <Button label="Login" icon="pi pi-sign-in" className="p-2" outlined/>
                        <Button label="Register" icon="pi pi-user-plus" className="p-2" />
                    </div>
                    <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="flex md:flex lg:hidden justify-content-center" />
                </header>

                <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" header={customHeader}>
                    <div className="flex flex-column align-items-start justify-content-start">
                      {options.map((option) => (
                        <Link key={option.label} to={option.to} className='p-2 no-underline text-xl font-bold text-blue-500'>
                          {option.label}
                        </Link>
                      ))}
                    </div>
                    <div className='flex flex-column align-items-center justify-content-start py-2 gap-2'>
                      <Button label="Login" icon="pi pi-sign-in" className="p-2 w-full" outlined/>
                      <Button label="Register" icon="pi pi-user-plus" className="p-2 w-full" />
                    </div>
                </Sidebar>
            </div>



            <main>
                <Outlet /> 
            </main>
        </div>
    );
};

export default RootLayout;