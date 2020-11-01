<?php
	function newestUser(){
		$file = fopen("userData.txt", "r") or die("Unable to open file!");

	    $data = [];
	    while ($line2 = fgets($file)){
	    	$data[] = str_getcsv($line2,"'");
	    }

	    fclose($file);

		echo json_encode($data);
	   	return; 
	}	

	header("Content-type: application/json");
	newestUser();


?>