<?php
    $page = 'home';
    $title = 'ATC-Com';
    include 'assets/layout/header.php'; ?>
<script defer src="/assets/js/index.js"></script>

<div class="text-center">
    <h1 class="display-3">ATC-Com</h1>

    <div class="jumbotron my-4 mx-auto w-75">
        <h1>What do you want to do?</h1>

        <ul class="list-inline">

            <li class="list-inline-item py-2"><a class="btn btn-primary" href="/atc/">
                    <i class="fas fa-broadcast-tower"></i> &nbsp;ATC Communications
                </a></li>

            <li class="list-inline-item py-2"><a class="btn btn-primary" href="/runways/">
                    <i class="fas fa-plane-departure"></i> &nbsp;Runway Analysis
                </a></li>

            <li class="list-inline-item py-2"><a class="btn btn-primary" href="/metar/">
                    <i class="fas fa-cloud"></i> &nbsp;Decode a METAR
                </a></li>

        </ul>

        <li class="list-inline">

        <li class="list-inline-item py-2"><a class="btn btn-primary" href="/about/">
                <i class="fas fa-bug"></i> &nbsp;Report a Bug
            </a></li>

        <li class="list-inline-item py-2"><a class="btn btn-primary" href="/about/">
                <i class="far fa-lightbulb"></i> &nbsp;Make a Suggestion
            </a></li>

        <li class="list-inline-item py-2"><a class="btn btn-primary" href="/about/">
                <i class="fas fa-comment"></i> &nbsp;Leave a Message
            </a></li>

        </ul>
    </div>

    <div class="container-fluid mb-2">

        <div class="card-deck">

            <div class="card mb-3 bg-success text-white" id="likebox">
                <div class="card-body pt-5 text-center">
                    <h5 class="card-title mt-3">Like This Website?</h5>
                    <p class="card-text">
                        <div class="input-group input-group-lg w-50 mx-auto">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-light" id="likebutton"><i class="fa fa-thumbs-up"></i>
                                </button>
                            </div>
                    <p type="number" class="form-control text-center" readonly id="likes">
                </div>
                </p>
            </div>
        </div>

        <div class="w-100 d-none d-sm-block d-md-none"><!-- 1 column for sm --></div>

        <div class="card mb-3 bg-warning">
            <div class="card-body text-center">
                <h5 class="card-title">About this Site</h5>
                <p class="card-text">This website contains some useful tools for online flight simulator pilots.</p>
                <p class="card-text">A lot of new tools are currently being developed; please use the sugesstion Contact
                    Us page to make suggestions and report bugs!</p>
            </div>
        </div>

        <div class="w-100 d-none d-md-block d-lg-none"><!-- 2 column for md --></div>
        <div class="w-100 d-none d-sm-block d-md-none"><!-- 1 column for sm --></div>

        <div class="card mb-3 text-white bg-info">
            <div class="card-body text-center">
                <h5 class="card-title">Join ATC-Com´s Discord Server</h5><br>
                <h2 class="card-text"><a class="text-white" href="https://discord.gg/rufp9hw">--><u>ATC-Com</u><--</a>
                </h2>
                <img src="assets/img/radar.png" alt="radar" height="50" width="50">
            </div>
        </div>
        <div class="card mb-3 text-white bg-dark">
            <div class="card-body text-center">
                <h5 class="card-title">Latest News</h5>
                <p class="card-text">Thank you for supporting ATC-COM. A new Tool is being developed as we speak, a little hint "NOTAMS"</p>
            </div>
            <div class="card-footer text-white text-center">
                <u>Posted: Thu, 27 Jun 2019 12:09:10 GMT</u>
            </div>
        </div>
    </div>
</div>

<h3>Credits</h3>
<p class="lead">Thanks to Calum Shepherd for the frontend development and <a href="https://superananas.de/">
        Superananas</a> for programming help.</p>
<div id="snackbar"></div>

<?php
    include 'assets/layout/footer.php'; ?>
