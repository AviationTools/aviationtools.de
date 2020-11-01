<?php
//replace old with new !
function replace($email, $user, $description, $airplane, $homebase, $VaIvId) {
	$logging = fopen("logFile.txt", "a");
    $csvFile = fopen("userData.txt", "r+") or die("can't open the file");
    $data = [];
    while ($line = fgets($csvFile)) {
        $data[] = str_getcsv($line,"'");
    }

    rewind($csvFile);

	print_r($data);
	for ($i = 0; $i < count($data); $i++) { 
    	//print_r($data[$i]);
        if (trim($data[$i][0]) == $email) {
			if(empty($data[$i][0])){
				fwrite($csvFile,$email."'".$user."'".$Description."'".$airplane."'".$homebase."'".$VaIvId."\n");
				break;
			}
			$data[$i][0] = $email;
            $data[$i][1] = $user;
			$data[$i][2] = $Description;
			$data[$i][3] = $airplane;
			$data[$i][4] = $homebase;
			$data[$i][5] = $VaIvId;
    		fwrite($logging, "IT WORKED!". "\n");
    		//print_r($data[$i]);
    		break;
        }
	}

    foreach($data as $user) {
        fwrite($csvFile, implode("'", $user) . "\n");
    }

    fclose($csvFile);
}

// lookup user in file return true/false

function userVerify($email,$user,$Description,$airplane,$homebase,$VaIvId) {

	$handle = fopen("userinfo.txt", "r");
	$logging = fopen("logFile.txt", "a");
	while (($line = fgetcsv($handle)) !== false) {
		//print_r($line);
	
		if (trim($line[1]) == $email) {
			fwrite($logging, "user found!". "\n");
			echo "user found";
			replace($email,$user,$Description,$airplane,$homebase,$VaIvId);
    		http_response_code(201);
			break;
		}
		fwrite($logging, "user not found!". "\n");
		echo "user not found";
		http_response_code(400);
	}
	fclose($handle);
}

userVerify($_GET["email"], $_GET["userName"], $_GET["Description"], $_GET["airplane"], $_GET["homebase"], $_GET["VaIvId"]);
?>