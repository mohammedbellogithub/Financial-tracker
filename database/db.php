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