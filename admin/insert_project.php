<?php

include("../config.php");

$title=$_POST['title'];
$location=$_POST['location'];
$price=$_POST['price'];
$status=$_POST['status'];
$description=$_POST['description'];

/* Insert project */

$query="INSERT INTO projects
(title,description,status,location,price)
VALUES
('$title','$description','$status','$location','$price')";

mysqli_query($conn,$query);

/* Get project id */

$project_id = mysqli_insert_id($conn);

/* Max 5 image check */

if(isset($_FILES['images']) && count($_FILES['images']['name']) > 5){
die("Maximum 5 images allowed");
}

/* Upload images */

if(isset($_FILES['images']) && count($_FILES['images']['name']) > 0){

foreach($_FILES['images']['name'] as $key => $image){

$tmp = $_FILES['images']['tmp_name'][$key];
$target = "uploads/".$image;

move_uploaded_file($tmp,$target);

mysqli_query($conn,"INSERT INTO project_images (project_id,image)
VALUES ('$project_id','$image')");

}

}

echo "<script>
alert('Project Added Successfully');
window.location.href='dashboard.php';
</script>";

?>