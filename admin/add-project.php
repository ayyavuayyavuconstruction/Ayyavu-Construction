<!DOCTYPE html>
<html>
<head>
<title>Add Project</title>

<style>

body{
background:#0f172a;
font-family:Arial;
margin:0;
color:white;
}

/* Header */

header{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 50px;
border-bottom:1px solid #1f2937;
}

.logo{
font-size:20px;
font-weight:bold;
}

/* Form Container */

.form-container{
display:flex;
justify-content:center;
align-items:center;
padding:60px 20px;
}

.form-card{
background:#1e293b;
padding:35px;
border-radius:12px;
width:450px;
box-shadow:0 0 20px rgba(0,0,0,0.4);
}

.form-card h2{
text-align:center;
margin-bottom:25px;
}

/* Form Inputs */

label{
display:block;
margin-top:12px;
font-size:14px;
}

input, textarea, select{
width:100%;
padding:10px;
margin-top:5px;
border-radius:6px;
border:none;
background:#0f172a;
color:white;
font-size:14px;
}

textarea{
min-height:80px;
resize:none;
}

input::placeholder{
color:#94a3b8;
}

/* Button */

button{
width:100%;
padding:12px;
margin-top:20px;
background:#2563eb;
border:none;
border-radius:6px;
color:white;
font-size:15px;
cursor:pointer;
transition:0.3s;
}

button:hover{
background:#1e4ed8;
}

</style>
</head>

<body>

<header>
<div class="logo">Ayyavu Construction</div>
<a href="dashboard.php" style="color:white;text-decoration:none;">Dashboard</a>
</header>

<div class="form-container">

<div class="form-card">

<h2>Add New Project</h2>

<form action="insert_project.php" method="POST" enctype="multipart/form-data">

<label>Project Title</label>
<input type="text" name="title" required>

<label>Description</label>
<textarea name="description" required></textarea>

<label>Details</label>
<textarea name="details"></textarea>

<label>Price</label>
<input type="text" name="price" placeholder="Price eg: ₹100,000" required>

<label>Location</label>
<input type="text" name="location" placeholder="Location" required>

<label>Status</label>
<select name="status">
<option value="ongoing">Ongoing</option>
<option value="completed">Completed</option>
<option value="upcoming">Upcoming</option>
</select>

<label>Project Image</label>
<input type="file" name="images[]" multiple>

<button type="submit">Add Project</button>

</form>

</div>

</div>

</body>
</html>