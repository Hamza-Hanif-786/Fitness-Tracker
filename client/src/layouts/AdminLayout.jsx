import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Dumbbell, Home, Leaf } from 'lucide-react';        

const AdminLayout = () => {
    const {userId, isLoaded} = useAuth();
    const { user , isSignedIn } = useUser();
    const navigate = useNavigate();

    console.log("userId", userId)

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in');
        }
    }, [isLoaded]);

    const [visible, setVisible] = useState(false);
    const options = [
        { label: 'Dashboard', to: '/admin/dashboard', icon: <Home /> },
        { label: 'Workout', to: '/admin/workout', icon: <Dumbbell /> },
        { label: 'Nutrition', to: '/admin/nutrition', icon: <Leaf /> },

    ];

    const customHeader = (
        <div className='flex flex-row align-items-center'>
            {isSignedIn && 
                <div>
                    <h4 className='ml-3 text-white'>{user.fullName}</h4>
                </div>
            }
            
        </div>
    );

    if (!isLoaded) return "Loading...";
    
    return (
        <div>
            <Sidebar visible={visible} onHide={() => setVisible(false)} className='bg-gray-900' header={customHeader}>
                <div className='flex flex-column h-full'>
                    <div className='overflow-y-auto mt-3'>
                        <ul className='list-none p-1 m-0'>
                            {options.map((option, index) => (
                                <li key={index}>
                                    <NavLink key={index} to={option.to}
                                    className={({ isActive }) => (isActive ? 'p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full no-underline bg-blue-900'
                                    : 'p-ripple flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors w-full no-underline' )}>
                                        <i className={`mr-2 text-xl`}>{option.icon}</i>
                                        <span className='font-bold text-xl'>{option.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Sidebar>
            <header className='flex flex-row align-items-center p-3 surface-card gap-2'>
                <Button icon="pi pi-bars" onClick={() => setVisible(true)} className='text-900' text/>
            </header>
            

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;