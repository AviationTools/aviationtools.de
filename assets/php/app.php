<?php
    require_once "../layout/database_sidstar.php";

    if (empty(approach($_GET["icao"], $_GET["runway"]))) {
        http_response_code(400);
    } else {
        header("Content-type: application/json");
        http_response_code(201);

        $approach = approach($_GET["icao"], $_GET["runway"]);
        echo json_encode($approach);
    }
