<?php

$USE_CURL = true;

if (preg_match('/^\/api/', $_SERVER["REQUEST_URI"])) {
    if ($USE_CURL) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "https://aviationtools.de" . $_SERVER["REQUEST_URI"]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        $data = curl_exec($ch);
        $response_code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        header("Content-Type: application/json");
        http_response_code($response_code);
        echo $data;
    }
    else {
        $response = file_get_contents("https://aviationtools.de" . $_SERVER["REQUEST_URI"]);

        $status_line = $http_response_header[0];
        preg_match('{HTTP/\S*\s(\d{3})}', $status_line, $match);
        $status = $match[1];

        header("Content-Type: application/json");
        http_response_code($status);
        echo $response;
    }
} else {
    return false; // serve the requested resource as-is.
}
