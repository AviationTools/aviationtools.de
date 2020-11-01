<?php
	require_once "../layout/database_login.php";
	echo "test";
	if (registerUser(password_hash($_POST["pass"], PASSWORD_DEFAULT), $_POST["email"], $_POST["user"])) {
		header("Content-type: application/json");
		http_response_code(201);
	}
	else {
		http_response_code(400);
		print("user found!");
	}
?>