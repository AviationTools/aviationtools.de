<?php
    require_once "../layout/database_login.php";

    if (changeUserAdminRank($_GET["email"], "0")) {
        header("Content-type: application/json");
        http_response_code(201);
        print("successfully changed!");
    } else {
        http_response_code(400);
        print("Not successfull");
    }
