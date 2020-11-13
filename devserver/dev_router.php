<?php

if (preg_match('/^\/api/', $_SERVER["REQUEST_URI"])) {
    header("Content-Type: application/json");
    $response = file_get_contents("https://aviationtools.de" . $_SERVER["REQUEST_URI"]);

    $status_line = $http_response_header[0];
    preg_match('{HTTP/\S*\s(\d{3})}', $status_line, $match);
    $status = $match[1];
    http_response_code($status);

    echo $response;
} else {
    return false; // serve the requested resource as-is.
}
