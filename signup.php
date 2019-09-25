<?php 
	require_once 'database/db.php';

	function email_exist($email, $mysqli){
		$s = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
		$s->bind_param("s", $email);
		$s->execute();

		$r = $s->get_result();

		if ($r->num_rows > 0) {
			return true;
		}else{
			return false;
		}
	}

	function password_match($email, $password, $mysqli){
		$s = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
		$s->bind_param("s", $email);
		$s->execute();

		$r = $s->get_result();

		if ($r->num_rows > 0) {
			$f = $r->fetch_assoc();
			if (password_verify($password, $f["password"])) {
				return true;
			}else{
				return false;
			}
		}
	}

	
	//Process Login Form
	if ($_SERVER["REQUEST_METHOD"] === "POST") {
		if (isset($_POST["signup"])) {
			$email = htmlentities(trim($_POST["email"]), ENT_QUOTES, "UTF-8");
			$password = htmlentities(trim($_POST["password"]), ENT_QUOTES, "UTF-8");
			$fname = htmlentities(trim($_POST["fname"]), ENT_QUOTES, "UTF-8");
			$lname = htmlentities(trim($_POST["lname"]), ENT_QUOTES, "UTF-8");
			$cpassword = htmlentities(trim($_POST["cpassword"]), ENT_QUOTES, "UTF-8");

			if (empty($email) || empty($password) || empty($fname) || empty($lname) || empty($cpassword)) {
				$err = 'Fill the form!';
			}else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
				$err = "Invalid Email Entered";
			}else if (email_exist($email, $mysqli)) {
				$err = "Email Already Exist!";
			}else if($password !== $cpassword){
				$err = "Password don't match";
			}else{
				$password = password_hash($password, PASSWORD_BCRYPT);
				$insert = $mysqli->prepare("INSERT INTO users(fname, lname, email, password) VALUES(?,?,?,?)");
				$insert->bind_param("ssss", $fname, $lname, $email, $password);
				$insert->execute();

				if ($insert->affected_rows > 0) {
					$login = "<a style='color: red;' href='./login.php'>Login</a>";
					$success = "Account Created Successfully! Proceed to ".$login;
				}
			}
		}
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>TeamFrank</title>
	<link rel="stylesheet" href="assets/css/rr.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.css" />
        <link rel="stylesheet" type="text/css" href="assets/css/animate.css" />

	
</head>
<body>

	<div id="side-menu" class="side-nav" style="width: 450px; margin-left: 0%;">
		<center><p style="color: white; margin-top: 20%; font-size: 2rem;"><img src="assets/img/new.png" style="width: 200px; height: 200px;"></p></center>
		<center><p  style="color: white; font-size: 1.5rem;"> Join the team of technocrats, people</p></center>
		<center><h6 style="color: white; font-size: 1.5rem;">whom outside would-be political</h6></center>
	<center><h6 style="color: white; font-size: 1.5rem;">experience and networking have real</h6></center>
<center><h6 style="color: white; font-size: 1.5rem;">world knowledge or any</h6></center>
<center><h6 style="color: white; font-size: 1.5rem;">understanding of governance, proper</h6></center>
<center><h6 style="color: white; font-size: 1.5rem;">planning and policy</h6></center>
	</div>
	<style>
				.vl {
				  border-left: 6px solid grey;
				  height: 150px;
				  position: absolute;
				  margin-left: 39.9%;
				  margin-top: 11.4%;
				}
				.vll {
				  border-left: 6px solid grey;
				  height: 150px;
				  position: absolute;
				  margin-left: 39.9%;
				  margin-top: 25%;
				}
				</style>

				<h5 style="margin: 2% 1%; float: right;">Have an acoount? <a href="./login.php">Login</a></h5>
			<div id="main" style="margin: 1% 50%;">
				<h3 style="font-style: bold;">Sign up to Team Franc</h3>
				<p>Enter your details below</p>
				<form method="POST">
					<?php 
						if (isset($err)) { ?>
							<h5 style="color: red;"><?php echo $err; ?></h5>
						<?php }else if(isset($success)){ ?>
							<h5 style="color: green;"><?php echo $success; ?></h5>
						<?php }
					?>
					<div class="form-group" style="width: 500px; margin-top: 40px;">
						<label>First Name</label>
			    	 	<input type="text" class="form-control curve" name="fname" style=" width: 100%; color: grey; padding: 10px;">
			    	</div>
				    <div class="form-group" style="width: 500px;">
				    	<label>Last Name</label>
			    	 	<input type="text" class="form-control curve" name="lname" style=" width: 100%; padding: 10px;">
			    	</div>

			    	<div class="form-group" style="width: 500px;">
			    		<label>Email address</label>
			    	 	<input type="email" class="form-control curve" name="email" style=" width: 100%; padding: 10px;">
			    	</div>
			    	<div class="form-group" style="width: 500px;">
			    		<label>Password</label>
			    	 	<input type="password" class="form-control curve" name="password" style=" width: 100%; padding: 10px;">
			    	</div>
			    	<div class="form-group" style="width: 500px;">
			    		<label>Confirm Password</label>
			    	 	<input type="password" class="form-control curve" name="cpassword" style=" width: 100%; padding: 10px;">
			    	</div>
				    <div class="form-group" style="width: 500px; margin: 10px 0px;">
				    	 <button type="submit" class="btn btn-rounded" name="signup" style="background: rgb(103, 58, 183); border-radius: 5px; width: 100%; color: white;">Sign up</button>
				    </div>	
				</form>
			</div>


</body>
</html>
	