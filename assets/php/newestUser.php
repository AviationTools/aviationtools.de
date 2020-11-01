<?php

	header("Content-type: application/json");
	require_once "../layout/database_login.php";
	$temp = newestUser();
	echo json_encode($temp);
	http_response_code(201);
	
?>
