<?php
    require_once "../layout/database_login.php";

    header("Content-type: application/json");
    http_response_code(201);

    $user = newestUser();
    echo json_encode($user);

