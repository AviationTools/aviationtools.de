<?php
    $page = 'runways';
    $title = 'Runway Analysis';
    include '../assets/layout/header.php'; ?>

<script defer src="/runways/runways.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
    crossorigin="">
</script>

<div class="row">
    <div class="col-md-7">
        <div class="row">

            <div class="col-md-9">
                <h1>Runway Analysis</h1>
                <h3 id="time"></h3>
                <h3><span class="badge badge-primary" id="weatherType" data-toggle="tooltip" data-placement="right" title="TODO"></h3>
            </div>

            <div class="col-md-3">
                <svg width="200" height="75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 35" version="1.1" id="svgWindDirection">
                    <g>
                        <path d="M16,29 v-26 L23,1 M16,6 L23,4 M16,9 L23,7 M16,12 L19,11" stroke="#000" fill="none"></path>
                        <path d="M14,26 h4 l-2,6 l-2,-6"></path>
                    </g>
                </svg>
                <span style="margin:auto; display:table;" font-size="10" id="windInformation"></span>
            </div>

        </div>
        
        <!-- inputs -->
        <div class="form-row mt-3">
            <div class="form-group col">
                <input type="text" name="icao" id="icao" placeholder="Aerodome ICAO" class="form-control" autocomplete="off">
            </div>
            <div class="col">
                <div class="row">
                    <button type="button" class="btn btn-primary mx-1" id="alex">
                        <i class="fas fa-calculator"></i>&nbsp;Analyse
                    </button>
                    <button type="button" class="btn btn-success mx-1" id="sendMetar" style="display:none;">
                        Decode Metar&nbsp;<i class="fas fa-chevron-circle-right"></i>
                    </button>
                    <button id="refreshBtn" type="reset" value="Reset" class="btn btn-secondary mx-1">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- analysis -->
        <div id="out" style="display:none;">
            <table class="table table-striped table-hover table-responsive-xl">
                <thead>
                    <tr>
                        <th>Runway</th>
                        <th>Length(ft)</th>
                        <th>Surface</th>
                        <th>Crosswind</th>
                        <th>Headwind</th>
                        <th>IFR use</th>
                        <th>Lighted</th>
                        <th>Visualisation</th>
                    </tr>
                </thead>
                <tbody id="output"></tbody>
            </table>
        </div>
    </div>

    <div class="col-md-5">
       
        <div class="row">
            
            <div class="row w-100">
                <div class="col">
                    <!-- aerodrome history -->
                    <div class="card mb-4">
                        <h5 class="card-header"><i class="fas fa-history"></i>&nbsp;History</h5>
                        <div class="card-body">
                            <ol class="card-text" id="lasticao"></ol>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <!-- Notam Information -->
                    <div class="card mb-4">
                        <h5 class="card-header"><i class="fas fa-exclamation"></i>&nbsp;Notams</h5>
                        <div class="card-body">
                            <ul class="card-text" id="notamCard"></ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col">
                    <!-- Metar -->
                    <div class="card mb-4">
                        <h5 class="card-header"><i class="fas fa-cloud"></i>&nbsp;Metar</h5>
                        <div class="card-body">
                            <ol class="card-text" id="metarText"></ol>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row w-100">
                <div class="col">
                    <!-- Airport Map -->
                    <div class="card mb-4">
                        <h5 class="card-header"><i class="fas fa-compass"></i>&nbsp;Airport Layout</h5>
                        <div class="card-body" id="compassrose">
                            <div id="map" style="height: 200px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100">
                <div class="col">
                    <div class="card">
                        <h3 class="card-header"><i class="fas fa-question-circle"></i>&nbsp;Help</h3>

                        <div class="card-body">
                            <h5 class="card-title">Using this tool</h5>

                            <p class="card-text">
                                This tool will provide a wind-based analysis of all of the runways at a specified aerodrome. To see the analysis, type the four-letter ICAO code of the aerodrome into the text box and click "Analyse".
                            </p>

                            <p class="card-text">
                                The first table will display the recent METAR (weather report) for the aerodrome, with vertical and horizontal visibility extracted.
                            </p>

                            <p class="card-text">
                                The second table will display the analysis. The following is a guide on what each column means.
                            </p>

                            <dl>
                                <dt>Runway</dt>
                                <dd>The two-digit runway identifier</dd>
                                <dt>Length (ft)</dt>
                                <dd>The full length of the runway in feet</dd>
                                <dt>Surface</dt>
                                <dd>Code for the runway surface type. "ASP" (asphalt), "TURF" (turf), "CON" (concrete), "GRS" (grass), "GRE" (gravel), "WATER" (water), and "UNK" (unknown). </dd>
                                <dt>Crosswind</dt>
                                <dd>The component of the wind perpendicular to the runway, in knots</dd>
                                <dt>Headwind</dt>
                                <dd>The component of the wind parallel to the runway, in knots</dd>
                                <dt>IFR use</dt>
                                <dd>How appropriate the runway is for use for IFR aircraft</dd>
                                <dt>Lighted</dt>
                                <dd>Surface is Lighted or not</dd>
                                <dt>Visualisation</dt>
                                <dd>A compass rose showing the runway direction (black) and wind direction (blue)</dd>
                            </dl>

                            <h5 class="card-title">Applying this tool</h5>

                            <p class="card-text">
                                <strong>Usability: </strong> the appropriateness of a runway will be determined as "yes", "possible", "atc analysis", "disadvantageous" or "no", mainly depending on cross or tail wind components.
                            </p>

                            <p class="card-text">
                                Remember that <strong>Air Traffic Control <em>always</em> determines the active runway</strong>; it is the pilot's job to determine whether it is safe to use the runway(s) depending on the conditions and their aircraft. Where no ATC is present, pilots should use all the information available to them, including the movement of other traffic, to determine the runway which they intend to use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
