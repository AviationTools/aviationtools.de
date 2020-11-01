<?php

function getLikeCount() {
    $filereader = fopen("likes.txt", "r");
    $likes = fgets($filereader);

    return (int)$likes;
}

http_response_code(200);
echo(getLikeCount());

?>
