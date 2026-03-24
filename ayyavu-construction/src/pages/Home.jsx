import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { supabase } from '../supabase.js'

function Home() {
  const [projects, setProjects] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const testimonials = [
    {
      text: "Ayyavu Construction transformed our vision into a breathtaking reality. Their attention to structural integrity and aesthetic detail is world-class. We couldn't be happier with our new corporate headquarters.",
      name: "Jonathan Vickers",
      role: "CEO, Global Tech Dynamics"
    },
    {
      text: "From planning to execution, the professionalism and transparency shown by Ayyavu Construction were exceptional. Our residential project was delivered on time with outstanding quality.",
      name: "Meera Raghavan",
      role: "Homeowner, Coimbatore"
    },
    {
      text: "The team demonstrated unmatched expertise in commercial construction. Their ability to manage complex requirements while maintaining quality standards truly sets them apart in the industry.",
      name: "Arun Prakash",
      role: "Director, Prime Infra Solutions"
    }
  ]

  useEffect(() => {
    fetchProjects()
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_images(image_url)')
      .order('id', { ascending: false })
      .limit(3)

    if (!error) setProjects(data)
  }

  function getStatusColor(status) {
    if (status === 'Completed') return '#22c55e'
    if (status === 'Ongoing') return '#f97316'
    return '#3b82f6'
  }

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero-wrapper">
        <div className="hero">
          <div className="hero-content">
            <h1>Creating Heavens<br />On Earth</h1>
            <p>Expert residential, commercial, and industrial construction services dedicated to quality, precision, and architectural excellence.</p>
            <div className="hero-buttons">
              <Link to="/projects"><button className="primary-btn">View Projects</button></Link>
              <Link to="/contact"><button className="secondary-btn">Contact Us</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="expertise-section">
        <p className="expertise-label">OUR EXPERTISE</p>
        <h2 className="expertise-title">Comprehensive Solutions</h2>
        <div className="expertise-cards">
          {[
            { icon: '🏠', title: 'Residential', desc: 'Custom luxury homes and residential developments built with unmatched attention to detail.' },
            { icon: '🏢', title: 'Commercial', desc: 'Modern office spaces, retail hubs, and scalable business infrastructure for the modern enterprise.' },
            { icon: '🛠️', title: 'Renovation', desc: 'Transforming and modernizing existing structures while preserving core architectural integrity.' },
            { icon: '📋', title: 'Management', desc: 'Full-cycle project oversight from concept to completion, ensuring timelines and budgets are met.' },
          ].map((item, i) => (
            <div className="expertise-card" key={i}>
              <div className="icon-box">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper">
            <img src="/assets/images/about.png" alt="Construction Team" className="about-image" />
            <div className="experience-badge">
              <span className="years">20+</span>
              <span className="text">Years of<br />Excellence</span>
            </div>
          </div>
          <div className="about-content">
            <p className="about-label">ABOUT AYYAVU CONSTRUCTION</p>
            <h2 className="about-title">We build structures that<br />stand the test of time.</h2>
            <p className="about-description">
              With over two decades of industry leadership, Ayyavu Construction has established a reputation
              for uncompromising quality and integrity. We believe that every project, regardless of scale,
              deserves precision engineering and sustainable design.
            </p>
            <div className="about-features">
              <div className="feature">
                <h4>Quality Materials</h4>
                <p>Sourced from top global suppliers for longevity.</p>
              </div>
              <div className="feature">
                <h4>Expert Team</h4>
                <p>Certified architects and master craftsmen.</p>
              </div>
            </div>
            <Link to="/about" className="about-link">Learn More About Our Values →</Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
<section className="project-section">
  <div className="project-header">
    <span className="project-label">PROJECT PIPELINE</span>
    <h2 className="project-title">Our Project Journey</h2>
    <p className="project-subtitle">
      A transparent look into our active portfolio, showcasing the lifecycle of our commitment to building excellence.
    </p>
  </div>
  <div className="project-cards">
    {projects.length === 0 ? (
      <p style={{ color: '#6b7280', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
        Loading projects...
      </p>
    ) : (
      projects.map(project => (
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
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>📍 {project.location}</p>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '18px' }}>💰 {project.price}</p>
          <button
            className="view-details-btn"
            onClick={() => setSelectedProject(project)}
          >
            View Details →
          </button>
        </div>
      ))
    )}
  </div>
</section>

      {/* CONTACT MINI */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-image" />
          <div className="contact-content">
            <span className="contact-label">GET IN TOUCH</span>
            <h2 className="contact-title">Let's Start Your Journey</h2>
            <p className="contact-description">
              Have a vision in mind? Reach out today for a complimentary consultation.
              Our experts are ready to discuss your next masterpiece.
            </p>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Briefly describe your project goals..." required />
              </div>
              <button type="submit" className="contact-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="portfolio-section">
        <div className="portfolio-header">
          <div>
            <span className="portfolio-label">OUR PORTFOLIO</span>
            <h2 className="portfolio-title">Recent Masterpieces</h2>
          </div>
          <Link to="/projects" className="portfolio-link">View All Projects</Link>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-card" style={{ backgroundImage: 'url(/assets/images/image1.jpg)' }} />
          <div className="portfolio-card" style={{ backgroundImage: 'url(/assets/images/image2.jpg)' }} />
          <div className="portfolio-card" style={{ backgroundImage: 'url(/assets/images/image3.jpg)' }} />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="quote-icon">
            <img src="/assets/images/quote.svg" alt="Quote" style={{ width: 48, height: 48 }} />
          </div>
          {testimonials.map((t, i) => (
            <div className={`testimonial-slide ${i === currentSlide ? 'active' : ''}`} key={i}>
              <p className="testimonial-text">{t.text}</p>
              <h4 className="testimonial-name">{t.name}</h4>
              <span className="testimonial-role">{t.role}</span>
            </div>
          ))}
          <button className="arrow left" onClick={() => setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length)}>&#10094;</button>
          <button className="arrow right" onClick={() => setCurrentSlide(prev => (prev + 1) % testimonials.length)}>&#10095;</button>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <span key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-text">
            <h2>Ready to start your next project?</h2>
            <p>Get a free consultation and personalized quote from our experts.</p>
          </div>
          <div className="cta-action">
            <Link to="/contact" className="cta-btn">Request a Consultation</Link>
          </div>
        </div>
      </section>

      
      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => { setSelectedProject(null); setCurrentImageIndex(0) }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            <button className="modal-close" onClick={() => { setSelectedProject(null); setCurrentImageIndex(0) }}>✖</button>

            {/* IMAGE SLIDER */}
            <div className="modal-slider">
              {selectedProject.project_images?.length > 0 ? (
                <>
                  <img
                    src={selectedProject.project_images[currentImageIndex]?.image_url}
                    alt={selectedProject.title}
                    className="modal-main-img"
                  />
                  {selectedProject.project_images.length > 1 && (
                    <>
                      <button className="slider-arrow slider-left"
                        onClick={e => { e.stopPropagation(); setCurrentImageIndex(prev => (prev - 1 + selectedProject.project_images.length) % selectedProject.project_images.length) }}>
                        &#10094;
                      </button>
                      <button className="slider-arrow slider-right"
                        onClick={e => { e.stopPropagation(); setCurrentImageIndex(prev => (prev + 1) % selectedProject.project_images.length) }}>
                        &#10095;
                      </button>
                      <div className="slider-dots">
                        {selectedProject.project_images.map((_, i) => (
                          <span key={i} className={`slider-dot ${i === currentImageIndex ? 'active' : ''}`}
                            onClick={e => { e.stopPropagation(); setCurrentImageIndex(i) }} />
                        ))}
                      </div>
                      <div className="modal-thumbs">
                        {selectedProject.project_images.map((img, i) => (
                          <img key={i} src={img.image_url} alt={`thumb-${i}`}
                            className={`modal-thumb ${i === currentImageIndex ? 'active-thumb' : ''}`}
                            onClick={e => { e.stopPropagation(); setCurrentImageIndex(i) }} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="modal-no-img">No Image</div>
              )}
            </div>

            <div className="modal-content">
              <h2>{selectedProject.title}</h2>
              <span className="modal-status" style={{ background: getStatusColor(selectedProject.status) }}>
                {selectedProject.status}
              </span>
              <p><strong>📍 Location:</strong> {selectedProject.location}</p>
              <p><strong>💰 Price:</strong> {selectedProject.price}</p>
              <p style={{ marginTop: '12px', color: '#94a3b8', lineHeight: '1.7' }}>
                {selectedProject.description}
              </p>
              {selectedProject.details && (
                <p style={{ marginTop: '8px', color: '#94a3b8', lineHeight: '1.7' }}>
                  {selectedProject.details}
                </p>
              )}
              <button className="primary-btn" style={{ width: '100%', marginTop: '20px' }}
                onClick={() => { setSelectedProject(null); window.location.href = '/contact' }}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Home