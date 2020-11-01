<?php
	require_once "../layout/database_login.php";

	if (updateUser($_GET["email"], $_GET["userName"], $_GET["Description"], $_GET["airplane"], $_GET["homebase"], $_GET["VaIvId"], $_GET["VaIvId"])) {
		header("Content-type: application/json");
		http_response_code(201);
	}
	else {
		http_response_code(400);
		echo "Something went wrong!";
	}
?>