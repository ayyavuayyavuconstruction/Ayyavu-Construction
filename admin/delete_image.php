<?php

session_start();
include("../config.php");

$id = $_GET['id'];

/* get image name */
$result = mysqli_query($conn,"SELECT * FROM project_images WHERE id='$id'");
$row = mysqli_fetch_assoc($result);

$image = $row['image'];

/* delete image file from folder */
unlink("uploads/".$image);

/* delete from database */
mysqli_query($conn,"DELETE FROM project_images WHERE id='$id'");

/* redirect back */
header("Location: ".$_SERVER['HTTP_REFERER']);

?>