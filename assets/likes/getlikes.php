<?php
    function getLikeCount() {
        $fileReader = fopen("likes.txt", "r");
        $likes = fgets($fileReader);

        return (int)$likes;
    }

    http_response_code(200);
    echo(getLikeCount());
