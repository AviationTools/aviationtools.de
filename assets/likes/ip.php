<?php
	function reader($check_ip){
		if (list_contains($check_ip)) {
			http_response_code(400);
			print('{"found": true}');
		}
		else {
			http_response_code(200);
			write($check_ip);
		}
	}
	
	function list_contains($check_ip) {
		$file = fopen("iplog.txt", "r") or die("Unable to open file!");
		while(!feof($file)){
			if($check_ip == trim(fgets($file))){
				fclose($file);
				return true;
			}
		}
		
		fclose($file);
		return false;
	}
	
	function write($check_ip){
		$file = fopen("iplog.txt", "a") or die("Unable to open file!");
		fwrite($file, $check_ip."\n");
		fclose($file);
	}

	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
	header('Content-type: application/json');
	reader($ip);
?>
