<?php $page='profile'; $title='ATC-Com'; include '../assets/layout/header.php';
   include_once 'database_login.php';
	$authorised = isset($_SESSION["start_date"]) && ($_SESSION["start_date"] < (time() + 86400));
	$user = [];
	$userData = [];
	//UserData Information
	if ($authorised) {
		$activeUser = getUserOrNull($_SESSION["email"]);
		if ($activeUser["email"] == $_SESSION["email"]) {
			$user["email"] = $_SESSION["email"];
			$user["betaTester"] = $activeUser["beta_tester"] == "1";
			$user["admin"] = $activeUser["admin"] == "1";
			$user["user"] = $activeUser["admin"] == "0";
			$userData["name"] = $activeUser["username"];
			$userData["Description"] = $activeUser["description"];
			$userData["airplane"] = $activeUser["airplane"];
			$userData["homebase"] = $activeUser["homebase"];
			$userData["VaIvId"] = $activeUser["ivao_id"];
			$userData["vatsim"] = $activeUser["vatsim_id"];
		}
		}

	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    $uri = str_replace("index.php", "", $_SERVER["REQUEST_URI"]);
    if (empty($user["email"])) {
		logVisitor($ip, null, $uri);
    }
    else {
    	logVisitor($ip, $user["email"], $uri);
    }

	//Admin Posts

	$adminPost = [];
	$handle = file("assets/php/posts.txt");
	$last_row = array_pop($handle);
	$data = explode("'",$last_row);
	//var_dump($data[0]);
	$adminPost["postbody"] = trim($data[0]);
	$adminPost["postdate"] = trim($data[1]); 
?>
<script defer src="../assets/js/profile.js"></script>
<div class="text-center">
<?php if ($authorised){?>
	<u>
		<h1 class="display-3">Welcome back <?php echo $userData["name"];?>!</h1>
	</u>
</div>
<?php if($user["admin"]){ ?>
<div class="container-fluid">
	<!--Profile-->
	<div class="row">
		<div class="col-md-6">
			<div class="card-deck h-100">
				<div class="card d-flex align-items-center">
					<img src="../assets/img/default_pic.png" class="rounded" alt="">
					<h4 class="card-title"><?php echo $userData["name"];?></h4>
					<p class="card-text"><?php echo urldecode($userData["Description"]);?></p>
				</div>
				<div class="card d-flex align-items-center">
					<div class="card-body">
						<h5 class="card-title">Roles</h5>
						<ul class="list-group">
							<?php if($user["admin"]) {?>
							<li class="">Admin</li>
							<!-- &middot -->
							<?php }else{?>
							<li class="">User</li>
							<?php
								} if($user["betaTester"]) {?>
							<li class="">Beta Tester</li>
							<?php } ?>
						</ul>
						<h5 class="my-3">Favourits</h5>
						<ul class="list-group">
							<?php if(!empty($userData)){ ?>
							<li class=""><?php echo $userData["airplane"];?> </li>
							<!-- &middot -->
							<li class="">Homebase: <?php echo $userData["homebase"];?></li>
							<li class="">Ivao/Vatsim ID: <?php echo $userData["VaIvId"];?></li>
							<li class="">Member since 2018</li>
							<?php } ?>
						</ul>
						<a href="#" class="btn btn-info my-3" data-toggle="modal" data-target="#profilemodal" role="button">Update Profile</a>
					</div>
				</div>
			</div>
		</div>
		<!--Input/Post-->
		<div class="col-md-6">
			<div class="card-deck h-100">
				<div class="card d-flex align-items-center">
					<textarea class="form-control w-75 p-3 mt-5" id="adminPost" name="message" placeholder="Type in your message" rows="3" style="margin-bottom:10px;"></textarea>
					<button class="btn btn-info mt-5 mb-5" id="inputbtn" type="submit">Post New Message</button>
				</div>
				<div class="card d-flex align-items-center">
					<div class="card-body">
						<h5 class="card-title">Developer Updates</h5>
						<p class="card-text">First Part specefies the Body ("Information") of the Update. Users should clearly know what the Update has to offer. New Updates should be suggested to the Administrator first before Releasing.<br>
							Developer Updates should be tested prior of the Release.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--User Handling-->
	<div class="row my-3">
		<div class="col-md-6">
			<div class="card-deck">
				<div class="card d-flex align-items-center">
					<input type="text" class=" w-50 my-3" id="useremail" placeholder="E-Mail"> <!-- form-control -->
					<div class="btn-group">
						<button class="btn btn-warning btn-md my-1" type="button" id="betatester">Beta Tester</button>
						<button class="btn btn-success btn-md my-1" type="button" id="promote">Promote User</button>
					</div>
					<div class="btn-group"> <!-- my-3 -->
						<button class="btn btn-secondary btn-md my-1" type="button" id="demote">Demote User</button>
						<button class="btn btn-danger btn-md my-1" type="button" id="deleteUser">Delete User</button>
					</div>
				</div>
				<div class="card d-flex align-items-center">
					<div class="card-body">
						<h5 class="card-title">User Roles</h5>
						<p class="card-text">User Handling is important to keep the Website working. First choose the User who gets "Deleted","Promoted" or becomes a "Beta Tester". Simply type in the Email Adress and choose one of the Buttons.</p>
					</div>
				</div>
			</div>
		</div>
		<!--Latest Feeds-->
		<div class="col-md-6">
			<div class="card-deck">
				<div class="card d-flex align-items-center">
					<div class="card-body text-center  ">
						<div class="card-footer text-white text-center bg-secondary"><u>User Online Today</u></div>
							<div class="text-center">
								<?php print("Homepage:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/index/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">
								<?php print("ATC Page:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/atc/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Runways:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/runways/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Metar:  ".queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/metar/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Sid/Star:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/sidstar/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">		
								<?php print("Profile:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/profile/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">		
								<?php print("Total Today:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY)")[0]["ips"]); ?>
							</div>
							<div class="text-center">		
								<u><?php print("Total Month:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 30 DAY)")[0]["ips"]); ?></u>
							</div>				
					</div>
				</div>
				<div class="card d-flex align-items-center">
					<div class="card-body text-center  ">
						<div class="card-footer text-white text-center bg-secondary"><u>Newest Users</u></div>
						<div class="card-body text-center" id="outputAdmin"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php } ?>
<?php if($user["user"]){ ?>
<!--User Container -->
<div class="container-fluid">
	<!--Profile-->
	<div class="row">
		<div class="card-deck h-100">
			<div class="card d-flex align-items-center">
				<img src="../assets/img/default_pic.png" class="rounded" alt="">
				<h4 class="card-title"><?php echo $userData["name"];?></h4>
				<p class="card-text"><?php echo $userData["Description"];?></p> 
			</div>
			<div class="card d-flex align-items-center">
				<div class="card-body">
					<h5 class="card-title">Roles</h5>
					<ul class="list-group">
						<?php if($user["admin"]) {?>
						<li class="">Admin</li>
						<!-- &middot -->
						<?php }else{?>
						<li class="">User</li>
						<?php
							} if($user["betaTester"]) {?>
						<li class="">Beta Tester</li>
						<?php } ?>
					</ul>
					<h5 class="my-3">Favourits</h5>
					<ul class="list-group">
						<?php if(!empty($userData)){ ?>
						<li class=""><?php echo $userData["airplane"];?> </li>
						<!-- &middot -->
						<li class="">Homebase: <?php echo $userData["homebase"];?></li>
						<li class="">Ivao/Vatsim ID: <?php echo $userData["VaIvId"];?></li>
						<li class="">Member since 2018</li>
						<?php } ?>
					</ul>
					<a href="#" class="btn btn-info my-3" data-toggle="modal" data-target="#profilemodal" role="button">Update Profile</a>
				</div>
			</div>
			<!--Latest Feeds-->
			<div class="col-md-6">
			<div class="card-deck">
				<div class="card d-flex align-items-center">
					<div class="card-body text-center  ">
						<div class="card-footer text-white text-center bg-secondary"><u>User Online Today</u></div>
							<div class="text-center">
								<?php print("Homepage:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/index/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">
								<?php print("ATC Page:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/atc/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Runways:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/runways/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Metar:  ".queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/metar/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">	
								<?php print("Contact Page:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/contact/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">		
								<?php print("Profile:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) AND uri=\"". "/profile/" ."\"")[0]["ips"]); ?>
							</div>
							<div class="text-center">		
								<u><?php print("Total Today:  ". queryDataBase("SELECT COUNT(DISTINCT ip) AS 'ips' FROM visitor_log WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY)")[0]["ips"]); ?></u>
							</div>		
					</div>
				</div>
				<div class="card d-flex align-items-center">
					<div class="card-body text-center  ">
						<div class="card-footer text-white text-center bg-secondary"><u>Newest Users</u></div>
						<div class="card-body text-center" id="outputUser"></div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>
<?php } ?>
<!-- Updata Profile Modal -->
<div id="profilemodal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="loginmodal-container">
				<h1 class="d-flex justify-content-center ">Update your Profile</h1>
				<br>
				<div class="d-flex justify-content-center d-flex flex-column mx-3 my-3">
					<strong>Verify your Email</strong>
					<input disabled type="text" name="email" placeholder="Email" id="tempEmail" value="<?php echo $user["email"];?>">
					<strong>Type in your new Username</strong>
					<input disabled type="text" name="user" placeholder="User Name" id="user" value="<?php echo $userData["name"];?>">
					<strong>Tell us something about your self</strong>
					<textarea class="form-control my-1 " name="message" id="description" placeholder="Description of Yourself" rows="3"><?php echo $userData["Description"];?></textarea>
					<strong>What is your Favourite Plane</strong>
					<input type="text" name="airplane" placeholder="Favourite Plane" id="airplane" value="<?php echo $userData["airplane"];?>">
					<strong>What is your Homebase</strong>
					<input type="text" name="homebase" placeholder="Homebase Airport" id="homebase" value="<?php echo $userData["homebase"];?>">
					<strong>Your IVAO or Vatsim Network ID</strong>
					<input type="text" name="id" placeholder="IVAO/Vatsim ID" id="id" value="<?php echo $userData["VaIvId"];?>">
					<input type="button" name="update" class="btn btn-primary my-2" value="Update" id="submitProfile">
				</div>
				<div class="login-help d-flex justify-content-center" style="margin-bottom: 10px;">
					<a href="#">Reset Password</a>
				</div>
			</div>
		</div>
	</div>
</div>

		<!-- Login Form -->
<script defer src="../assets/js/login.js"></script>
<div id="myModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="loginmodal-container">
				<h1 class="d-flex justify-content-center ">Login to Your Account</h1>
				<br>
				<div class="d-flex justify-content-center d-flex flex-column mx-3 my-3">
					<input type="text" name="user" placeholder="Email" id="email">
					<input type="password" name="pass" placeholder="Password" id="pass">
					<input type="button" name="login" class="login loginmodal-submit btn btn-primary" value="Login" id="submit">
				</div>
				<div class="login-help d-flex justify-content-center my-3">
					<a href="" id="register" data-target="#regModal" data-toggle="modal" data-dismiss="modal">Register</a> - <a href="#">Forgot Password</a>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Register Form -->
<script defer src="../assets/js/register.js"></script>
<div id="regModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="loginmodal-container">
				<h1 class="d-flex justify-content-center ">Register</h1>
				<br>
				<div class="d-flex justify-content-center d-flex flex-column mx-3 my-3">
					<input type="text" name="user" placeholder="Username" id="newuser">
					<input type="text" name="user" placeholder="Email" id="newemail">
					<input type="password" name="pass" placeholder="Password" id="newpass">
					<input type="password" name="pass" placeholder="Confirm Password" id="conpw">
					<input type="button" name="login" class="login loginmodal-submit btn btn-primary" value="Register" id="regsubmit">
				</div>
				<div class="login-help d-flex justify-content-center my-3">
					<a href="#">Forgot Password</a>
				</div>
			</div>
		</div>
	</div>
</div>

<span class="text-white">
	<?php if($authorised){?>
		<a class="float-right footer-link hide" href="" id="logout">Logout</a>
	<?php }else{ ?> <a class="float-right footer-link hide" data-toggle="modal" data-target="#myModal" href="">Login</a> <?php }?>
</span>

<?php } else {?> 
<h1> <?php echo "Please Login !";} ?></h1>
<div id="snackbar"></div>
<?php include '../assets/layout/footer.php'; ?>