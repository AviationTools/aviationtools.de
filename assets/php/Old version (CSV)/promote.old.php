<?php
//Delete Line

function promote($file, $email, $newrank)
{
    $csvFile = fopen($file, "r+") or die("can't open the file");
    $data = [];
    while ($line = fgets($csvFile)) {
        $data[] = str_getcsv($line);
    }

    rewind($csvFile);

	print_r($data);
	for ($i = 0; $i < count($data); $i++) { 
    	//print_r($data[$i]);
        if (trim($data[$i][1]) == $email) {
            $data[$i][2] = $newrank;
    		//print_r($data[$i]);
    		break;
        }
	}

    foreach($data as $user) {
        fwrite($csvFile, implode(",", $user) . "\n");
    }

    fclose($csvFile);
    
    http_response_code(201);
}




promote("userinfo.txt", $_GET["email"], "1")

// Activate if "userinfo.txt" is empty

// register($_POST["user"],$_POST["pass"]);

?>
