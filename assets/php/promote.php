<?php

require_once "../layout/database_login.php";

	if (changeUserAdminRank($_GET["email"], "1")) {
		header("Content-type: application/json");
		print("successfully changed!");
		http_response_code(201);
	}
	else {
		print("No Email in Database or already Admin");
		http_response_code(400);
	}
?>
