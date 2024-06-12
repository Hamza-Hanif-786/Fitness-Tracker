import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './routes/Home';
import Contact from './routes/Contact';
import About from './routes/About';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<AdminLayout />} >
              <Route path="dashboard" element={<h1>Dashboard</h1>} />
              <Route path="profile" element={<h1>Profile</h1>} />
              <Route path="Invoices" element={<h1>Invoices</h1>} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
