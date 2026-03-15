<?php
include('config.php');

/* DELETE PROJECT */
if(isset($_GET['delete'])){

$id = $_GET['delete'];

/* GET COVER IMAGE */
$get = mysqli_query($conn,"SELECT image FROM projects WHERE id=$id");
$data = mysqli_fetch_assoc($get);

if($data){
$image = $data['image'];

if(file_exists("admin/uploads/".$image)){
unlink("admin/uploads/".$image);
}
}

/* DELETE GALLERY IMAGES */
$imgs = mysqli_query($conn,"SELECT image FROM project_images WHERE project_id=$id");

while($row = mysqli_fetch_assoc($imgs)){
if(file_exists("admin/uploads/".$row['image'])){
unlink("admin/uploads/".$row['image']);
}
}

/* DELETE DB RECORDS */

mysqli_query($conn,"DELETE FROM project_images WHERE project_id=$id");
mysqli_query($conn,"DELETE FROM projects WHERE id=$id");

exit("deleted");
}


/* PAGINATION */

$limit = 3;
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$start = ($page-1)*$limit;


/* FILTER */

$filter = "";

if(isset($_GET['status']) && $_GET['status'] != "All"){

$status = $_GET['status'];
$filter = "WHERE status='$status'";

}


/* TOTAL */

$total = mysqli_query($conn,"SELECT COUNT(*) as total FROM projects $filter");
$totalRow = mysqli_fetch_assoc($total);
$totalPages = ceil($totalRow['total']/$limit);


/* GET PROJECTS */

$result = mysqli_query($conn,"SELECT * FROM projects $filter ORDER BY id DESC LIMIT $start,$limit");

?>

<!DOCTYPE html>
<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Ayyavu Construction - Projects</title>
<!-- <link rel="stylesheet" href="assets/css/style.css"> -->
<style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Segoe UI", sans-serif;
    }

    body {
      background-color: #ffffff;
      color: #1f2937;
    }

    /* ---------- NAVBAR ---------- */
    header {
      width: 100%;
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

    .quote-btn {
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
    }

    .admin-btn{
      background-color: #2563eb;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    /* ---------- HERO SECTION ---------- */
    .hero-wrapper {
      padding: 40px 60px;
    }

    .hero {
      position: relative;
      height: 460px;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(
          to right,
          rgba(15, 23, 42, 0.75),
          rgba(15, 23, 42, 0.25)
        ),
        url("assets/images/Hero.PNG") center/cover no-repeat;
      display: flex;
      align-items: center;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .hero:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    }

    .hero-content {
      max-width: 520px;
      padding-left: 60px;
      color: #ffffff;
    }

    .hero-content h1 {
      font-size: 44px;
      line-height: 1.2;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .hero-content p {
      font-size: 16px;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 28px;
    }

    .hero-buttons {
      display: flex;
      gap: 16px;
    }

    .primary-btn {
      background-color: #2563eb;
      color: #ffffff;
      padding: 12px 22px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .primary-btn:hover {
      background-color: #1e4ed8;
      transform: translateY(-2px);
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.4);
    }

    .secondary-btn {
      background-color: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 12px 22px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .secondary-btn:hover {
      background-color: rgba(255, 255, 255, 0.35);
      transform: translateY(-2px);
    }

    /* ---------- PROJECT SECTION ---------- */
    .project-section {
    padding: 50px 60px;
    }

    .project-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 60px;
    }

    .project-label {
    font-size: 12px;
    font-weight: 600;
    color: #2563eb;
    letter-spacing: 1.4px;
    display: inline-block;
    margin-bottom: 12px;
    }

    .project-title {
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 14px;
    }

    .project-subtitle {
    font-size: 15px;
    line-height: 1.7;
    color: #6b7280;
    }

    /* CARD GRID */
    .project-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px;
    }

    /* CARD */
    .project-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 26px 38px -22px rgba(17, 24, 39, 0.28);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 36px 48px -22px rgba(17, 24, 39, 0.35);
    }

    /* IMAGE */
    .project-image {
    height: 200px;
    border-radius: 14px;
    background-size: cover;
    background-position: center;
    margin-bottom: 18px;
    }

    /* IMAGE SOURCES */
    .project-image.completed {
    background-image: url("assets/images/completed.jpg");
    }

    .project-image.ongoing {
    background-image: url("assets/images/ongoing.jpg");
    }

    .project-image.upcoming {
    background-image: url("assets/images/upcoming.jpg");
    }

    /* STATUS */
    .project-status {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 10px;
    }

    .completed-dot {
    color: #22c55e;
    }

    .ongoing-dot {
    color: #f97316;
    }

    .upcoming-dot {
    color: #3b82f6;
    }

    .status{
    padding:4px 10px;
    border-radius:20px;
    font-size:12px;
    font-weight:600;
    }

    .completed{
    background:green;
    color:color: #22c55e;;
    }

    .ongoing{
    background:orange;
    color: #f97316;
    }

    .upcoming{
    background:blue;
    color: #3b82f6;
    }

    /* TEXT */
    .project-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 10px;
    }

    .project-card p {
    font-size: 14px;
    line-height: 1.6;
    color: #6b7280;
    margin-bottom: 18px;
    }

    /* LINK */
    .project-card a {
    font-size: 14px;
    font-weight: 600;
    color: #2563eb;
    text-decoration: none;
    }

    .project-card a:hover {
    color: #1e4ed8;
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
    .project-cards {
        grid-template-columns: 1fr;
    }
    } 

    /* Filter Buttons Container */

        .filter-btns{
        display:flex;
        justify-content:center;
        gap:15px;
        margin-bottom:30px;
        flex-wrap:wrap;
        }

        /* Filter Button */

        .filter-btns button{
        padding:8px 18px;
        border:1px solid #ccc;
        background:#fff;
        cursor:pointer;
        border-radius:25px;
        font-size:14px;
        transition:0.3s;
        }

        /* Hover Effect */

        .filter-btns button:hover{
        background:#111;
        color:#fff;
        border-color:#111;
        }

        /* Active Button */

        .filter-btns button.active{
        background:#111;
        color:#fff;
        border-color:#111;
        }


    /* Property Details Modal */

            /* MODAL BACKGROUND */

            #propertyModal{
            display:none;
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.65);
            backdrop-filter: blur(5px);
            justify-content:center;
            align-items:center;
            z-index:9999;
            }

            /* MODAL BOX */

            .modal-box{
              background:#0f172a;
              color:#fff;
              width:700px;
              max-height:80vh;
              border-radius:14px;
              padding:20px;
              overflow-y:auto;
              }

            /* LEFT SIDE IMAGE */

            .modal-images{
            width:45%;
            }

            .modal-images img{
            width:100%;
            border-radius:10px;
            margin-bottom:10px;
            }

            /* RIGHT SIDE DETAILS */

            .modal-details{
            width:55%;
            }

            .modal-details h2{
            margin-top:0;
            font-size:24px;
            }

            /* STATUS */

            .status-badge{
            display:inline-block;
            padding:5px 12px;
            border-radius:20px;
            font-size:13px;
            margin-bottom:10px;
            }

            .status-ongoing{
            background:#f39c12;
            color:#fff;
            }

            .status-completed{
            background:#27ae60;
            color:#fff;
            }

            .status-upcoming{
            background:#3498db;
            color:#fff;
            }

            /* CLOSE BUTTON */

            .modal-close{
            position:absolute;
            top:20px;
            right:25px;
            font-size:22px;
            cursor:pointer;
            color:#fff;
            }

    /* Image styles */
        .main-img{
        width:100%;
        border-radius:10px;
        margin-bottom:10px;
        }

        .image-thumbs{
        display:flex;
        gap:10px;
        }

        #mainImage{
        width:100%;
        max-height:300px;
        object-fit:cover;
        border-radius:10px;
        margin-bottom:10px;
        }

        #imageThumbs{
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        margin-top:10px;
        }

        #imageThumbs img{
        width:70px;
        height:60px;
        object-fit:cover;
        border-radius:6px;
        cursor:pointer;
        transition:0.3s;
        }

        #imageThumbs img:hover{
        transform:scale(1.05);
        }

        .image-thumbs img{
        width:80px;
        height:60px;
        object-fit:cover;
        cursor:pointer;
        border-radius:6px;
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
</head>

<body>

<header>
    <div class="logo">
      <span><img src="assets/images/Logo.PNG" alt="Logo"></span>
      <b>Ayyavu Construction</b>
    </div>

    <nav>
      <ul>
        <li><a href="index.php" style="color: inherit; text-decoration: none; ">Home</a></li>
        <li><a href="about.html" style="color: inherit; text-decoration: none; ">About Us</a></li>
        <li><a href="projects.php" style="color: inherit; text-decoration: none; ">Projects</a></li>
        <li><a href="contact.html" style="color: inherit; text-decoration: none; ">Contact Us</a></li>
        <!-- <li><a href="blog.html" style="color: inherit; text-decoration: none; ">Blog</a></li> -->
      </ul>
    </nav>

    <button class="quote-btn" onclick="window.location.href='admin/login.php'">Admin</button>
     <!-- <a href="admin/login.php" class="admin-btn" style="color: inherit; text-decoration: none; ">Admin</a> -->
  </header>



<section class="project-section">

<div class="container">

<div class="project-header">

<span class="project-label">
PROJECT PIPELINE
</span>

<h2 class="project-title">
Our Project Journey
</h2>

<p class="project-subtitle">
A transparent look into our active portfolio showcasing construction excellence.
</p>

</div>

<p style="text-align:center;color:#777;width:60%;margin-top: -40px;margin-left: auto;margin-right: auto;">
Building a legacy of excellence, one structure at a time. 
From luxury residential complexes to industrial hubs.
</p>


<div class="filter-btns" style="text-align:center;margin:30px 0;">

<button onclick="filterStatus('All')">All</button>
<button onclick="filterStatus('Ongoing')">Ongoing</button>
<button onclick="filterStatus('Completed')">Completed</button>
<button onclick="filterStatus('Upcoming')">Upcoming</button>

</div>



<div class="project-cards">

<?php while($row = mysqli_fetch_assoc($result)) { ?>

<div class="project-card">

<div class="project-image"
style="background-image:url('admin/uploads/<?php echo $row['image']; ?>'); height:250px; background-size:cover; background-position:center;">
</div>

<div class="project-status">

<span class="status <?php echo strtolower($row['status']); ?>">
<?php echo $row['status']; ?>
</span>

</div>

<h3><?php echo $row['title']; ?></h3>

<p><?php echo $row['description']; ?></p>

<p>Location : <?php echo $row['location']; ?></p>

<p>Price : <?php echo $row['price']; ?></p>

<button class="quote-btn" onclick="openModal(<?php echo $row['id']; ?>)">
View Details
</button>

</div>

<?php } ?>

</div>

</section>


<div id="lightbox" onclick="closeLightbox()">

<img id="lightbox-img">

</div>

<div id="propertyModal">

<div class="modal-box">

<span class="modal-close" onclick="closeModal()">✖</span>

<img id="mainImage">

<h2 id="modalTitle"></h2>

<p>Location: <span id="modalLocation"></span></p>

<p>Price: <span id="modalPrice"></span></p>

<p id="modalDescription"></p>

<span id="modalStatus"></span>

</div>

</div>

<!-- FOOTER -->
 <footer class="footer-section">
  <div class="footer-container">

    <!-- BRAND -->
    <div class="footer-brand">
      <h3 class="logo">
        <span style="margin-left: -205px;"><img src="assets/images/Logo.png" alt="Logo"></span> Ayyavu Construction
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



<script>

function openModal(id){

fetch("get_project.php?id="+id)

.then(res=>res.json())

.then(data=>{

if(data.error){
alert(data.error);
return;
}

document.getElementById("modalTitle").innerText=data.title;
document.getElementById("modalLocation").innerText=data.location;
document.getElementById("modalPrice").innerText=data.price;
document.getElementById("modalDescription").innerText=data.description;
document.getElementById("modalStatus").innerText=data.status;

document.getElementById("mainImage").src="admin/uploads/"+data.image;

document.getElementById("propertyModal").style.display="flex";

})

.catch(err=>{
console.log(err);
});

}

function changeImage(img){
document.getElementById("mainImage").src="admin/uploads/"+img;
}

function closeModal(){
document.getElementById("propertyModal").style.display="none";
}

function filterStatus(status){

if(status=="All"){
window.location="projects.php";
}else{
window.location="projects.php?status="+status;
}

}

function nextProperty(){

currentId++;
loadProperty();

}

function prevProperty(){

if(currentId>1){
currentId--;
loadProperty();
}

}

function loadProperty(){

fetch("get_project.php?id="+currentId)

.then(res=>res.json())

.then(data=>{

document.getElementById("modalTitle").innerText=data.title;

document.getElementById("modalLocation").innerText=data.location;

document.getElementById("modalPrice").innerText=data.price;

document.getElementById("modalDescription").innerText=data.description;

document.getElementById("modalStatus").innerText=data.status;

document.getElementById("mainImage").src="admin/uploads/"+data.image;

});

}

</script>

</body>
</html>