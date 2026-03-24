import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer.jsx'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('admin_logged_in') !== 'yes') {
      navigate('/admin/login')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleLogout() {
    localStorage.removeItem('admin_logged_in')
    navigate('/admin/login')
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="../public/assets/images/Logo.png" alt="Logo" />
          <b>Ayyavu Construction</b>
        </div>
        <button className="quote-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="dash-card">
            <h3>Add Project</h3>
            <button onClick={() => navigate('/admin/add-project')}>Add</button>
          </div>
          <div className="dash-card">
            <h3>Edit Projects</h3>
            <button onClick={() => navigate('/admin/edit-project')}>Edit</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Dashboard