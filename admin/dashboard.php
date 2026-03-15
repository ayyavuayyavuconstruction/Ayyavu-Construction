<?php

session_start();

if(!isset($_SESSION['admin'])){
header("Location: login.php");
exit();
}

?>

<style>

    header {
      width: 95%;
      padding: 16px 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
    }

    .logo {
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
    }

    .logo img {
    width: 28px;       /* adjust size */
    height: 28px;
    /* fill: #2563eb;     works if SVG uses currentColor */
    }

    /*.logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 18px;
    }

    .logo span {
      color: #2563eb;
      font-size: 20px;
    }*/

    nav ul {
      list-style: none;
      display: flex;
      gap: 28px;
      font-size: 14px;
    }

    nav ul li {
      cursor: pointer;
      transition: color 0.3s ease;
    }

    nav ul li:hover {
      color: #2563eb;
    }

    /* .quote-btn {
      background-color: #2563eb;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .quote-btn:hover {
      background-color: #1e4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
    } */

    .dashboard{
    text-align:center;
    padding:40px;
    color:white;
    }

    .dashboard h1{
    margin-bottom:30px;
    }

    .dashboard-cards{
    display:flex;
    justify-content:center;
    gap:20px;
    flex-wrap:wrap;
    }

    .dash-card{
    background:#1e293b;
    padding: 115px;;
    border-radius:12px;
    width: 370px;
    box-shadow:0 0 10px rgba(0,0,0,0.4);
    transition:0.3s;
    }

    .dash-card:hover{
    transform:scale(1.05);
    }

    .dash-card button{
    margin-top:10px;
    padding:8px 15px;
    border:none;
    background:#38bdf8;
    color:black;
    border-radius:6px;
    cursor:pointer;
    }

    /* NavBar */
    .quote-btn {
      background-color: #2563eb;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      /* margin-left: 1500px; */
    }

    .quote-btn:hover {
      background-color: #1e4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
    }

    /* Footer Animation */
    .footer-section {
  background: linear-gradient(180deg, #0b1220, #020617);
  color: #cbd5e1;
  padding: 70px 80px 30px;
  margin-top: 150px;
}

.footer-container {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 60px;
  margin-bottom: 50px;
}

.footer-logo {
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
    }

    .logo img {
    width: 28px;       /* adjust size */
    height: 28px;
    /* fill: #2563eb;     works if SVG uses currentColor */
    }

.footer-text {
  font-size: 14px;
  line-height: 1.7;
  margin: 18px 0 24px;
  color: #94a3b8;
}

/* SOCIAL ICONS */
.social-links {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #111827;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #2563eb;
  transform: translateY(-3px);
}

/* FOOTER COLUMNS */
.footer-column h4 {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 18px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column a {
  text-decoration: none;
  font-size: 14px;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #ffffff;
}

/* CONTACT */
.footer-column p {
  font-size: 14px;
  margin-bottom: 14px;
  color: #94a3b8;
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 14px;
}

.contact-item svg {
  width: 16px;
  height: 16px;
  fill: #2563eb;
  margin-top: 3px;
}


/* BOTTOM BAR */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #64748b;
}

.footer-legal a {
  margin-left: 18px;
  text-decoration: none;
  color: #64748b;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: #ffffff;
}

.social-icon
{
    fill: #ffffff; /* Changes the background color */
   /* stroke: #000;  Changes the outline color */
   /* width: 100px; */
}
</style>

<!DOCTYPE html>
<html>

<head>

<title>Admin Dashboard</title>

</head>

<body>
    <header>
    <div class="logo">
    <span><img src="../assets/images/Logo.png" alt="Logo"></span>
    <b>Ayyavu Construction</b>
    </div>
    <button class="quote-btn" onclick="window.location.href='../projects.php'">Logout</button>
    </header>

<div class="dashboard">

<h1>Admin Dashboard</h1>

<div class="dashboard-cards">

<div class="dash-card">
<h3>Add Property</h3>
<button onclick="window.location.href='add-project.php'">Add</button>
</div>

<div class="dash-card">
<h3>Edit Properties</h3>
<button onclick="window.location.href='edit-project.php'">Edit</button>
</div>

<!-- <div class="dash-card">
<h3>Logout</h3>
<button onclick="logout()">Logout</button>
</div> -->

</div>

</div>

<!-- FOOTER -->
 <footer class="footer-section">
  <div class="footer-container">

    <!-- BRAND -->
    <div class="footer-brand">
      <h3 class="logo">
        <span style="margin-left: -205px;"><img src="../assets/images/Logo.png" alt="Logo"></span> Ayyavu Construction
      </h3>
      <p class="footer-text">
        Leading the industry with high-quality architectural solutions and
        sustainable building practices since 2003.
      </p>

      <div class="social-links">
  <a href="#" class="social-icon" aria-label="Facebook">
    <svg viewBox="0 0 24 24">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z"/>
    </svg>
  </a>

  <a href="#" class="social-icon" aria-label="Twitter">
    <svg viewBox="0 0 24 24">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.6 8.6 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 9.5a12.14 12.14 0 0 1-8.8-4.46 4.28 4.28 0 0 0 1.33 5.7A4.23 4.23 0 0 1 2 10.2v.05a4.28 4.28 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.5 12.13 12.13 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0 0 22.46 6z"/>
    </svg>
  </a>

  <a href="#" class="social-icon" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24">
      <path d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96zM3 21h4v-12H3v12zm7 0h4v-6.5c0-3.9 5-4.2 5 0V21h4v-7.7c0-7-8-6.7-9-3.3V9H10v12z"/>
    </svg>
  </a>
</div>

    </div>

    <!-- QUICK LINKS -->
    <div class="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="index.php" >Home</a></li>
        <li><a href="about.html" >About Us</a></li>
        <li><a href="projects.php">Projects</a></li>
        <li><a href="contact.html" >Contact Us</a></li>
        <!-- <li><a href="blog.html" >Blog</a></li> -->
      </ul>
    </div>

    <!-- SERVICES -->
    <div class="footer-column">
      <h4>Projects</h4>
      <ul>
        <li><a href="projects.php" style="color: inherit; text-decoration: none; ">Completed Projects</a></li>
        <li><a href="projects.php" style="color: inherit; text-decoration: none; ">Ongoing Projects</a></li>
        <li><a href="projects.php" style="color: inherit; text-decoration: none; ">Upcoming Projects</a></li>
      </ul>
    </div>

    <!-- CONTACT -->
    <div class="footer-column">
      <h4>Contact Us</h4>
      <p>📍 No-17, Vidhya Colony 5th cross, Thadagam rd<br />
                      TVS Nagar, Coimbatore - 641025</p>
      <p>📞<a href="tel:+91 93604 93616">+91 93604 93616</a></p>
      <p>📞<a href="tel:+91 93604 93616">+91 93457 70330</a></p>
      <p>✉️ <a href="mailto:ayyavu.ayyavupromoters@gmail.com">ayyavu.ayyavupromoters@gmail.com </a></p>
    </div>

  </div>

  <!-- BOTTOM BAR -->
  <div class="footer-bottom">
    <p>© 2026 Ayyavu Construction. All rights reserved.</p>
    <div class="footer-legal">
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Policy</a>
    </div>
  </div>
</footer>

</body>

</html>