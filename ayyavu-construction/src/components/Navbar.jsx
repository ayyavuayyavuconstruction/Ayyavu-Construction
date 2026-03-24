import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header style={{
      width: '100%',
      padding: '16px 60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/assets/images/logo.png" alt="Logo" style={{ width: 28, height: 28 }} />
        <b>Ayyavu Construction</b>
      </div>

      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '28px', fontSize: '14px' }}>
          <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/About" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
          <li><Link to="/Projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</Link></li>
          <li><Link to="/Contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar