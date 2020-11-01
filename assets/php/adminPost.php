<?php
    // add new User Data to file
    function posts($input, $date) {
        $file = fopen("posts.txt", "a") or die("Unable to open file!");
        fwrite($file, $input . "'" . $date . "\n");
        fclose($file);

        http_response_code(201);

        print("new Post added");
    }

    posts($_GET["input"], $_GET["date"]);
