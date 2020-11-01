<?php
//Delete User

function deleteUserInFile($email)
{
    $file = fopen("userData.txt", "r") or die("Unable to open file!");
    $csvFile = fopen("userinfo.txt", "r") or die("can't open the file for reading");
    $data = [];
    $data2 = [];
    while ($line = fgets($csvFile)) {
        $data[] = str_getcsv($line);
    }
    while ($line2 = fgets($file)){
    	$data2[] = str_getcsv($line2,"'");
    }

    fclose($csvFile);
    fclose($file);

    $file = fopen("userData.txt", "w") or die("Unable to open file!");
    $csvFile = fopen("userinfo.txt", "w") or die("can't open the file for writing");
    foreach($data as $user) {
        /*var_dump(trim($user[2]) != trim($email));*/

        if (trim($user[1]) != trim($email)) {
            fwrite($csvFile, implode(",", $user) . "\n");
        }
    }
    foreach($data2 as $info) {
        var_dump(trim($info[0]) != trim($email));

        if (trim($info[0]) != trim($email)) {
            fwrite($file, implode("'", $info) . "\n");
        }
    }

    fclose($csvFile);
    fclose($file);
    
    http_response_code(201);
}

deleteUserInFile($_GET["email"]);
?>
