<?php
	// lookup user in file return true/false
	function emailVerify($email, $pass) {
		$isValidUser = false;

		$handle = fopen("userinfo.txt", "r");
		while (($line = fgets($handle)) !== false) {
			$fragments = explode(",", $line);
			//print_r($fragments);

			if (trim($fragments[1]) == $email) {
				$isValidUser = password_verify($pass, trim($fragments[0]));
				break;
			}
		}
		fclose($handle);

		return $isValidUser;
	}
	
	function logout() {
		session_unset();
		session_destroy();
		print("Logged Out");
	}
	
	session_start();

	$angemeldet = false;
	if (isset($_GET["logout"])) {
		logout();
	}
	else if (!empty($_POST["email"]) && !empty($_POST["pass"]) && emailVerify($_POST["email"], $_POST["pass"])) {
		$_SESSION["start_date"] = time();
		$_SESSION["email"] = $_POST["email"];

		$angemeldet = true;
	}
	else if (isset($_SESSION["start_date"]) && ($_SESSION["start_date"] < (time() + 86400))) {
		$angemeldet = true;
	}

	if ($angemeldet) {
		http_response_code(201);
	}
	else {
		http_response_code(400);
	}		
?>
