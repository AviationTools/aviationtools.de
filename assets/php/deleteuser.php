<?php

require_once "../layout/database_login.php";

	if (deleteUser($_GET["email"])) {
		header("Content-type: application/json");
		print("successfully deleted!");
		http_response_code(201);
	}
	else {
		print("No Email in Database or already Beta Tester");
		http_response_code(400);
	}
?>
