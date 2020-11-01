<?php
//Delete Line

function deleteLineInFile($file,$string,$beta)
{
	$i = 0;
	$array = array();
	
	$read = fopen($file, "r") or die("can't open the file");
	while(!feof($read)) {
		$array[$i] = fgets($read);
		++$i;
	}
	fclose($read);
	
	$write = fopen($file, "w") or die("can't open the file");
	foreach($array as $a) {
		if(!strstr($a,$string)){
			fwrite($write,$a);
		}
	}
	fwrite($write,$beta);
	http_response_code(201);
	fclose($write);
}



// lookup user in file return true/false

function userVerify($email)
	{
	// $isValidUser = false;

	$handle = fopen("userinfo.txt", "r+");
	while (($line = fgetcsv($handle)) !== false) {
		
		if (trim($line[1]) == $email && $line[3] !== "b"){
			print ("email found !");
			
			$string =$line[0].",".$line[1].",".$line[2].","."u";
			$beta = $line[0].",".$line[1].",".$line[2].","."b";
			
			deleteLineInFile("userinfo.txt", $string, $beta);
			break;
	
		}else {
			print("No Email in Database or already Beta Tester");
			http_response_code(400);
			}
		}

	fclose($handle);

	// return $isValidUser;

	}

userVerify($_GET["email"]);

// Activate if "userinfo.txt" is empty

// register($_POST["user"],$_POST["pass"]);

?>
