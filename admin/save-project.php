<?php
include("../config.php");

$title = $_POST['title'];
$description = $_POST['description'];
$details = $_POST['details'];
$status = $_POST['status'];

/* LIMIT IMAGE UPLOAD */
if(count($_FILES['images']['name']) > 5){
    die("Maximum 5 images allowed");
}

/* FIRST IMAGE = COVER IMAGE */
$cover_image = $_FILES['images']['name'][0];
$cover_name = time() . "_" . $cover_image;

move_uploaded_file(
    $_FILES['images']['tmp_name'][0],
    "uploads/" . $cover_name
);

/* INSERT PROJECT */
$conn->query("INSERT INTO projects (title, description, image, details, status)
VALUES ('$title','$description','$cover_name','$details','$status')");

/* GET PROJECT ID */
$project_id = $conn->insert_id;


/* SAVE ALL IMAGES */
foreach ($_FILES['images']['name'] as $key => $imageName) {

    if(!empty($imageName)){

        $newName = time() . "_" . $imageName;
        $target = "uploads/" . $newName;

        move_uploaded_file($_FILES['images']['tmp_name'][$key], $target);

        $conn->query("INSERT INTO project_images (project_id, image)
        VALUES ('$project_id','$newName')");
    }
}

echo "Project Added Successfully";
?>