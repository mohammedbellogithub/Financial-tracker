<?php
	require_once '../database/db.php';

	if (isset($_SESSION["email"])) {
		$email = $_SESSION["email"];
		//get staff details
		$s = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
		$s->bind_param("s", $email);
		$s->execute();
		$r = $s->get_result();
		$f = $r->fetch_assoc();
		
		//Store datas
		$name = $f["fname"];
		$lname = $f["lname"];
		$email = $f["email"];
	}

	function logged_in(){
		if (isset($_SESSION["email"])) {
			return true;
		}else{
			return false;
		}
	}

	function getTransaction($mysqli){
		$s = $mysqli->prepare("SELECT * FROM transaction");
		$s->execute();
		$r = $s->get_result();

		return $r;
	}