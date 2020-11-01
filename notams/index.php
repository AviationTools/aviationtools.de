<?php
    $page = 'notams';
    $title = 'Notam Decoder';
    include '../assets/layout/header.php'; ?>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
      integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
      crossorigin="" />
<script defer src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
        integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
        crossorigin=""></script>
<script defer src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css' type='text/css' />
<script defer src="../assets/offline/l.ellipse.min.js"></script>
<script defer src="../assets/js/fuse.min.js"></script>
<style>
    #Suffix:hover, #Start:hover, #End:hover, #Number:hover {
        background-color: grey;
        cursor: pointer;
    }
</style>
<span class="badge badge-warning">Due to the "FAA" changing there NOTAM retrieval website, where ATC-COM gets the information from! I will need to rethink the design. My apologies.</span>
<div class="row">
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-8">
                <h1>Notam Decoder</h1>
                <div class="form-row mt-3">
                    <div class="form-group col">
                        <div class="row">
                            <input disabled type="text" name="icao" id="icao" placeholder="Aerodome ICAO" class="form-control w-25 mx-3">
                            <div>
                                <button disabled name="checkbox" type="button" class="btn btn-primary mx-1" id="decode">Decode</button>
                                <button name="checkbox" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-success mx-1" id="helpBox">Help</button>
                            </div>
                        </div>
                        <div class="row">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
        <div id="table" style="display:none;">
            <div class="row">
                <div class="col-md-6">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        </ul>
                    </nav>
                </div>
                <div class="col-md-6">
                    <div class="input-group mb-3 d-flex justify-content-end">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                        </div>
                        <div class="w-25">
                            <input id="search" type="text" class="form-control" placeholder="Search..">
                        </div>
                    </div>
                </div>
            </div>
            <!-- style="height: 33em;" -->
            <div id="tableBox" class="overflow-auto">
                <table class="table table-hover table-responsive-xl">
                    <thead>
                    <tr id="tableConfig"></tr>
                    </thead>
                    <tbody id="output"></tbody>
                </table>
            </div>
            <div class="row">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    </ul>
                </nav>
                <p class="d-flex align-items-center mx-3"><b id="notamTotal"></b></p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <h3 class="card-header">
                <i class="fas fa-book"></i> &nbsp;Legend
            </h3>
            <div class="card-body">
                <h5 class="card-title">Useful Information for the Notam Decoder</h5>
                <p>
                    This tool uses real data from real airports to provide you with the necessary preflight information. The Notam decoder provides accurate information for the EASA & FAA region but also the rest of the world.
                    <br>
                    <br>
                    <b>Note, this Tool is should not be used as a primary information source! Please use the Notam provided by the affiliated organizations.</b>
                    <br>
                    <br>
                    The Notams are displayed in an organized format, which makes reading them a lot easier.
                    If the category name has this symbol
                    <button type="button" disabled="" class="btn btn-sm text-white bg-dark"><i class="fas fa-sort"></i></button>
                    you can resort the Notams as needed. When clicking
                    <i id="toggle" class="fas fa-caret-square-down text-primary"></i>
                    <i id="toggle" class="fas fa-caret-square-up text-primary"></i>
                    on a Notam row, more information get displayed e.g. "RAW Notam" , "Full Details" & "Created (Date)".
                    <br>
                    <br>

                <h6><u>EASA region is displayed in this format.</u></h6>
                <b>Number</b>
                <br>
                Notam Number | Series/Year => A6271/19.
                <br>
                <b>FIR</b>
                <br>
                Flight Information Region | The ATC Sector associated with the Airport.
                <br>
                <b>Suffix</b>
                <br>
                Information about the Notam e.g. "New Notam" or "Replacing Notam".
                <br>
                <b>Valid for</b>
                <br>
                Shows which rules apply with the Notam for more information <b><u>hover</u></b> above the icons.
                <div class="row ml-5" style="width:8em;">
                    <div class="btn-group-vertical" role="group">
                        <button type="button" disabled="" class="btn btn-sm btn-success" data-toggle="tooltip" data-placement="top" title="Visual Flight Rules">VFR</button>
                        <button type="button" disabled="" class="btn btn-sm btn-danger" data-toggle="tooltip" data-placement="top" title="Instrument Flight Rules">IFR</button>
                    </div>
                    <div class="btn-group-vertical" role="group">
                        <button type="button" disabled="" class="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" data-html="true" title="Aerodrome">A</button>
                        <button type="button" disabled="" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" data-html="true" title="(N)NOTAM selected for the immediate attention to aircraft operators.(B)NOTAM selected for PIB entry.(O)Operationally significant NOTAM.">NBO</button>
                    </div>
                </div>
                <br>
                <b>Condition</b>
                <br>
                The condition of the object which the Notam provides e.g. "Changed" or "Closed".
                <br>
                <b>Object</b>
                <br>
                The object which this Notam is relating to e.g. "ILS" or "Runway".
                <br>
                <b>Details</b>
                <br>
                Notam details provide important and additional information regarding the changes in the Notam.
                <br>
                <b>Start</b>
                <br>
                The starting date at which the Notam becomes active (day/month/year).
                <br>
                <b>End</b>
                <br>
                The ending date at which the Notam becomes inactive (day/month/year).
                <br>
                <br>
                <h6><u>FAA region is displayed in this format.</u></h6>
                <b>Item ID</b>
                <br>
                The ID which represents the order of the Notam.
                <br>
                <b>Notam Type</b>
                <br>
                There are many types of NOTAMs, including international, domestic, military, and civilian.
                <br>
                <b>Notam Number</b>
                <br>
                The specific Notam number e.g. 9/4819.
                <br>
                <b>Keyword</b>
                <br>
                The keyword which this Notam is relating to e.g. "ILS" or "Runway".
                <br>
                <b>Object</b>
                <br>
                The object displays the basic necessary information about the given Notam.
                <br>
                <b>Condition</b>
                <br>
                The condition of the keyword which the Notam provides e.g. "Changed" or "Closed".
                <br>
                <b>Details</b>
                <br>
                Notam details provide important and additional information regarding the changes in the Notam.
                <br>
                <b>Start</b>
                <br>
                The starting date at which the Notam becomes active (day/month/year).
                <br>
                <b>End</b>
                <br>
                The ending date at which the Notam becomes inactive (day/month/year).
                <br>
                <br>
                <p>
                    <b>Additional Information about Notams can be found on these websites:</b><br><a href="https://www.faa.gov/air_traffic/publications/notices/">Federal Aviation Administration</a> or <a href="https://www.thebalancecareers.com/what-is-a-notam-282687">Different Notam Types</a>
                </p>
                </p>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 50em;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tutorial</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" style="background-color: black;" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1" style="background-color: black;"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2" style="background-color: black;"></li>
                    </ol>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../assets/img/first.png" class="d-block w-100" alt="first">
                            <div class="carousel-caption d-none d-md-block">
                                <div style="background-color: black;border-radius: 10px">
                                    <h5>First Step</h5>
                                    <p>Type in the ICAO and start "Decoding".</p>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <img src="../assets/img/second.png" class="d-block w-100" alt="second">
                            <div class="carousel-caption d-none d-md-block">
                                <div style="background-color: black;border-radius: 10px">
                                    <h5>More Information</h5>
                                    <p>Tap into a Notam "Row" and get more Information.</p>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <img src="../assets/img/third.png" class="d-block w-100" alt="third">
                            <div class="carousel-caption d-none d-md-block">
                                <div style="background-color: black;border-radius: 10px">
                                    <h5>Search</h5>
                                    <p>Type in Keywords to search e.g. "Closed Runway".</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style="color: black;">
                        <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: black;"></span>
                        <span class="sr-only">Previous</span>
                    </a>

                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: black;"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="snackbar"></div>
<script defer src="/assets/js/notams.js"></script>
<?php
    include '../assets/layout/footer.php'; ?>
