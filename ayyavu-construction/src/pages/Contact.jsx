import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { supabase } from '../supabase.js'

function Contact() {
  async function handleSubmit(e) {
  e.preventDefault()

  const name = e.target[0].value
  const email = e.target[1].value
  const projectType = e.target[2].value
  const subject = e.target[3].value
  const message = e.target[4].value

  const { error } = await supabase
    .from('contacts')
    .insert([{
      name,
      email,
      project_type: projectType,
      subject,
      message
    }])

  if (error) {
    alert('Error sending message: ' + error.message)
    return
  }

  alert('Message sent successfully!')
  e.target.reset()
}

  return (
    <>
      <Navbar />

      <section className="contact-page-section">
        <div className="contact-page-container">

          <div className="contact-left">
            <h2>Get in Touch</h2>
            <p className="contact-subtext">
              Let's discuss your next project. Our team of experts is ready to bring your
              vision to life with precision and excellence.
            </p>

            <h4 className="contact-info-title">Contact Information</h4>

            {[
              {
                icon: '📍',
                title: 'Our Office',
                lines: ['No-17, Vidhya Colony 5th cross, Thadagam rd,', 'TVS Nagar, Coimbatore - 641025'],
              },
              {
                icon: '📞',
                title: 'Call Us',
                lines: ['+91 93604 93616', '+91 93457 70330'],
              },
              {
                icon: '✉️',
                title: 'Email Us',
                lines: ['ayyavu.ayyavupromoters@gmail.com'],
              },
            ].map((item, i) => (
              <div className="info-card" key={i}>
                <div className="info-icon">{item.icon}</div>
                <div>
                  <h5>{item.title}</h5>
                  {item.lines.map((line, j) => <p key={j}>{line}</p>)}
                </div>
              </div>
            ))}

            <div className="contact-bottom">
              <div>
                <h6>OFFICE HOURS</h6>
                <p>Mon–Sat: 9:00 AM – 6:00 PM<br />Sunday: Closed</p>
              </div>
              <div>
                <h6>FOLLOW US</h6>
                <div className="contact-social">
                  <a href="#">in</a>
                  <a href="#">ig</a>
                  <a href="#">x</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Project Type</label>
                  <select>
                    <option>Select a type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Project Inquiry" required />
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your project requirements..." required></textarea>
              </div>

              <button type="submit" className="send-btn">Send Message →</button>
            </form>
          </div>

        </div>
      </section>

      <section className="map-section">
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4!2d76.9897!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3NsKwNTknMjMuMCJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen={true}
            loading="lazy"
            title="Ayyavu Office Location"
          ></iframe>
          <div className="map-info-card">
            <h4>Ayyavu Office</h4>
            <p>TVS Nagar, Coimbatore - 641025</p>
            
             <a href="https://maps.app.goo.gl/zMVJQCjGij7hfkPu7"
              target="_blank"
              rel="noreferrer"
              className="map-btn"
            >
              OPEN IN GOOGLE MAPS ↗
                </a>
          </div>
        </div>
      </section>

      <Footer />
    // </>
  )
}

export default Contact