<?php
    $page = 'sidstar';
    $title = 'Sid/Star Analysis';
    include '../assets/layout/header.php'; ?>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
      integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
      crossorigin="" />
<script defer src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
        integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
        crossorigin=""></script>
<script defer
        src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet'
      href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css'
      type='text/css' />
<script defer src="../assets/offline/l.ellipse.min.js"></script>
<script defer src="sidstar.js"></script>

<div class="row">
    <div class="col-md-7">
        <div class="row">
            <div class="col-md-8">
                <h1 id="h1"></h1>
                <h3>Standard Departure & Arrival Routes</h3>
                <div class="form-row mt-3">
                    <div class="form-group col">
                        <div class="row">
                            <input type="text" name="icao" id="icao" placeholder="Aerodome ICAO"
                                   class="form-control w-25 mx-3">
                            <div>
                                <button name="checkbox" type="button" class="btn btn-primary mx-1" id="sid">SID</button>
                            </div>
                            <div>
                                <button name="checkbox" type="button" class="btn btn-primary mx-1" id="star">STAR
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6" style="display: none;">
                                <div>
                                    <label class="d-inline">
                                        <button name="checkbox" type="button" class="btn btn-outline-success my-1"
                                                id="runway">
                                            <i class="fa fa-globe" aria-hidden="true"></i>
                                        </button>
                                        Correct Runway
                                    </label>
                                </div>
                                <div>
                                    <label class="d-inline">
                                        <button name="checkbox" type="button" class="btn btn-outline-primary my-1"
                                                id="runwaySelection">
                                            <i class="fa fa-road" aria-hidden="true"></i>
                                        </button>
                                        Choose Runway
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6" style="display: none;">
                                <div>
                                    <label class="d-inline">
                                        <button name="checkbox" type="button" class="btn btn-outline-dark my-1"
                                                id="departureSelection">
                                            <i class="fa fa-compass" aria-hidden="true"></i>
                                        </button>
                                        <p class="d-inline" id="label"></p>
                                    </label>
                                </div>
                                <div id="appDiv" style="display: none;">
                                    <label class="d-inline">
                                        <input id="approach" type="checkbox" data-toggle="toggle" data-size="small"
                                               data-on="<i class='fa fa-location-arrow' aria-hidden='true'></i>"
                                               data-onstyle="warning" data-offstyle="warning">
                                        Activate Approach
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <!-- Compass -->
                <div class="float-right" id="compass" style="display:block;"></div>
                <!-- Active Runway -->
                <div class="" id="activeRunway" style="display:block;"></div>
                <!-- Runway Tabelle -->
                <div class="float-right" id="output" style="display:none;">
                    <table class="table table-dark table-hover table-responsive-xl">
                        <thead>
                        <tr>
                            <th>Runway</th>
                            <th>Length(meters)</th>
                            <th>Selection</th>
                        </tr>
                        </thead>
                        <tbody id="runwayTable"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Sid Tabelle -->
        <div id="sid" style="display:block;">
            <table class="table table-responsive-xl">
                <!-- class="table table-striped table-hover table-responsive-xl" -->
                <thead>
                <tr id="tableConfig"></tr>
                </thead>
                <tbody id="SidOutput"></tbody>
            </table>
        </div>
    </div>
    <div class="col-md-5" id="helpBox1">
        <div class="row">
            <!-- class="row sticky-top" style="top: 4.5em;" -->
            <div class="card">
                <h3 class="card-header"><i class="fas fa-map-marked-alt"></i>&nbsp;Map</h3>
                <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="help">Help</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Map</a>
                    </li>
                </ul>
                <div class="card-body">
                    <div style="width: 100%; height: 100%;" id="mapid"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-5" id="helpBox2" style="display: none;">
        <div class="row">
            <!--  class"row sticky-top" style="top: 4.5em; overflow-y: scroll; height:50%;" -->
            <div class="card">
                <h3 class="card-header"><i class="fas fa-question-circle"></i> &nbsp;Help</h3>
                <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" id="help">Help</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="map">Map</a>
                    </li>
                </ul>
                <div class="card-body">
                    <h5 class="card-title">Using this tool</h5>
                    <p class="card-text">
                        This tool will provide Standard Instrument Departure Routes & Standard Arrival Routes for any
                        airport with these capabilities. To see the routes, type the four-letter ICAO code for the
                        aerodrome into the text box and choose between "SID" or "STAR".
                        <u>The information will be given in a table, <b>click</b> into the rows to get the procedure
                            displayed into the map</u>.
                    <h5 class="card-title">Why?</h5>
                    At bigger airports pilots, follow so-called Arrival/Departure routes to safely be guided to or from
                    the airport and avoid obstacles and other terrain. Important to know is that, not every aerodrome
                    has these procedures! In the United States they almost dont use Standard Instrument Departure
                    Routes, for more Information check out <a href="/atc/"" class="btn btn-primary
                    btn-sm" role="button" aria-disabled="true">ATC Comms <i class="fas fa-broadcast-tower"></i></a>
                    </p>
                    <p class="card-text">
                        <u>If you choose the "SID" button. More options will be available:</u>
                    <ul>
                        <li>
                            <dt>"Correct Runway"</dt>
                            will use the runway analyze tool on "Aviation Tools" and provide the correct runway at the specific
                            aerodrome, based on the weather information and many more factors.
                        </li>
                        <li>
                            <dt>"Choose Runway"</dt>
                            will let you choose the desired runway for takeoff.
                        </li>
                        <br>
                        <li>
                            <dt>"Departure Selection"</dt>
                            will show a compass. The buttons in the compass will draw a line in the direction you would
                            like to fly to, also known as "Track".
                        </li>
                    </ul>
                    </p>
                    <p class="card-text">
                        <u>If you choose the "STAR" button. More options will be available:</u>
                    <ul>
                        <li>
                            <dt>"Correct Runway"</dt>
                            will use the runway analyze tool on "Aviation Tools" and provide the correct runway at the specific
                            aerodrome based on the weather information and many more factors.
                        </li>
                        <li>
                            <dt>"Choose Runway"</dt>
                            will let you choose the desired runway for landing.
                        </li>
                        <li>
                            <dt>"Approach Selection"</dt>
                            will show a compass. The buttons in the compass will draw a line in the direction from where
                            the plane initially came from also known as "Track".
                        </li>
                        <li>
                            <dt>"Activate Approach"</dt>
                            can be activated if you would like to see the complete approach procedure on the map, this
                            includes the "missed approach" and the "holding patterns". The table will show the available
                            approach procedures from were you can click and choose the desired runway.
                        </li>
                    </ul>
                    </p>
                    <dl>
                        <u>The Generated Table will show the following:</u>
                        <dt>Sid/Star Name</dt>
                        The unique name e.g "COL7B" to specify the given procedure.
                        <dt>Runway</dt>
                        The runway which will be available for the procedure.
                        <dt>Flight Level (only available with SID)</dt>
                        The flight level gets calculated through the so called "Semicircular Rule". This basically lets
                        you know if the flight level you will be choosing is going to be even or odd e.g (Odd => FL350
                        || Even => FL380). This lets aircraft safely be separated when coming from opposite directions.
                        <dd>Track in (degrees)</dd>
                        The track gets measured by the last waypoints (Sid) or the first waypoints (Star).
                        <dt>Track HDG</dt>
                        The track hdg is basically the same as the track just converted to compass terminology.
                        <dd>Waypoints</dd>
                        The waypoint names will be shown in the right order for the given procedure.
                    </dl>
                    <h5 class="card-title">Applying this tool</h5>
                    <p class="card-text">
                        Remember that <strong>Air Traffic Control <em>always</em> determines the SID or STAR and active
                            runways</strong>; it is the pilot's job to determine whether it is safe to use this
                        information depending on the conditions and their aircraft. Where no ATC is present, pilots
                        should use all the information available to them, including the movement of other traffic, to
                        determine the procedure which they intend to use.
                    </p>
                    <h5 class="card-title">Version</h5>
                    <p class="card-text">
                        AIRAC: 1811<br>
                        CIFP: Coded Instrument Flight Procedures"<br>
                        Database Source: <a
                            href=" https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/cifp/">
                            Federal Aviation Administration
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div id="snackbar"></div>

    <?php
        include '../assets/layout/footer.php'; ?>

