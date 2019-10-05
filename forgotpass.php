<?php
  //Declare Sever Variables
  $host = "localhost";
  $user = "ronkchar_finance"; 
  $pass = "?)HD(wL;!1O("; 
  $db = "ronkchar_finance"; 
  //Start Connection to database
  $mysqli = new mysqli($host, $user, $pass, $db);
  //check if connection was successfull
  if ($mysqli->connect_error) {
    die($mysqli->connect_error." <br> Error connecting to server! Please contact admin");
  }    

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet"  type="text/css" href="style.css">
    <!-- link to site icon -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
     <link rel="icon" href="favicon.ico" type="image/x-icon">   
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <title>forgot password</title>
  </head>
  <body>
    <div class="container">
          <div class="row">
               <div class="col-md-12">
                    <img src="https://res.cloudinary.com/elijahwale/image/upload/v1570274902/franc_l4rec5.png" style="width: 150px; height: 150px;">
                    <!-- Reset Password Code -->
                    <?php
                      if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {
                        $email = $_POST['email'];

                        if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
                          echo "<div class='alert alert-danger' role='alert'>Invalid Email!</div>";
                        } else {
                          // check if email exists
                          $checkEmail = "SELECT * FROM tbl_user WHERE email = '$email' LIMIT 1";
                          $mailChk = $mysqli->query($checkEmail);

                          // if email is found, reset the password in the database
                          if ($mailChk != false) {
                            while($row = $mailChk->fetch_assoc()){
                              $newPass = $row['password'];
                            }

                            $sendmail = mail($email, "Forgotten Password", "Hello, this is your password".$newPass);
                            if ($sendmail) {
                              echo "<div class='alert alert-success' role='alert'>Your password has been sent to registered email.</div>";
                            } 
                            else {
                              echo "<div class='alert alert-danger' role='alert'>Email Does Not Exist.</div>";
                            }
                          } else {
                            echo "<div class='alert alert-danger' role='alert'>Email Does Not Exist.</div>";
                          }
                    }
                    ?>
                    <h1>Reset Password Form</h1>
                    <div class="card">
                         <div class="card-body">
                              <h2 class="card-title">Forgot Password</h2>
                              <p class="card-text">Enter the Email address associated with your Account for password recovery</p>
                              <form action="" method="post">
                                <input type="text" class="form-control" placeholder="Your Email Address" name="email">
                                <button type="button" name ="submit" class="btn">Recover Password</button>
                              </form>
                         </div>
                          
                    </div> 
               </div>   
          </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  </body>
</html>