import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <Navbar />

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <p className="breadcrumb">
              <Link to="/">Home</Link> &nbsp;›&nbsp; <span>About Us</span>
            </p>
            <h1>About Ayyavu Construction</h1>
          </div>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="about-story">
        <div className="about-story-wrapper">
          <div className="about-story-image">
            <img src="/assets/images/about-building.png" alt="Ayyavu Construction Building" />
          </div>
          <div className="about-story-content">
            <span className="about-tag">ESTABLISHED 2003</span>
            <h2>Crafting Excellence for Over Two Decades</h2>
            <p>
              Ayyavu Construction began as a visionary family enterprise with a
              singular goal: to redefine the structural landscape of our nation.
              Over the last 25 years, we have transitioned from local residential
              projects to constructing massive commercial landmarks and industrial
              infrastructures.
            </p>
            <p>
              Our mission is to provide high-quality construction services with a
              focus on integrity and innovation. We believe that every brick laid
              is a testament to our commitment to durability and aesthetic excellence.
            </p>
            <p>
              Today, with over 500 completed projects, our vision remains clear —
              shaping the future of urban landscapes through sustainable practices
              and cutting-edge engineering solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="core-values">
        <h2 className="section-title">Our Core Values</h2>
        <div className="core-values-grid">
          {[
            {
              title: 'Integrity',
              desc: 'Honesty and transparency are at the foundation of every client partnership.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <path d="M12 3L4 7v5c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V7l-8-4Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )
            },
            {
              title: 'Innovation',
              desc: 'We leverage modern technology and smart materials to build better and faster.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <path d="M12 2a7 7 0 0 0-4 12v3h8v-3a7 7 0 0 0-4-12Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 21h6" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )
            },
            {
              title: 'Quality',
              desc: 'Uncompromising standards in materials and workmanship on every project site.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <path d="M12 3l3 6 6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 9.9 9 9l3-6Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )
            },
            {
              title: 'Safety',
              desc: 'Prioritizing the well-being of our workers and the public above all else.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <path d="M12 3L5 6v6c0 4.5 3 8.5 7 9.5 4-1 7-5 7-9.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )
            },
          ].map((item, i) => (
            <div className="core-value-card" key={i}>
              <div className="core-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONE
      <section className="milestone">
        <h2 className="section-title">Our Milestone Journey</h2>
        <div className="timeline">
          {[
            { year: '1998', title: 'The Foundation', desc: 'Founded by Rajesh Ayyavu in a small office with a team of five passionate engineers.' },
            { year: '2005', title: 'Expanding Horizons', desc: 'Successfully completed our 100th residential complex and expanded into industrial infrastructure.' },
            { year: '2012', title: 'National Award for Excellence', desc: 'Recognized by the National Builders Council for outstanding contribution to urban design.' },
            { year: '2023', title: 'Green Initiative Launch', desc: 'Committed to 100% net-zero carbon construction for all upcoming commercial projects.' },
          ].map((item, i) => (
            <div className="timeline-row" key={i}>
              <div className="timeline-left">
                <span className="timeline-dot" />
                <span className="timeline-year">{item.year}</span>
              </div>
              <div className="timeline-right">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-text">
            <h2>Ready to build your next project with us?</h2>
            <p>Get in touch with our expert team today for a free consultation and customized quote.</p>
          </div>
          <div className="cta-action">
            <Link to="/Contact" className="cta-btn">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About