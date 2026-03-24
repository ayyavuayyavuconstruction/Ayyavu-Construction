import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase.js'

function Enquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('admin_logged_in') !== 'yes') {
      navigate('/admin/login')
      return
    }
    fetchEnquiries()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchEnquiries() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setEnquiries(data)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this enquiry?')) return
    await supabase.from('contacts').delete().eq('id', id)
    fetchEnquiries()
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="/assets/images/Logo.PNG" alt="Logo" style={{ width: 28, height: 28 }} />
          <b>Ayyavu Construction</b>
        </div>
        <button className="quote-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back
        </button>
      </header>

      <div style={{ padding: '40px 60px', minHeight: '100vh', background: '#f8fafc' }}>
        <h1 style={{ marginBottom: '30px', color: '#111827' }}>
          Customer Enquiries ({enquiries.length})
        </h1>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading...</p>
        ) : enquiries.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No enquiries yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {enquiries.map(enq => (
              <div key={enq.id} style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'start'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <span style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>
                      {enq.name}
                    </span>
                    <span style={{ fontSize: '14px', color: '#2563eb' }}>{enq.email}</span>
                    {enq.project_type && (
                      <span style={{
                        fontSize: '12px', background: '#eef2ff', color: '#2563eb',
                        padding: '2px 10px', borderRadius: '20px', fontWeight: '600'
                      }}>
                        {enq.project_type}
                      </span>
                    )}
                  </div>
                  {enq.subject && (
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                      {enq.subject}
                    </p>
                  )}
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                    {enq.message}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '10px' }}>
                    📅 {new Date(enq.created_at).toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(enq.id)}
                  style={{
                    background: '#fee2e2', color: '#dc2626',
                    border: 'none', borderRadius: '8px',
                    padding: '8px 14px', cursor: 'pointer',
                    fontSize: '13px', fontWeight: '600'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Enquiries