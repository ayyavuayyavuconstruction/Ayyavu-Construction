<?php

include "config.php";

$id = $_GET['id'];

$query = "SELECT * FROM projects WHERE id=$id";
$result = mysqli_query($conn,$query);

$data = mysqli_fetch_assoc($result);

?>

<!DOCTYPE html>
<html>

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

    <!-- <button class="quote-btn" onclick="getQuote()">Get a Quote</button> -->
  </header>

<div class="property-details">

<div class="property-left">

<img src="admin/uploads/<?php echo $data['image']; ?>" class="property-main-img">

</div>


<div class="property-right">

<h2><?php echo $data['title']; ?></h2>

<p class="status"><?php echo $data['status']; ?></p>

<p><strong>Location:</strong> <?php echo $data['location']; ?></p>

<p><strong>Price:</strong> <?php echo $data['price']; ?></p>

<p><strong>Description:</strong></p>

<p><?php echo $data['description']; ?></p>

<a href="index.php" class="close-btn">Back</a>

</div>

</div>
</html>

<style>

    /* ---------- NAVBAR ---------- */
    header {
      width: 90%;
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

    body{
    font-family:Poppins;
    margin:0;
    background:#f5f5f5;
    }

    .container{
    width:90%;
    margin:auto;
    padding:40px 0;
    }

    .project-title{
    font-size:32px;
    margin-bottom:10px;
    }

    /* .status{
    display:inline-block;
    padding:6px 12px;
    border-radius:20px;
    color:#fff;
    font-size:13px;
    } */

    .ongoing{background:orange;}
    .completed{background:green;}
    .upcoming{background:blue;}

    .gallery{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:15px;
    margin-top:30px;
    }

    .gallery img{
    width:100%;
    height:200px;
    object-fit:cover;
    border-radius:8px;
    cursor:pointer;
    }

    .details{
    margin-top:30px;
    line-height:1.7;
    }

    /* Details */
    .property-details{

    display:flex;
    gap:40px;
    max-width:1100px;
    margin:80px auto;
    padding:40px;
    background:#fff;
    border-radius:12px;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);

    }

    .property-left{
    flex:1;
    }

    .property-right{
    flex:1;
    }

    .property-main-img{

    width:100%;
    height:350px;
    object-fit:cover;
    border-radius:10px;

    }

    .property-right h2{

    font-size:28px;
    margin-bottom:10px;

    }

    .property-right p{

    margin-bottom:10px;
    color:#555;

    }

    .status{

    display:inline-block;
    padding:5px 12px;
    background:blue;
    color:white;
    border-radius:20px;
    font-size:15px;
    margin-bottom:17px;
    
    }

    .close-btn{

    display:inline-block;
    margin-top:20px;
    padding:10px 20px;
    background:#111;
    color:#fff;
    text-decoration:none;
    border-radius:6px;

    }
</style>