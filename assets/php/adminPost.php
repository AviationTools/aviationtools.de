<?php

	// add new User Data to file

	function posts($input,$date) {

		$hash = password_hash($pass, PASSWORD_DEFAULT);

		$file = fopen("posts.txt", "a") or die("Unable to open file!");

		fwrite($file, $input."'".$date."\n");

		fclose($file);

		print("new Post added");

		http_response_code(201);

	}

	posts($_GET["input"],$_GET["date"]);


?>