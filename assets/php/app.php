<?php

	require_once "../layout/database_sidstar.php";


		if(empty(approach($_GET["icao"], $_GET["runway"]))){

			http_response_code(400);

		}else{

			header("Content-type: application/json");

			http_response_code(201);

			// $temp = getStarData("eddk", "14L");

			$temp = approach($_GET["icao"], $_GET["runway"]);

			echo json_encode($temp);

		}



?>