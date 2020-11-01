<?php
    function getLikeCount() {
        $fileReader = fopen("likes.txt", "r");
        $likes = fgets($fileReader);

        return (int)$likes;
    }

    function incrementLikeCount() {
        $likes = getLikeCount();

        $file = fopen("likes.txt", "w") or die("Unable to open file!");
        $newLikes = $likes + 1;
        fwrite($file, $newLikes);
        fclose($file);

        return $newLikes;
    }

    function log_contains_ip($user_ip) {
        $file = fopen("like_iplog.txt", "r") or die("Unable to open file!");
        while (!feof($file)) {
            if ($user_ip == trim(fgets($file))) {
                fclose($file);
                return true;
            }
        }

        fclose($file);
        return false;
    }

    function add_ip_to_log($user_ip) {
        $file = fopen("like_iplog.txt", "a") or die("Unable to open file!");
        fwrite($file, $user_ip . "\n");
        fclose($file);
    }

    function handle_user_ip($user_ip) {
        if (log_contains_ip($user_ip)) {
            http_response_code(400);

            echo(json_encode(["found" => true]));
        } else {
            http_response_code(200);

            $newLikes = incrementLikeCount();
            add_ip_to_log($user_ip);

            echo(json_encode(["found" => false, "number" => $newLikes]));
        }
    }

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $user_ip = $_SERVER['HTTP_CLIENT_IP'];
    } else {
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $user_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $user_ip = $_SERVER['REMOTE_ADDR'];
        }
    }

    header('Content-type: application/json');
    handle_user_ip($user_ip);
