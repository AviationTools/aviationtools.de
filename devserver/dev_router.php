<?php

if (preg_match('/^\/api/', $_SERVER["REQUEST_URI"])) {
    header("Content-Type: application/json");
    echo file_get_contents("https://aviationtools.de" . $_SERVER["REQUEST_URI"]);
} else {
    return false; // serve the requested resource as-is.
}
