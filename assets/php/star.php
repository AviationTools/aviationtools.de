<?php

	require_once "../layout/database_sidstar.php";

	function degrees($radiant) {

		//print($radiant);

		$summe = $radiant * (180/pi()); 

		if( $summe < 0 ){

			return (360 + $summe);

		}else{

	 		return $summe;

		}

	}

	

	function azimuth($lat1, $lon1, $lat2, $lon2) {

	    $dlon = deg2rad($lon2) - deg2rad($lon1);

	    $azimuth = atan2((sin($dlon) * cos(deg2rad($lat2))), (cos(deg2rad($lat1)) * sin(deg2rad($lat2)) - sin(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos($dlon)));

	    return (abs(degrees($azimuth)));

	}



	function headings($track){

		//print $track;

		if(($track > 337.5 && $track <= 360) || ($track >= 0 && $track < 22.5)){

			return "North Arrival";

		} elseif ($track > 22.5 && $track < 67.5) {

			return "North East Arrival";

		} elseif ($track > 67.5 && $track < 112.5) {

			return "East Arrival";

		} elseif ($track > 112.5 && $track < 157.5) {

			return "South East Arrival";

		} elseif ($track > 157.5 && $track < 202.5) {

			return "South Arrival";

		} elseif ($track > 202.5 && $track < 247.5) {

			return "South West Arrival";

		} elseif ($track > 247.5 && $track < 292.5) {

			return "West Arrival";

		} elseif ($track > 292.5 && $track < 337.5) {

			return "North West Arrival";

		} else{

			return "Not Valid Track!";

		}

	}




		if(empty(getStarData($_GET["icao"], $_GET["runway"]))){

			http_response_code(400);

		}else{

			header("Content-type: application/json");

			http_response_code(201);

			// $temp = getStarData("eham", "");

			$temp = getStarData($_GET["icao"], $_GET["runway"]);

			echo json_encode($temp);

		}



?>