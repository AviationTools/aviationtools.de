<?php
	
		// add new user to file

	function register($userName,$pass,$email) {

		$hash = password_hash($pass, PASSWORD_DEFAULT);
		$defaultRank = "0";
		$defaultBeta = "u";

		$fileInfo = fopen("userinfo.txt", "a") or die("Unable to open file!");
		$fileData = fopen("userData.txt", "a") or die("Unable to open file!");

		fwrite($fileInfo, $hash.",".$email.",".$defaultRank.",".$defaultBeta."\n");
		fwrite($fileData, $email."'".$userName."'".""."'".""."'".""."'".""."\n");

		fclose($fileInfo);
		fclose($fileData);

	}

	function getUserOrNull($email) {
		$handle = fopen("userinfo.txt", "r");
		
		while (($line = fgetcsv($handle)) !== false) {
			if (trim($line[1]) == trim($email)) {
				fclose($handle);
				return $line;
			}
		}

		fclose($handle);
		return null;
	}

	if (getUserOrNull($_POST["email"]) == null) {
		header("Content-type: application/json");
		http_response_code(201);

		register($_POST["user"], $_POST["pass"], $_POST["email"]);

		//print("{test:123}");
	}
	else {
		http_response_code(400);

		print("user found!");
	}
?>