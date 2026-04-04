import { useState } from 'react'
import { supabase } from '../supabase.js'

function EnquiryPopup({ project, onClose }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const { error } = await supabase
      .from('contacts')
      .insert([{
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        project_id: project.id,
        project_title: project.title,
        subject: `Enquiry for ${project.title}`
      }])

    if (error) {
      alert('Error: ' + error.message)
      setLoading(false)
      return
    }

    alert('Enquiry sent successfully!')
    setLoading(false)
    onClose()
  }

  return (
    <>
      <div className="enquiry-popup-overlay" onClick={onClose} />
      <div className="enquiry-popup">
        <button className="enquiry-popup-close" onClick={onClose}>✕</button>
        <h3>Send Enquiry</h3>
        <span className="project-name">📋 {project.title}</span>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="tel" name="phone" placeholder="Phone Number" />
          <textarea name="message" placeholder="Your message..." />
          <div className="enquiry-popup-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EnquiryPopup