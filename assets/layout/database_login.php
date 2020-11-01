<?php
	$link = mysqli_connect("rdbms.strato.de", "U3565618", "alexander.kulaksiz63", "DB3565618");

	if ($link == null) {
		echo "Fehler: konnte nicht mit MySQL verbinden." . PHP_EOL;
		echo "Debug-Fehlernummer: " . mysqli_connect_errno() . PHP_EOL;
		echo "Debug-Fehlermeldung: " . mysqli_connect_error() . PHP_EOL;
		exit;
	}

	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $mysqli->connect_error);
		exit();
	}

	function getUserOrNull($email) {
		global $link;

		$tempUser = queryDataBase("SELECT * FROM user WHERE email=\"". $email ."\" LIMIT 1");

		if (count($tempUser) > 0) {
			return $tempUser[0];
		}
		else {
			return null;
		}
	}

	function updateUser($email, $username, $description, $airplane, $homebase, $ivao_id, $vatsim_id) {
		global $link;

		mysqli_query($link, "UPDATE user SET username=\"". $username ."\", description=\"". $description ."\", airplane=\"". $airplane ."\", homebase=\"". $homebase ."\", ivao_id=\"". $ivao_id ."\", vatsim_id=\"". $vatsim_id ."\" WHERE email=\"". $email ."\"");
		return mysqli_affected_rows($link) > 0;
	}

	function changeUserAdminRank($email, $admin) {
		global $link;

		mysqli_query($link, "UPDATE user SET admin=\"". $admin ."\" WHERE email=\"". $email ."\"");
		return mysqli_affected_rows($link) > 0;
	}

	function changeUserBetaRank($email, $beta) {
		global $link;

		mysqli_query($link, "UPDATE user SET beta_tester=\"". $beta ."\" WHERE email=\"". $email ."\"");
		return mysqli_affected_rows($link) > 0;
	}

	function registerUser($hash, $email, $username) {
		global $link;

		if (getUserOrNull($email) == null) {
			mysqli_query($link, "INSERT INTO user(hash, email, username) VALUES (\"". $hash ."\", \"". $email ."\", \"". $username."\")");
			return true;
		}
		else {
			// user schon vorhanden abbrechen
			return false;
		}
	}
	function deleteUser($email) {
		global $link;

		mysqli_query($link, "DELETE FROM user WHERE email=\"". $email ."\"");
		return mysqli_affected_rows($link) > 0;
	}

	function newestUser() {
		global $link;

		$newest = queryDataBase("SELECT email, username FROM user");
		return $newest;
	}


	function queryDataBase($query) {
		global $link;
		$result = mysqli_query($link, $query);
		
		if($result){
			$user_arr = [];

			 // Cycle through results
			while ($row = $result->fetch_assoc()) {
				$user_arr[] = $row;
			}
			// Free result set
			$result->close();
			return $user_arr;
		}
		else {
			print("sql error");
			exit;
		}
	}

	function logVisitor($ip, $email, $uri) {
		global $link;

		$user = getUserOrNull($email);

		if ($user != null) {
			mysqli_query($link, "INSERT INTO visitor_log(user_id, ip, uri) VALUES (\"". $user[0]["id"] ."\", \"". $ip ."\", \"". $uri ."\")");
		}
		else {
			mysqli_query($link, "INSERT INTO visitor_log(user_id, ip, uri) VALUES (NULL, \"". $ip ."\", \"". $uri ."\")");
		}
	}

	function emailVerify($email, $pass) {
		$user = getUserOrNull($email);

		if ($user == null) {
			return false;
		}
		else {
			return password_verify($pass, $user["hash"]);
		}
	}
?>