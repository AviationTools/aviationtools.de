<?php
$icao = $_GET['icao'];
get_metar($icao);
function get_metar($icao) {
	$xml = file_get_contents("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=$icao&hoursBeforeNow=1.5");
	$metar = simplexml_load_string($xml);

	if ($metar->data["num_results"] == "0") {
    	output_json(503, array("error" => "Could not get metar"));
	}

	print($metar->data->METAR->raw_text);

}
?>