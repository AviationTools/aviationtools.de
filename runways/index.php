<?php
    $page = 'runways';
    $title = 'Runway Analysis';
    include '../assets/layout/header.php'; ?>

<script defer src="/runways/runways.js"></script>

<div class="row">
    <div class="col-md-7">
        <h1>Runway Analysis</h1>
        <h3 id="time"></h3>
        <h3>Wind-based runway calculations</h3>

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
                        &nbsp;Decode Metar <i class="fas fa-chevron-circle-right"></i>
                    </button>
                    <button id="RefreshBtn" type="reset" value="Reset" onClick="window.location.reload()" class="btn btn-secondary mx-1">
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
                        <th>Length (m)</th>
                        <th>Notes</th>
                        <th>Crosswind</th>
                        <th>Headwind</th>
                        <th>IFR use</th>
                        <th>Notam Information</th>
                        <th>Visualisation</th>
                    </tr>
                </thead>
                <tbody id="output"></tbody>
            </table>
        </div>

        <!-- [PENDING REMOVAL] -> -->
        <div class="sk-fading-circle" id="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
        </div>
        <!-- <- [PENDING REMOVAL] -->

    </div>

    <div class="col-md-5 pb-4">
        <div class="row">

            <div class="col-xl-7">
                <!-- compass rose -->
                <div class="card mb-4">
                    <h5 class="card-header"><i class="fas fa-compass"></i>&nbsp;Best Runway</h5>
                    <div class="card-body" id="compassrose"></div>
                </div>
            </div>

            <div class="col-xl-5">
                <!-- aerodrome history -->
                <div class="card mb-4">
                    <h5 class="card-header"><i class="fas fa-history"></i>&nbsp;History</h5>
                    <div class="card-body">
                        <ol class="card-text" id="lasticao"></ol>
                    </div>
                </div>

                <!-- Notam Information -->
                <div class="card mb-4">
                    <h5 class="card-header"><i class="fas fa-exclamation"></i>&nbsp;Notams</h5>
                    <div class="card-body">
                        <ul class="card-text text-danger" id="notamCard"></ul>
                    </div>
                </div>
            </div>
        </div>

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
                    <dt>Length (m)</dt>
                    <dd>The full length of the runway in metres</dd>
                    <dt>Notes</dt>
                    <dd>Any extra details about the runway</dd>
                    <dt>Crosswind</dt>
                    <dd>The component of the wind perpendicular to the runway, in knots</dd>
                    <dt>Headwind</dt>
                    <dd>The component of the wind parallel to the runway, in knots</dd>
                    <dt>IFR use</dt>
                    <dd>How appropriate the runway is for use for IFR aircraft</dd>
                    <dt>Notam Information</dt>
                    <dd>Checks if any Notam restrictions apply to the specific Runway</dd>
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

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
