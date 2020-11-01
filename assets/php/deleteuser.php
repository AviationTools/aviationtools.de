<?php
    require_once "../layout/database_login.php";

    if (deleteUser($_GET["email"])) {
        header("Content-type: application/json");
        http_response_code(201);

        print("successfully deleted!");
    } else {
        http_response_code(400);

        print("No Email in Database or already Beta Tester");
    }
