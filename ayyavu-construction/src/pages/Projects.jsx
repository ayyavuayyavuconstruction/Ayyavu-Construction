import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { supabase } from '../supabase.js'
import EnquiryPopup from '../components/EnquiryPopup.jsx'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [enquiryLoading, setEnquiryLoading] = useState(false)

  useEffect(() => {
    fetchProjects('All')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchProjects(status) {
    setLoading(true)
    let query = supabase
      .from('projects')
      .select('*, project_images(id, image_url)')
      .order('id', { ascending: false })

    if (status !== 'All') {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (!error) setProjects(data)
    setLoading(false)
  }

  function handleFilter(status) {
    setActiveFilter(status)
    fetchProjects(status)
  }

  async function handleEnquiry(e) {
    e.preventDefault()
    setEnquiryLoading(true)

    const formData = new FormData(e.target)

    const { error } = await supabase
      .from('contacts')
      .insert([{
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        project_id: selectedProject.id,
        project_title: selectedProject.title,
        subject: `Enquiry for ${selectedProject.title}`
      }])

    if (error) {
      alert('Error: ' + error.message)
      setEnquiryLoading(false)
      return
    }

    alert('Enquiry sent successfully!')
    setShowEnquiryForm(false)
    setEnquiryLoading(false)
    closeModal()
  }       

  function openModal(project) {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowEnquiryForm(false)
  }

  function closeModal() {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  function nextImage() {
    setCurrentImageIndex(prev =>
      (prev + 1) % selectedProject.project_images.length
    )
  }

  function prevImage() {
    setCurrentImageIndex(prev =>
      (prev - 1 + selectedProject.project_images.length) % selectedProject.project_images.length
    )
  }

  function getStatusColor(status) {
    if (status === 'Completed') return '#22c55e'
    if (status === 'Ongoing') return '#f97316'
    return '#3b82f6'
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="../public/assets/images/Logo.PNG" alt="Logo" />
          <b>Ayyavu Construction</b>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <button className="quote-btn" onClick={() => navigate('/admin/login')}>
          Admin
        </button>
      </header>

      <section className="project-section">
        <div className="project-header">
          <span className="project-label">PROJECT PIPELINE</span>
          <h2 className="project-title">Our Project Journey</h2>
          <p className="project-subtitle">
            A transparent look into our active portfolio showcasing construction excellence.
          </p>
        </div>

        <div className="filter-btns">
          {['All', 'Ongoing', 'Completed', 'Upcoming'].map(status => (
            <button
              key={status}
              className={activeFilter === status ? 'active' : ''}
              onClick={() => handleFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>No projects found.</p>
        ) : (
          <div className="project-cards">
            {projects.map(project => (
              <div className="project-card" key={project.id}>
                <div
                  className="project-image"
                  style={{
                    backgroundImage: `url(${project.project_images?.[0]?.image_url || ''})`,
                    backgroundColor: '#e5e7eb'
                  }}
                />
                <span className="project-status" style={{ color: getStatusColor(project.status) }}>
                  ● {project.status?.toUpperCase()}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p style={{ fontSize: '13px', color: '#6b7280' }}>📍 {project.location}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '18px' }}>💰 {project.price}</p>
                <button
                  className="quote-btn"
                  style={{ width: '100%' }}
                  onClick={() => openModal(project)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POPUP MODAL WITH SLIDER */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            <button className="modal-close" onClick={closeModal}>✖</button>

            {/* IMAGE SLIDER */}
            <div className="modal-slider">
              {selectedProject.project_images?.length > 0 ? (
                <>
                  <img
                    src={selectedProject.project_images[currentImageIndex]?.image_url}
                    alt={selectedProject.title}
                    className="modal-main-img"
                  />

                  {/* ARROWS — only show if more than 1 image */}
                  {selectedProject.project_images.length > 1 && (
                    <>
                      <button className="slider-arrow slider-left" onClick={prevImage}>&#10094;</button>
                      <button className="slider-arrow slider-right" onClick={nextImage}>&#10095;</button>

                      {/* DOTS */}
                      <div className="slider-dots">
                        {selectedProject.project_images.map((_, i) => (
                          <span
                            key={i}
                            className={`slider-dot ${i === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(i)}
                          />
                        ))}
                      </div>

                      {/* THUMBNAILS */}
                      <div className="modal-thumbs">
                        {selectedProject.project_images.map((img, i) => (
                          <img
                            key={i}
                            src={img.image_url}
                            alt={`thumb-${i}`}
                            className={`modal-thumb ${i === currentImageIndex ? 'active-thumb' : ''}`}
                            onClick={() => setCurrentImageIndex(i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="modal-no-img">No Image</div>
              )}
            </div>

            {/* DETAILS */}
            <div className="modal-content">
              <h2>{selectedProject.title}</h2>
              <span
                className="modal-status"
                style={{ background: getStatusColor(selectedProject.status) }}
              >
                {selectedProject.status}
              </span>
              <p><strong>📍 Location:</strong> {selectedProject.location}</p>
              <p><strong>💰 Price:</strong> {selectedProject.price}</p>
              <p style={{ marginTop: '12px', color: '#94a3b8', lineHeight: '1.7' }}>
                {selectedProject.description}
              </p>

              {/* ENQUIRY FORM */}
              {!showEnquiryForm ? (
                <button
                  className="primary-btn"
                  style={{ width: '100%', marginTop: '20px' }}
                  onClick={() => setEnquiryProject(selectedProject)}
                >
                  Enquire Now
                </button>
              ) : (
                <form onSubmit={handleEnquiry} style={{ marginTop: '20px' }}>
                  <p style={{ color: '#60a5fa', fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>
                    Enquiry for: {selectedProject.title}
                  </p>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      style={{
                        padding: '10px 14px', borderRadius: '8px',
                        border: '1px solid #334155', background: '#1e293b',
                        color: '#fff', fontSize: '14px', fontFamily: 'inherit'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      style={{
                        padding: '10px 14px', borderRadius: '8px',
                        border: '1px solid #334155', background: '#1e293b',
                        color: '#fff', fontSize: '14px', fontFamily: 'inherit'
                      }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      style={{
                        padding: '10px 14px', borderRadius: '8px',
                        border: '1px solid #334155', background: '#1e293b',
                        color: '#fff', fontSize: '14px', fontFamily: 'inherit'
                      }}
                    />
                    <textarea
                      name="message"
                      placeholder="Your message..."
                      rows={3}
                      style={{
                        padding: '10px 14px', borderRadius: '8px',
                        border: '1px solid #334155', background: '#1e293b',
                        color: '#fff', fontSize: '14px', fontFamily: 'inherit',
                        resize: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="submit"
                        className="primary-btn"
                        style={{ flex: 1 }}
                        disabled={enquiryLoading}
                      >
                        {enquiryLoading ? 'Sending...' : 'Send Enquiry'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEnquiryForm(false)}
                        style={{
                          padding: '10px 16px', borderRadius: '8px',
                          border: '1px solid #334155', background: 'transparent',
                          color: '#94a3b8', cursor: 'pointer', fontSize: '14px'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
      {enquiryProject && (
      <EnquiryPopup
        project={enquiryProject}
        onClose={() => setEnquiryProject(null)}
      />
      )}
      <Footer />
    </>
  )
}

export default Projects