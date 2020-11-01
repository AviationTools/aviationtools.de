<?php
    require_once "../layout/database_login.php";

    if (changeUserBetaRank($_GET["email"], "1")) {
        header("Content-type: application/json");
        http_response_code(201);

        print("successfully changed!");
    } else {
        http_response_code(400);

        print("No Email in Database or already Beta Tester");
    }
