<?php
session_start();
include("../config.php");
?>

<!DOCTYPE html>
<html>
<head>

<title>Edit Projects</title>

<style>

    body{
    background:#0f172a;
    color:white;
    font-family:Arial;
    padding:40px;
    }

    .project-container{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:20px;
    }

    /* .project-card{
    background:#1e293b;
    padding:20px;
    border-radius:10px;
    } */

    .project-card img{
    width:100%;
    height:200px;
    object-fit:cover;
    border-radius:8px;
    }

    .edit-btn{
    background:#2563eb;
    border:none;
    padding:8px 15px;
    border-radius:6px;
    color:white;
    cursor:pointer;
    }
    
    /* Project Card */

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

</style>

</head>

<body>

<button class="quote-btn" onclick="window.location.href='../projects.php'">Back</button>

<h1>Edit Projects</h1>

<div class="project-cards">

<?php

$result=mysqli_query($conn,"SELECT * FROM projects");

while($row=mysqli_fetch_assoc($result)){

?>

<div class="project-card">

<?php
$images = mysqli_query($conn,"SELECT * FROM project_images WHERE project_id=".$row['id']." LIMIT 1");

$img = mysqli_fetch_assoc($images);

if($img){
?>

<img src="../uploads/<?php echo $img['image']; ?>" alt="Project Image"
style="width:100%;height:200px;object-fit:cover;border-radius:10px;margin-bottom:10px;">

<?php } ?>

<h3><?php echo $row['title']; ?></h3>

<p><?php echo $row['description']; ?></p>

<button class="edit-btn"
onclick="window.location.href='update-project.php?id=<?php echo $row['id']; ?>'">
Edit
</button>

</div>

<?php } ?>

</div>

</body>
</html>