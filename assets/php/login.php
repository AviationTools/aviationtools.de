<?php
    require_once "../layout/database_login.php";

    session_start();
    $angemeldet = false;

    if (isset($_GET["logout"])) {
        session_unset();
        session_destroy();
        http_response_code(201);
        print("Logged Out");
        exit();
    } else {
        if (!empty($_POST["email"]) && !empty($_POST["pass"]) && emailVerify($_POST["email"], $_POST["pass"])) {
            $_SESSION["start_date"] = time();
            $_SESSION["email"] = $_POST["email"];
            $angemeldet = true;
        }
    }

    if ($angemeldet) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }

