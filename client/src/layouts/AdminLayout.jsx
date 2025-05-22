import { useState, useEffect, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';
import { Dumbbell, Home, Leaf } from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';   

const AdminLayout = () => {
    const {userId, isLoaded} = useAuth();
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const { user , isSignedIn } = useUser();
    const [dialogvisible, setDialogVisible] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            categoryname: '',
    })
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

      const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Thank you', detail: 'Nutrition Added' });
    }
    
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please try again later' });
    }

    const handleSubmittion = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/nutrition-categories', formData);
            console.log('Server Response - Nutritions Data ', response.data);
            if (response.status === 201) {
              showSuccess();
              setLoading(false);
              setFormData({
                categoryname: null,
              })
              setDialogVisible(false);
            } else {
                showError();
            }
        } catch (error) {
            console.error('Server Error - Nutritions Data ', error);
        }
    }

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
        { label: 'Nutrition', to: '/admin/nutrition', icon: <Leaf />, button: true },
        { label: "Categories", to: '/admin/categories', icon: <Leaf />},
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
                                        {option.button && <Button label='Add' severity='primary' className='ml-auto' onClick={() =>setDialogVisible(true)} />}
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

            <Toast ref={toast} />
            <Dialog visible={dialogvisible} onHide={() => setDialogVisible(false)} maximizable header="Add Nutrition Category" style={{ width: '50vw' }}>
                <form onSubmit={handleSubmittion}>
                    <div className='field'>
                    <label htmlFor="categoryname" className='block font-medium text-900'>
                        Category Name<span className='text-red-500'>*</span>
                    </label>
                    <InputText id="categoryname" type="text" className='w-full' name='categoryname' placeholder='Break' required value={formData.categoryname} onChange={handleChange} />
                </div>
                    <Button severity='primary' className='w-full' onClick={handleSubmittion} label='Submit' loading={loading} disabled={loading} />
                </form>
            </Dialog>
            

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;