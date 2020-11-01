<?php
	// verbindung.(\w*\s*)=(\s*[^\n]*?);
	// \[verbindung.ziel.name\].=(\s*[^\n]*?)\;

	//<script type="text\/javascript">(.*?)<\/script>
	$fullArray = [];

	$dataRaw = array(
		'REQ0JourneyStopsS0A' => '255',
		'REQ0JourneyStopsS0G' => 'Siegburg/Bonn',
		'REQ0JourneyStopsZ0A' => '255',
	    'REQ0JourneyStopsZ0G' => 'Salzburg Hbf',
	    'REQ0JourneyDate' => 'Di, 01.09.20',
	    'REQ0JourneyTime' => '12:00',
	    'REQ0HafasSearchForw' => "0",
	    'REQ1JourneyDate' => 'Mi, 02.09.20',
	    'REQ1JourneyTime' => '08:00',
	    'REQ1HafasSearchForw' => "1",
	    'start' => 'suchen'
	);

	// digitalData.verbindung

	$data = http_build_query($dataRaw);

	$context_options = array(
		'http' => array(
	        'method' => 'POST',
	        'header' => "Content-type: application/x-www-form-urlencoded\r\n"
	            . "Content-Length: " . strlen($data) . "\r\n",
	        'content' => $data
	    )
    );

	$context = stream_context_create($context_options);


	// Open the file using the HTTP headers set above
	$file = file_get_contents('https://reiseauskunft.bahn.de/bin/query.exe/', false, $context);

	$regExStart = '/\[verbindung.start.name\].=."(\s*[^\n]*?)";/';
	preg_match_all($regExStart, $file, $trefferStart);

	$regExZiel = '/\[verbindung.ziel.name\].=."(\s*[^\n]*?)";/';
	preg_match_all($regExZiel, $file, $trefferZiel);

	$regExRaw = '/verbindung.(\w*\s*)=(\s*[^\n]*?);/';
	preg_match_all($regExRaw, $file, $trefferRaw);


	// $rawArray = array(
 // 		"id"=> 1,
 // 		"startBf" => $trefferStart[1][0],
	//     "zielBf" => $trefferZiel[1][0],
	//     "umstiege" =>,
	//     "abfahrt" =>,
	//     "ankunft" =>,
	//     "reisedauer" =>,
	//     "preistest" =>,
	// );
	// $fullArray[] = $rawArray;

	print($file);
?>