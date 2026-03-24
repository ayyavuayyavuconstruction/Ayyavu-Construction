import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    if (password === '12345') {
      localStorage.setItem('admin_logged_in', 'yes')
      navigate('/admin/dashboard')
    } else {
      setError('Wrong Password')
    }
  }

  return (
    <>
      {/* HEADER WITH BACK BUTTON */}
      <header>
        <div className="logo">
          <img src="../public/assets/images/Logo.png" alt="Logo" />
          <b>Ayyavu Construction</b>
        </div>

        <button className="quote-btn" onClick={() => navigate('/projects')}>
          ← Back
        </button>
      </header>

      {/* LOGIN FORM */}
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login