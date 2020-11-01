<?php
	require_once "../layout/database_login.php";
	
	if (changeUserAdminRank($_GET["email"], "0")) {
		header("Content-type: application/json");
		print("successfully changed!");
		http_response_code(201);
	}
	else {
		http_response_code(400);
		print("Not successfull");
	}
?>