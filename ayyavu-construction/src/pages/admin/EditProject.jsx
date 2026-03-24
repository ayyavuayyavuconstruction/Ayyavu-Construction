import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase.js'

function EditProject() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({})
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('admin_logged_in') !== 'yes') {
      navigate('/admin/login')
      return
    }
    fetchProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*, project_images(id, image_url)')
      .order('id', { ascending: false })
    setProjects(data || [])
  }

  function handleSelect(project) {
    setSelected(project)
    setForm({
      title: project.title,
      description: project.description,
      details: project.details || '',
      price: project.price,
      location: project.location,
      status: project.status
    })
    setNewImages([])
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setLoading(true)

    // Update project details
    const { error } = await supabase
      .from('projects')
      .update({
        title: form.title,
        description: form.description,
        details: form.details,
        price: form.price,
        location: form.location,
        status: form.status
      })
      .eq('id', selected.id)

    if (error) {
      alert('Update failed: ' + error.message)
      setLoading(false)
      return
    }

    // Upload new images
    for (let i = 0; i < newImages.length; i++) {
      const file = newImages[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${selected.id}_${Date.now()}_${i}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, { upsert: false })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)

        await supabase
          .from('project_images')
          .insert([{ project_id: selected.id, image_url: urlData.publicUrl }])
      }
    }

    alert('Project Updated Successfully!')
    setSelected(null)
    setNewImages([])
    fetchProjects()
    setLoading(false)
  }

  async function handleDeleteImage(imgId, imgUrl) {
    if (!window.confirm('Delete this image?')) return

    const fileName = imgUrl.split('/').pop()
    await supabase.storage.from('project-images').remove([fileName])
    await supabase.from('project_images').delete().eq('id', imgId)

    setSelected(prev => ({
      ...prev,
      project_images: prev.project_images.filter(img => img.id !== imgId)
    }))
    fetchProjects()
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    setLoading(true)

    const { data: imgs } = await supabase
      .from('project_images')
      .select('image_url')
      .eq('project_id', selected.id)

    for (const img of imgs || []) {
      const fileName = img.image_url.split('/').pop()
      await supabase.storage.from('project-images').remove([fileName])
    }

    await supabase.from('project_images').delete().eq('project_id', selected.id)
    await supabase.from('projects').delete().eq('id', selected.id)

    alert('Project Deleted!')
    setSelected(null)
    fetchProjects()
    setLoading(false)
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="../public/assets/images/Logo.png" alt="Logo" />
          <b>Ayyavu Construction</b>
        </div>
        <button className="quote-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back
        </button>
      </header>

      <div style={{ padding: '40px 60px', background: '#0f172a', minHeight: '100vh' }}>
        <h1 style={{ color: 'white', marginBottom: '30px' }}>
          {selected ? 'Edit Project' : 'Select Project to Edit'}
        </h1>

        {/* PROJECT LIST */}
        {!selected && (
          <div className="project-cards">
            {projects.map(project => (
              <div className="project-card" key={project.id}>
                {project.project_images?.[0] && (
                  <img
                    src={project.project_images[0].image_url}
                    alt={project.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }}
                  />
                )}
                <h3>{project.title}</h3>
                <p style={{ fontSize: '13px' }}>📍 {project.location}</p>
                <p style={{ fontSize: '13px', marginBottom: '14px' }}>💰 {project.price}</p>
                <button
                  className="quote-btn"
                  style={{ width: '100%' }}
                  onClick={() => handleSelect(project)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* EDIT FORM */}
        {selected && (
          <div className="add-project-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Edit — {selected.title}</h2>

            {/* EXISTING IMAGES */}
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '10px' }}>
              Current Images ({selected.project_images?.length || 0}):
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {selected.project_images?.map(img => (
                <div key={img.id} style={{ position: 'relative' }}>
                  <img
                    src={img.image_url}
                    alt="project"
                    style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <button
                    onClick={() => handleDeleteImage(img.id, img.image_url)}
                    style={{
                      position: 'absolute', top: '3px', right: '3px',
                      background: 'red', color: 'white', border: 'none',
                      borderRadius: '50%', width: '18px', height: '18px',
                      cursor: 'pointer', fontSize: '10px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center'
                    }}
                  >✖</button>
                </div>
              ))}
            </div>

            <form onSubmit={handleUpdate}>
              <label>Project Title</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required></textarea>

              <label>Details</label>
              <textarea name="details" value={form.details} onChange={handleChange}></textarea>

              <label>Price</label>
              <input type="text" name="price" value={form.price} onChange={handleChange} required />

              <label>Location</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} required />

              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
              </select>

              <label>Add More Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setNewImages(Array.from(e.target.files))}
              />
              {newImages.length > 0 && (
                <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
                  {newImages.length} new image(s) selected
                </p>
              )}

              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Project'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                style={{ background: 'red', marginTop: '10px' }}
              >
                {loading ? 'Deleting...' : '🗑 Delete Project'}
              </button>

              <button
                type="button"
                onClick={() => setSelected(null)}
                style={{ background: '#475569', marginTop: '10px' }}
              >
                ← Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default EditProject