<style>
    body{
background:#2563eb;
font-family:Segoe UI;
display:flex;
align-items:center;
justify-content:center;
height:100vh;
}

.login-box{
background:#fff;
padding:40px;
border-radius:12px;
width:350px;
box-shadow:0 40px 40px rgba(0,0,0,0.1);
text-align:center;
}

.login-box h2{
margin-bottom:20px;
color:#111827;
}

.login-box input{
width:100%;
padding:12px;
margin:10px 0;
border:1px solid #ddd;
border-radius:6px;
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
.login-btn{
background:#2563eb;
color:white;
border:none;
padding:12px;
width:100%;
border-radius:6px;
cursor:pointer;
font-weight:600;
}

.login-btn:hover{
background:#1e4ed8;
}

.error-msg{
background:#fee2e2;
color:#b91c1c;
padding:10px;
border-radius:6px;
}

</style>
<?php
session_start();

if(isset($_POST['password'])){
    
    if($_POST['password']=="12345"){
        $_SESSION['admin']="yes";
        header("Location: dashboard.php");
    }
    else{
        $error="Wrong Password";
    }
}
?>



<!DOCTYPE html>
<html>
<body>
<div class="login-modal">

<div class="login-box">

<h2>Admin Login</h2>

<form method="POST">

<input type="password" name="password" placeholder="Enter Password">

<?php if(isset($error)){ ?>

<div class="error-msg">

<?php echo $error; ?>

</div>

<?php } ?>

<button class="login-btn" type="submit">Login</button>

</form>

</div>

</div>
</body>
</html>