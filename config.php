<?php

$conn = mysqli_connect("localhost", "root", "", "ayyavu_construction");

if(!$conn){
    die("Database connection failed: " . mysqli_connect_error());
}

?>