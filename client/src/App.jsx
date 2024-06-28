import React, { useEffect, useState } from 'react'
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './routes/Home';
import Contact from './routes/Contact';
import About from './routes/About';
import Dashboard from'./routes/Dashboard';
import Workout from './routes/Workout';
import Nutrition from "./routes/Nutrition";
import MySignIn from './routes/MySignIn';
import MySignUp from './routes/MySignUp';
import NotFound from './routes/NotFound';

function App() {
  
  const [theme, setTheme] = useState('lara-light-blue');

  useEffect(() => {
    console.log("useEffect Running")
    const link = document.getElementById('theme-link');
    console.log("link element", link)
    if (theme && link) {
      setTimeout(() => {
        link.href = `/themes/${theme}/theme.css`
      }, 100);
      
    }
  }, [theme])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout setTheme={setTheme} />} >
            <Route path="/" element={<Home />} />
            <Route path='sign-in' element={<MySignIn />} />
            <Route path='sign-up' element={<MySignUp />} />
            <Route path='*' element={<NotFound />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<AdminLayout />} >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="Workout" element={<Workout />} />
              <Route path="Nutrition" element={<Nutrition />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
