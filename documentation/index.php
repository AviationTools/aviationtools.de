<?php $page='documentation'; $title='ATC-Com'; include '../assets/layout/header.php'; ?>
<script defer src="../assets/js/documentation.js"></script>

<!-- <div class="mt-3 text-center"> -->
<!-- <h1>Documentation</h1> -->
<div class="container" id="firstPage">
	<h1 class="mt-3 text-center">How to Guide</h1>
	<!-- <div class="row"> -->
		<div class="col">
			<div class="card">
				<h3 class="card-header"><i class="fas fa-file-alt"></i> &nbsp;IFR Cruise Altitude or Flight Level</h3>
				<div class="card-body">
					<p class="card-text">
						<strong>How to select the correct cruise altitude and respect the minimal flight level restrictions.</strong>
					</p>
					<h5 class="card-title"><u>IFR altitude an level restrictions</u></h5>
					<p class="card-text">
						<strong>Minimal altitudes are published in the given charts.</strong> <br> 
						&middot Minimal flight levels are at least 600m or 2000ft above the highest obstacles (within an radius of 8km).<br>
						&middot When no minimum flight altitude has been established in the charts then, at least 300m or 1000ft above the heighest obstacles (within an radius of 8km).
					</p>
					<h5 class="card-title"><u>Transition layer</u></h5>
					<p class="card-text">
						<strong>No cruise or flight level or cruise altitude can be choosen in the transition layer</strong><br>
						&middot The transition layer is the airspace between the transition altitude and the transition level.
					</p>
					<img src="../assets/img/transitionlayer.png" class="img-responsive w-50" alt="Transitionlayer">
					<h5 class="card-title"><u>Available IFR Levels:</u></h5>
					<p class="card-text">
						<strong>Air traffic control or the appropriate ATIS authority can decide the flight level for the Aircraft. <br> The cruise altitude or cruise flight level in an IFR flight are operated above minimum flight altitude <br>and is decided by the airplanes heading or the so called "Track" with respect to the <u>semi-circular rule</u></strong>
						<br>
					</p>
					<p class="card-text">
						<u>We first have to distinguish between flight altitude and flight levels.</u><br>
						&middot IFR flights use <strong>altitudes</strong> are below the Transition Layer ending with the number 000: 5000ft, 6000ft, 7000ft, 8000ft<br>
						&middot IFR flights use flight <strong>levels</strong> are above the Transition Layer ending with the number 0: FL50, FL60, FL70, FL210,
					</p>
					<img src="../assets/img/flightlevel.png" class="img-responsive w-50" alt="Flightlevel">
					<h5 class="card-title"><u>Odd and even flight levels:</u></h5>
					<p class="card-text">
						<strong>VFR flight levels end with "0" or "5" to give the necessary seperation between the IFR flights.<br>
						For flights in opposite directions, aircraft have been separated in two categories, the even and the odd flight level.<br>
						This rule ensures that the Aircrafts passing the same Waypoint at the same time, but in oppossite directions do not collide <br> with each other. Also Reduced vertical seperation is applicable for flight levels between FL290 and FL410.</strong>
					</p>
					<p class="card-text">
						<strong>
						</strong>
					</p>
					<p class="card-text">
						Even flight level West <= East: FL80, FL120, FL260<br>
						Odd flight level West => East: FL90, FL130, FL270 
					</p>
				 	<img src="../assets/img/rvsmairspace.png" class="img-responsive w-50" alt="Reduced vertical separation minima">
				</div>

			</div>

		</div>
		<!-- <div class="col-md-6">
			<div class="card">
				<h3 class="card-header"><i class="fas fa-question-circle"></i> &nbsp;Example</h3>
				<div class="card-body">
					<h5 class="card-title"><u>Transition layer</u></h5>
				 	<img src="../assets/img/transitionlayer.png" class="img-responsive w-75" alt="Transitionlayer">
				 	<h5 class="card-title"><u>Flight Level</u></h5>
				 	<img src="../assets/img/flightlevel.png" class="img-responsive w-75" alt="Flightlevel">
				 	<h5 class="card-title"><u>Reduced vertical separation minima</u></h5> 
				 	<h5 class="card-title"><u>None reduced vertical separation minima</u></h5> 
				 	<img src="../assets/img/nonrvsmairspace.png" class="img-responsive w-75" alt="None reduced vertical separation minima"> 
				</div>

			</div>

		</div> -->
	<!-- </div> -->
</div>



<div class="container" id="secondPage">
<!-- <h1 class="mt-3">Abbreviations in Aviation</h1> -->
	<div class="col">
		<div class="card">
			<h3 class="card-header"><i class="fas fa-file-alt"></i> &nbsp;Abbreviations in Aviation</h3>
			<div class="card-body">
				<p class="card-text">
					<strong>In the Aviation Industry message have to be sent quick but accurate. For this reason "Abbreviating" is very important<br> to keep everything simple but not to loose the accurcy of the message.</strong>
				</p>
				<h5 class="card-title text-center"><u>List of the common Abbreviations</u></h5>
				<p class="card-text text-center">
					<strong>ACA</strong>  Arctic Control Area 
				</p>
				<p class="card-text text-center">
					<strong>ACAS</strong>  Airborne Collision Avoidance System
				</p>
			</div>
		</div>
	</div>
</div>
<div id="snackbar"></div>
<?php include '../assets/layout/footer.php'; ?>