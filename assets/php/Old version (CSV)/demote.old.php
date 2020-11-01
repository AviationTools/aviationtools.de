<?php

require_once "/users/werbungbnc/www/assets/layout/database.php";

	if (changeUserBetaRank($_GET["email"], "0")) {
		header("Content-type: application/json");
		print("successfully changed!");
		http_response_code(201);
	}
	else {
		print("No Email in Database or already Beta Tester");
		http_response_code(400);
	}
?>
