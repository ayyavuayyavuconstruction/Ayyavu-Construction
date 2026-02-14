const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));
app.use(session({
  secret: 'ayyavu-construction-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Database initialization
const db = new sqlite3.Database('construction.db');

// Initialize database tables
db.serialize(() => {
  // Admin users table
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Projects table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    status TEXT CHECK(status IN ('completed', 'ongoing', 'upcoming')) NOT NULL,
    category TEXT,
    image_url TEXT,
    area TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    price DECIMAL(15,2),
    completion_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create default admin user (username: admin, password: admin123)
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)`, 
    ['admin', hashedPassword]);

  // Insert sample projects
  const sampleProjects = [
    {
      title: 'Skyline Apartments',
      description: 'Luxury residential complex with modern amenities and stunning city views.',
      location: 'Chennai, Tamil Nadu',
      status: 'completed',
      category: 'Residential',
      image_url: 'completed.jpg',
      area: '1200-2500 sq ft',
      bedrooms: 3,
      bathrooms: 2,
      price: 8500000,
      completion_date: '2023-12-15'
    },
    {
      title: 'Industrial Complex X',
      description: 'State-of-the-art industrial facility with advanced manufacturing capabilities.',
      location: 'Coimbatore, Tamil Nadu',
      status: 'ongoing',
      category: 'Industrial',
      image_url: 'ongoing.jpg',
      area: '50000 sq ft',
      bedrooms: null,
      bathrooms: null,
      price: 125000000,
      completion_date: '2024-08-30'
    },
    {
      title: 'Blue Horizon Villas',
      description: 'Premium villa community with private gardens and exclusive amenities.',
      location: 'Madurai, Tamil Nadu',
      status: 'upcoming',
      category: 'Residential',
      image_url: 'upcoming.jpg',
      area: '3000-4500 sq ft',
      bedrooms: 4,
      bathrooms: 3,
      price: 15000000,
      completion_date: '2025-06-15'
    },
    {
      title: 'City Center Plaza',
      description: 'Modern commercial complex in the heart of the business district.',
      location: 'Bangalore, Karnataka',
      status: 'completed',
      category: 'Commercial',
      image_url: 'portfolio-1.jpg',
      area: '25000 sq ft',
      bedrooms: null,
      bathrooms: null,
      price: 75000000,
      completion_date: '2023-09-20'
    },
    {
      title: 'Emerald Heights',
      description: 'Eco-friendly residential towers with sustainable design features.',
      location: 'Kochi, Kerala',
      status: 'ongoing',
      category: 'Residential',
      image_url: 'portfolio-2.jpg',
      area: '1500-3000 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      price: 12000000,
      completion_date: '2024-12-10'
    },
    {
      title: 'Modern Office Hub',
      description: 'Contemporary office spaces with cutting-edge technology infrastructure.',
      location: 'Pune, Maharashtra',
      status: 'completed',
      category: 'Commercial',
      image_url: 'portfolio-3.jpg',
      area: '15000 sq ft',
      bedrooms: null,
      bathrooms: null,
      price: 45000000,
      completion_date: '2023-11-05'
    }
  ];

  const insertProject = db.prepare(`INSERT OR IGNORE INTO projects 
    (title, description, location, status, category, image_url, area, bedrooms, bathrooms, price, completion_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  sampleProjects.forEach(project => {
    insertProject.run(
      project.title, project.description, project.location, project.status,
      project.category, project.image_url, project.area, project.bedrooms,
      project.bathrooms, project.price, project.completion_date
    );
  });

  insertProject.finalize();
});

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

// Routes

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.adminId = user.id;
    res.json({ success: true, message: 'Login successful' });
  });
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});

// Check admin authentication
app.get('/api/admin/check', (req, res) => {
  res.json({ authenticated: !!req.session.adminId });
});

// Get all projects
app.get('/api/projects', (req, res) => {
  const { status, category } = req.query;
  let query = 'SELECT * FROM projects';
  let params = [];
  
  if (status || category) {
    query += ' WHERE';
    const conditions = [];
    
    if (status) {
      conditions.push(' status = ?');
      params.push(status);
    }
    
    if (category) {
      conditions.push(' category = ?');
      params.push(category);
    }
    
    query += conditions.join(' AND');
  }
  
  query += ' ORDER BY created_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(row);
  });
});

// Create project (admin only)
app.post('/api/admin/projects', requireAuth, upload.single('image'), (req, res) => {
  const {
    title, description, location, status, category, area,
    bedrooms, bathrooms, price, completion_date
  } = req.body;
  
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  
  const query = `INSERT INTO projects 
    (title, description, location, status, category, image_url, area, bedrooms, bathrooms, price, completion_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [
    title, description, location, status, category, image_url,
    area, bedrooms || null, bathrooms || null, price || null, completion_date
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ success: true, id: this.lastID, message: 'Project created successfully' });
  });
});

// Update project (admin only)
app.put('/api/admin/projects/:id', requireAuth, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const {
    title, description, location, status, category, area,
    bedrooms, bathrooms, price, completion_date
  } = req.body;
  
  let query = `UPDATE projects SET 
    title = ?, description = ?, location = ?, status = ?, category = ?,
    area = ?, bedrooms = ?, bathrooms = ?, price = ?, completion_date = ?,
    updated_at = CURRENT_TIMESTAMP`;
  
  let params = [
    title, description, location, status, category,
    area, bedrooms || null, bathrooms || null, price || null, completion_date
  ];
  
  if (req.file) {
    query += ', image_url = ?';
    params.push(`/uploads/${req.file.filename}`);
  }
  
  query += ' WHERE id = ?';
  params.push(id);
  
  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project updated successfully' });
  });
});

// Delete project (admin only)
app.delete('/api/admin/projects/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Admin credentials: username: admin, password: admin123');
});