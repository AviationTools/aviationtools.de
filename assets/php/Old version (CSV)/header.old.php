<?php 
	session_start();
	$authorised = isset($_SESSION["start_date"]) && ($_SESSION["start_date"] < (time() + 86400));
	$user = [];
	if ($authorised) {
		$handle = fopen("/users/werbungbnc/www/assets/login/userinfo.txt", "r");
		while (($line = fgets($handle)) !== false) {
			$fragments = explode(",", $line);

			if (trim($fragments[1]) == $_SESSION["email"]) {
				$user["email"] = $_SESSION["email"];
				$user["betaTester"] = (trim($fragments[3]) == "b");
				$user["admin"] = (trim($fragments[2]) == "1");
				$user["user"] = (trim($fragments[2]) == "0");

				break;
			}
		}
		fclose($handle);
	}

	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    include_once 'database.php';
    $uri = str_replace("index.php", "", $_SERVER["REQUEST_URI"]);
    if (empty($user["email"])) {
		logVisitor($ip, null, $uri);
    }
    else {
    	logVisitor($ip, $user["email"], $uri);
    }

	//UserData Information

	$userData = [];
	if ($authorised) {
		$handle = fopen("/users/werbungbnc/www/assets/login/userData.txt", "r");
		while (($line = fgets($handle)) !== false) {
			$fragments = explode("'", $line);

			if (trim($fragments[0]) == $_SESSION["email"]) {
				$userData["name"] = trim($fragments[1]);
				$userData["Description"] = trim($fragments[2]);
				$userData["airplane"] = trim($fragments[3]);
				$userData["homebase"] = trim($fragments[4]);
				$userData["VaIvId"] = trim($fragments[5]);
				
				break;
			}
		}
		fclose($handle);
	}
	
	//Admin Posts

	$adminPost = [];
	$handle = file("/users/werbungbnc/www/assets/login/posts.txt");
	$last_row = array_pop($handle);
	$data = explode("'",$last_row);
	//var_dump($data[0]);
	$adminPost["postbody"] = trim($data[0]);
	$adminPost["postdate"] = trim($data[1]);
	
 ?>

<!doctype html>

<html lang="en">

	<head>

		<!-- google analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-115527911-1"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-115527911-1');
		</script>

		<!-- meta -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- css -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="/assets/css/custom.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

		<!-- offline
		<link rel="stylesheet" type="text/css" href="/assets/offline/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="/assets/css/custom.css">
		<link rel="stylesheet" type="text/css" href="/assets/offline/bootstrap.bundle.min.js">
		<link rel="stylesheet" type="text/css" href="/assets/offline/all.css">
		 -->

		<link rel="icon" href="/assets/img/favicon.ico">

		<title><?php if (isset($title)) { echo $title; } ?></title>

	</head>

	<body>

		<!-- navbar -->
		<nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">

			<a class="navbar-brand" href="/">
				<img src="/assets/img/radar.png" width="30" height="30" class="d-inline-block align-top">
				ATC-Com
			</a>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item <?php if ($page=='home') { echo 'active'; } ?>">
						<a class="nav-link" href="/">
							<i class="fas fa-home"></i> &nbsp;Home
						</a>
					</li>
					<li class="nav-item <?php if ($page=='atc') { echo 'active'; } ?>">
						<a class="nav-link" href="/atc/">
							<i class="fas fa-broadcast-tower"></i> &nbsp;ATC Comms
						</a>
					</li>
					<li class="nav-item <?php if ($page=='runways') { echo 'active'; } ?>">
						<a class="nav-link" href="/runways/">
							<i class="fas fa-plane-departure"></i> &nbsp;Runways
						</a>
					</li>
					<li class="nav-item <?php if ($page=='metar') { echo 'active'; } ?>">
						<a class="nav-link" href="/metar/">
							<i class="fas fa-cloud"></i> &nbsp;METAR Decoder
						</a>
					</li>
					<li class="nav-item <?php if ($page=='contact') { echo 'active'; } ?>">
						<a class="nav-link" href="/contact/">
							<i class="fas fa-comment"></i> &nbsp;Contact Us
						</a>
					</li>
					<?php if ($authorised) {?>	
					<li class="nav-item <?php if ($page=='profile') { echo 'active'; } ?>">
						<a class="nav-link" href="/profile/">
							<i class="fas fa-user"></i> &nbsp;<?php echo $userData["name"];?>
						</a>
					<?php } ?>
					</li>
				</ul>
			</div>

		</nav>

		<div class="container-fluid pt-3 pb-5">
