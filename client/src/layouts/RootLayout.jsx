import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Settings } from 'lucide-react'; 
import { Dropdown } from 'primereact/dropdown';
import Constants from '../Constants';

function RootLayout({ setTheme }) {
    const date = new Date();
    const year = date.getFullYear();
    const navigate = useNavigate();

    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key")
    }

    const [visible, setVisible] = useState(false);
    const [settingSidebar, setSettingSidebar] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);

    const options = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' }
    ];

    const customHeader = (
        <div className="flex align-items-center gap-2">
            <Avatar shape="circle" size="large" image='/logo.png' />
            <p className='text-white text-2xl font-bold font-italic'>Fitness Tracker</p>
        </div>
    );

    const customHeader2 = (
        <div className='flex align-items-center'>
            <h2 className='font-bold text-2xl'>Settings</h2>
        </div>
    );

    const handleThemeChange = (newTheme) => {
        setSelectedTheme(newTheme);
        setTheme(newTheme);
    }

    return (
        <ClerkProvider routerPush={(to) => navigate(to)} routerReplace={(to) => navigate(to, { replace: true })} publishableKey={PUBLISHABLE_KEY}>
            <div>
                <header className='flex flex-row align-items-center justify-content-between p-1 bg-gray-900 w-full'>
                    <div className='flex flex-row align-items-center justify-content-between gap-6 mx-2'>
                        <div className="flex flex-row align-items-center gap-2">
                            <Avatar shape="circle" size="large" image='/logo.png' />
                            <p className='text-white text-xl font-bold font-italic sm:text-xl md:text-lg lg:text-2xl'>Fitness Tracker</p>
                        </div>

                        <div className="sm:hidden md:flex md:flex-row hidden justify-content-between align-items-center">
                            {options.map((option) => (
                              <Link key={option.label} to={option.to} className='p-2 no-underline text-xl font-medium text-white p-ripple cursor-pointer'>
                                {option.label}
                              </Link>
                            ))}
                        </div>
                    </div>
                    <div className='hidden sm:hidden md:flex md:flex-row align-items-center gap-2 mx-2'>
                        <SignedIn>
                            <Button outlined label='Dashboard' className='text-white' onClick={() => navigate('/admin/dashboard')}/>
                        </SignedIn>
                        <Button icon={<Settings />} severity='primary' className='text-white' onClick={() => setSettingSidebar(true)} text></Button>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Button label="Get Started" icon="pi pi-user-plus" className="p-2" onClick={() => navigate('/sign-up')} />
                        </SignedOut>
                    </div>
                    <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="flex sm:flex md:hidden justify-content-center text-white" text/>
                </header>

                <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" header={customHeader} className='bg-gray-900'>
                    <div className="flex flex-column align-items-start justify-content-start">
                      {options.map((option) => (
                        <Link key={option.label} to={option.to} className='p-2 no-underline text-xl font-bold text-white'>
                          {option.label}
                        </Link>
                      ))}
                    </div>
                    <div className='flex flex-column align-items-center justify-content-start py-2 gap-2'>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Button label="Get Started" icon="pi pi-user-plus" className="p-2" onClick={() => navigate('/sign-up')} />
                        </SignedOut>
                    </div>
                </Sidebar>
            </div>

            <Sidebar visible={settingSidebar} onHide={() => setSettingSidebar(false)} position='right' className='surface-ground' header={customHeader2}>
                <div className='flex flex-column'>
                    <h3 className='text-xl'>Themes</h3>
                    <div className='flex flex-column'>
                        <Dropdown
                            value={selectedTheme} 
                            onChange={(e) => handleThemeChange(e.value)} 
                            placeholder='Select Theme' 
                            options={Constants.Themes} 
                            optionLabel='label'
                            filter
                            clearIcon
                        />
                    </div>
                </div>
            </Sidebar>

            <main className='overflow-hidden flex flex-column'>
                <Outlet /> 
            </main>


            <footer className="bg-bluegray-900 px-4 md:px-6 lg:px-8">
                <div className="py-6 flex flex-column sm:flex-row sm:align-items-center justify-content-between">
                    <div>
                        <img src="/logo.png" alt="Image" height="60"/>
                        <div className="mt-2 line-height-3 text-300">© {year} Fitness Tracker, Inc. All rights reserved</div>
                    </div>
                    <div className="mt-3 sm:mt-0">
                        <a className="cursor-pointer text-300 transition-colors transition-duration-150 hover:text-500">
                            <i className="pi pi-twitter text-xl"></i>
                        </a>
                        <a className="cursor-pointer text-300 ml-3 transition-colors transition-duration-150 hover:text-500">
                            <i className="pi pi-facebook text-xl"></i>
                        </a>
                        <a className="cursor-pointer text-300 ml-3 transition-colors transition-duration-150 hover:text-500">
                            <i className="pi pi-github text-xl"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </ClerkProvider>
    );
};

export default RootLayout;