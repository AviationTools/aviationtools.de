<?php
    $page = 'atc';
    $title = 'ATC Comms';
    include '../assets/layout/header.php'; ?>

<script defer src="atc.js"></script>

<div class="row">
    <!-- ICAO Box -->
    <div class="col-md-7">
        <div class="row">
            <div class="col-md-8">
                <h1 id="h1"></h1>
                <h3>Pilot-Controller Dialogue Generator</h3>
            </div>

            <div class="col-md-4">
                <div class="float-right">
                    <p><b><u>Which Region are you flying in?</u></b></p>
                    <div class="float-right">
                        <input id="toggle" type="checkbox" checked data-toggle="toggle" data-on="FAA" data-off="EASA" data-offstyle="success" data-onstyle="success">
                    </div>
                </div>
            </div>
        </div>

        <!-- radio options -->
        <div class="mt-3 text-center">
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step1" name="GroupRadio" class="custom-control-input" checked="checked">
                <label class="custom-control-label" for="Step1">IFR Clearance</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step2" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step2">Pushback Clearance</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step3" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step3">Taxi Clearance</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step4" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step4">Takeoff Clearance</label>
            </div>
            <!-- <br>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step1" name="GroupRadio" class="custom-control-input" checked="checked">
                <label class="custom-control-label" for="Step1">Handoff Departure</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step2" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step2">Handoff Center</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step3" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step3">Handoff Approach</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="Step4" name="GroupRadio" class="custom-control-input">
                <label class="custom-control-label" for="Step4">Landing Clearance</label>
            </div> -->
        </div>

        <!-- pilot info -->
        <div class="form-row mt-3">
            <div class="form-group col-lg">
                <label>Callsign</label>
                <input type="text" id="CallSign" name="CallSign" class="form-control" placeholder="e.g. DELTA59">
            </div>
            <div class="form-group col-lg">
                <label>Departure</label>
                <input type="text" id="Airport" name="Airport" class="form-control" placeholder="e.g. EDDF">
            </div>
            <div class="form-group col-lg">
                <label>ATIS Letter</label>
                <input type="text" id="ATIS" name="ATIS" class="form-control" placeholder="e.g. F">
            </div>
            <div class="form-group col-lg">
                <label>Destination</label>
                <input type="text" id="Destination" name="Destination" class="form-control" placeholder="e.g. KBOS">
            </div>
        </div>

        <!-- buttons -->
        <div class="mt-3 text-center">
            <button id="button" type="button" class="btn btn-primary">
                <i class="fas fa-plane"></i> &nbsp;Pilot + <i class="fas fa-broadcast-tower"></i> &nbsp;ATC
            </button>
            <button id="exampbtn" type="button" class="btn btn-info">
                <i class="fas fa-info"></i> &nbsp;Example
            </button>
        </div>

        <!-- output -->
        <div class="my-4">
            <h5>Output</h5>

            <div class="form-group">
                <label>Pilot</label>
                <textarea disabled class="form-control" id="output"></textarea>
            </div>
            <div class="form-group">
                <label>Controller</label>
                <textarea disabled class="form-control" id="outputAtc"></textarea>
            </div>
        </div>
    </div>

    <!-- HELP BOX -->
    <div class="col-md-5 pb-4" id="helpBox1">
        <div class="card">
            <h3 class="card-header"><i class="fas fa-question-circle"></i> &nbsp;Help</h3>

            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                    <a class="nav-link active" href="#">General</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="extraHelp">Different Departures FAA</a>
                </li>
            </ul>

            <div class="card-body">
                <h5 class="card-title">Using this tool</h5>

                <p class="card-text">
                    To use this tool, simply select the type of clearance you wish to generate, and then enter your ATC callsign, departure aerodrome ICAO code, ATIS information designator and destination aerodrome ICAO code. Pressing "Pilot" followed by "ATC" will generate the dialogue between the pilot and controller respectively.
                </p>

                <p class="card-text">
                    Please note that this tool <strong>only</strong> works for <strong>IFR</strong> clearance!
                </p>

                <p class="card-text">
                    You can use the "Example" button to generate an example clearance to get an idea of how the tool works.
                </p>

                <p class="card-text">
                    The reload button will reload the page, giving you an empty form to start over.
                </p>

                <h5 class="card-title">Applying this tool</h5>

                <p class="card-text">
                    When receiving clerances from a controller, it is important that you know what to <strong>expect</strong> and what the controller <strong>actually</strong> tells you. Knowing what to expect can sometimes help you understand and hear the controller properly (particularly when the radio quality is poor), but be prepared for something different, too!
                </p>

                <p class="card-text">
                    Some of the parameters which a controller will tell you cannot be predicted by this tool and, as such, they are given placeholders (denoted by square brackets). For example, your SID (departure procedure), your squawk code and the aerodrome weather conditions will vary hugely.
                </p>
            </div>
        </div>
    </div>

    <!-- Different kind of Phrasology -->
    <div class="col-md-5 pb-4" id="helpBox2" style="display: none;">
        <div class="card">
            <h3 class="card-header"><i class="fab fa-avianex"></i>&nbsp;Different Departures</h3>
            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                    <a class="nav-link active" href="#" id="normalHelp">General</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="extraHelp">Help</a>
                </li>
            </ul>
            <div class="card-body">
                <p>
                    <h5 class="card-title"><u>If Approach Controller Is On-Line</u></h5>
                    <p><b>No Standard Instrument Departure (SID)</b></p>
                    <p>Pilot: Clearance Delivery, good day, this is Delta59 with information Bravo, request
                        IFR clearance to Miami International airport.</p>
                    <p>Controller: Delta59, Newark clearance Delivery, Cleared to Miami International airport
                        via radar vectors to COL VOR, then as filed, maintain 8,000, expect fl180 one zero
                        minutes after departure, Departure frequency 128.15, Squawk 2523.</p>
                </p>
                <p>
                    <p><b>Standard Instrument Departure (SID) & No Altitude Restrictions</b></p>
                    <p>Pilot: Clearance Delivery, good day, this is Delta59 with information Bravo, request IFR
                        clearance to Miami International airport.</p>
                    <p>Controller: Delta59, Newark clearance delivery, Cleared to Miami International
                        Airport, KENNEDY4 Departure, climb via the SID, expect FL 220 one zero minutes after departure,
                        Departure frequency 128.15, Squawk 2523.</p>
                </p>
                <p>
                    <p><b>Standard Instrument Departure (SID) & With Altitude Restrictions</b></p>
                    <p>Pilot: Clearance Delivery, good day, this is Delta59 with information Bravo, request
                        IFR clearance to Miami International airport.</p>
                    <p>Controller: Delta59, Newark clearance delivery, Cleared to Miami International
                        Airport, KENNEDY4 Departure, climb via the SID, except maintain 8,000, expect FL 220 one zero
                        minutes after departure, Departure frequency 128.15, Squawk 2523.</p>
                </p>
                <p>
                    <p><b>Radar Vectored Departure</b></p>
                    <p>Pilot: Clearance Delivery, good day, this is Delta59 with information Bravo, request
                        IFR clearance to Miami International airport.</p>
                    <p>Controller: Delta59, Newark delivery, Cleared to Miami International Airport,
                        KENNEDY4 Departure, Radar Vectors COL VOR, maintain 8,000, expect FL 220
                        one zero minutes after departure, Departure frequency 128.15, Squawk 2523.</p>
                </p>
                <p>
                    <p><b>Radar Vectored Departure with published climb procedures</b></p>
                    <p>Pilot: Clearance Delivery, good day, this is Delta59 with information Bravo, request
                        IFR clearance to Miami International airport.
                    <p>Controller: Delta59, Newark delivery, Cleared to Miami International Airport,
                        KENNEDY4 Departure, Canarsie Climb, Radar Vectors WHITE, maintain 8,000, expect FL 220
                        one zero minutes after departure, Departure frequency 128.15, Squawk 2523.</p>
                </p>
            </div>
        </div>
    </div>
</div>

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
