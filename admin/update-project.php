<?php
include("../config.php");

$id=$_GET['id'];

$result=mysqli_query($conn,"SELECT * FROM projects WHERE id=$id");

$row=mysqli_fetch_assoc($result);
?>

<!DOCTYPE html>
<html>
<head>

<title>Edit Project</title>

<style>

    body{
    background:#0f172a;
    font-family:Arial;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    }

    .form-box{
    background:#1e293b;
    padding:30px;
    border-radius:10px;
    width:400px;
    }

    input,textarea,select{
    width:100%;
    padding:10px;
    margin:10px 0;
    border-radius:6px;
    border:none;
    }

    button{
    background:#2563eb;
    color:white;
    border:none;
    padding:10px;
    width:100%;
    border-radius:6px;
    cursor:pointer;
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

    /* Image Gallery */

    .image-gallery{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(120px,1fr));
    gap:12px;
    margin-top:15px;
    }

    .image-box{
    position:relative;
    }

    .image-box img{
    width:100%;
    height:100px;
    object-fit:cover;
    border-radius:6px;
    }

    .delete-icon{
    position:absolute;
    top:5px;
    right:5px;
    background:red;
    color:white;
    font-size:12px;
    padding:3px 6px;
    border-radius:50%;
    text-decoration:none;
    }

</style>

</head>

<body>

<div class="form-box">

<h2>Edit Project</h2>

<form method="POST" enctype="multipart/form-data">

<input type="text" name="title"
value="<?php echo $row['title']; ?>">

<textarea name="description"><?php echo $row['description']; ?></textarea>

<select name="status">

<option <?php if($row['status']=="Completed") echo "selected"; ?>>Completed</option>
<option <?php if($row['status']=="Ongoing") echo "selected"; ?>>Ongoing</option>
<option <?php if($row['status']=="Upcoming") echo "selected"; ?>>Upcoming</option>

</select>


<div class="image-gallery">

<?php
$images = mysqli_query($conn,"SELECT * FROM project_images WHERE project_id=".$row['id']." LIMIT 1");

while($img=mysqli_fetch_assoc($images)){
if(!empty($img['image'])){
?>

<div class="image-box">

<img src="uploads/<?php echo $img['image']; ?>" width="120">

<a class="delete-icon"
href="delete_image.php?id=<?php echo $img['id']; ?>" style="color:red;font-size:13px;"
onclick="return confirm('Delete this image?')">
✖
</a>

</div>

<?php }
}
 ?>

</div>

<!-- <label>
<input type="checkbox" name="delete_image"> Delete Image
</label> -->

<br><br>

<label>Add More Images</label>
<input type="file" name="images[]" multiple>

<button name="update">Update Project</button>
<button type="submit" name="delete_project"
onclick="return confirm('Are you sure you want to delete this project?')"
style="background:red;color:white;padding:10px;border:none;border-radius:6px;margin-top:10px;">
Delete Project
</button>
</form>

</div>

</body>
</html>

<?php

if(isset($_POST['update'])){

$title=$_POST['title'];
$desc=$_POST['description'];
$status=$_POST['status'];

$image=$_FILES['image']['name'];
$tmp=$_FILES['image']['tmp_name'];

$delete_image = isset($_POST['delete_image']);

if($delete_image){

// delete old image
unlink("uploads/".$row['image']);

$sql="UPDATE projects SET
title='$title',
description='$desc',
status='$status',
image=''
WHERE id=$id";

}

else if($image!=""){

move_uploaded_file($tmp,"uploads/".$image);

$sql="UPDATE projects SET
title='$title',
description='$desc',
status='$status',
image='$image'
WHERE id=$id";

}

else{

$sql="UPDATE projects SET
title='$title',
description='$desc',
status='$status'
WHERE id=$id";

}

mysqli_query($conn,$sql);
if(!empty($_FILES['images']['name'][0]))
{

foreach($_FILES['images']['name'] as $key=>$image){
  if(!empty($image)){

$tmp=$_FILES['images']['tmp_name'][$key];

$target="../uploads/".$image;

move_uploaded_file($tmp,$target);

mysqli_query($conn,"INSERT INTO project_images(project_id,image)
VALUES('$id','$image')");

}
}

}
// foreach($_FILES['images']['name'] as $key => $image){

// $tmp = $_FILES['images']['tmp_name'][$key];

// $target="uploads/".$image;

// move_uploaded_file($tmp,$target);

// mysqli_query($conn,"INSERT INTO project_images(project_id,image)
// VALUES('$id','$image')");

// }

echo "<script>alert('Project Successfully Edited'); window.location.href='edit-project.php';</script>";

}

?>

<?php

if(isset($_POST['delete_project'])){

// image delete
if($row['image'] != ""){
unlink("uploads/".$row['image']);
}

// database delete
mysqli_query($conn,"DELETE FROM projects WHERE id=$id");

echo "<script>
alert('Project Deleted Successfully');
window.location.href='edit-project.php';
</script>";

}
?>