import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddProject from './pages/admin/AddProject.jsx'
import EditProject from './pages/admin/EditProject.jsx'
import Enquiries from './pages/admin/Enquiries.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/edit-project" element={<EditProject />} />
        <Route path="/admin/enquiries" element={<Enquiries />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App