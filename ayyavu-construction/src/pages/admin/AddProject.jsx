import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase.js'

function AddProject() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    details: '',
    price: '',
    location: '',
    status: 'Ongoing'
  })
  const [images, setImages] = useState([])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    if (images.length === 0) {
      alert('Please select at least one image')
      setLoading(false)
      return
    }

    if (images.length > 5) {
      alert('Maximum 5 images allowed')
      setLoading(false)
      return
    }

    // Step 1: Insert project
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: form.title,
        description: form.description,
        details: form.details,
        price: form.price,
        location: form.location,
        status: form.status
      }])
      .select()

    if (error) {
      alert('Error adding project: ' + error.message)
      setLoading(false)
      return
    }

    const projectId = data[0].id
    console.log('Project created with ID:', projectId)

    // Step 2: Upload images one by one
    for (let i = 0; i < images.length; i++) {
      const file = images[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${projectId}_${Date.now()}_${i}.${fileExt}`

      console.log('Uploading:', fileName)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError.message)
        alert('Image upload failed: ' + uploadError.message)
        continue
      }

      console.log('Upload success:', uploadData)

      // Step 3: Get public URL
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)

      console.log('Public URL:', urlData.publicUrl)

      // Step 4: Save to project_images table
      const { error: insertError } = await supabase
        .from('project_images')
        .insert([{
          project_id: projectId,
          image_url: urlData.publicUrl
        }])

      if (insertError) {
        console.error('DB insert error:', insertError.message)
      } else {
        console.log('Image saved to DB!')
      }
    }

    alert('Project Added Successfully!')
    navigate('/admin/dashboard')
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
          Dashboard
        </button>
      </header>

      <div className="add-project-wrapper">
        <div className="add-project-card">
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>

            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>

            <label>Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
            ></textarea>

            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder="eg: ₹10,00,000"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            <label>Project Images (Max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => setImages(Array.from(e.target.files))}
            />
            {images.length > 0 && (
              <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
                {images.length} image(s) selected
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Adding Project...' : 'Add Project'}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddProject