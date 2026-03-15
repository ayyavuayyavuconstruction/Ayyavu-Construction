<?php

include "config.php";

header('Content-Type: application/json');

if(isset($_GET['id'])){

$id = intval($_GET['id']);

$query = "SELECT * FROM projects WHERE id=$id";

$result = mysqli_query($conn,$query);

if(mysqli_num_rows($result)>0){

$row = mysqli_fetch_assoc($result);

echo json_encode($row);

}else{

echo json_encode(["error"=>"Project not found"]);

}

}else{

echo json_encode(["error"=>"Invalid request"]);

}

?>