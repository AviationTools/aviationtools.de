<?php
    $page = 'home';
    $title = 'Aviation Tools';
    include 'assets/layout/header.php'; ?>

<script defer src="index.js"></script>

<div class="text-center">
    <h1 class="display-3">Aviation Tools</h1>

    <div class="jumbotron my-4 mx-auto w-75">
        <h1>What do you want to do?</h1>

        <ul class="list-inline">
            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/notams/">
                    <i class="fas fa-newspaper"></i>&nbsp;Notams
                </a>
            </li>

            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/runways/">
                    <i class="fas fa-plane-departure"></i>&nbsp;Runway Analysis
                </a>
            </li>

            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/metar/">
                    <i class="fas fa-cloud"></i>&nbsp;Decode a METAR
                </a>
            </li>
        </ul>

        <ul class="list-inline">
            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/about/">
                    <i class="fas fa-bug"></i>&nbsp;Report a Bug
                </a>
            </li>

            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/about/">
                    <i class="far fa-lightbulb"></i>&nbsp;Make a Suggestion
                </a>
            </li>

            <li class="list-inline-item py-2">
                <a class="btn btn-primary" href="/about/">
                    <i class="fas fa-comment"></i>&nbsp;Leave a Message
                </a>
            </li>
        </ul>
    </div>

    <div class="container-fluid mb-2">
        <div class="card-deck">
            <div class="card mb-3 bg-success text-white" id="likebox">
                <div class="card-body text-center">
                    <h6><i class="fab fa-github text-white"></i></h6>
                    <a href="https://github.com/AviationTools/aviationtools.de" class="link text-center text-white">Github Project</a>
                    <hr>
                    <h6><i class="fas fa-plane text-white"></i></h6>
                    <a href="https://www.flightpilote.fr/threads/landing-assistance-%C3%A0-latterrissage-v0-91.7157/#post-121798" class="link text-center text-white">Landing Software</a>
                    <hr>
                    <h6><i class="fab fa-discord text-white"></i></h6>
                    <a href="https://discord.gg/bd5wfkfn" class="link text-center text-white">Aviation-Tools</a>
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
                    <br>
                    <br>
                    <h1><i class="far fa-envelope"></i></h1>
                    <a class="text-white" href= "mailto:werbungbnc@web.de">Contact Us!</a>
                </div>
            </div>

            <div class="card mb-3 text-white bg-dark">
                <div class="card-body text-center">
                    <h5 class="card-title">Latest News <small class="badge badge-warning">Update!</small></h5>
                    <p class="card-text"><br>
                        Hello fellow Aviators.
                        I now finished my Pilot Commercial Training & will refocus my attention to
                        aviationtools, stay tuned in!
                </div>
                <div class="card-footer text-white text-center">
                    <u>Posted: Sun, 12 January 2023 16:34:58 GMT</u>
                </div>
            </div>
        </div>
    </div>

    <h3>Credits</h3>
    <p class="lead">Thanks to Calum Shepherd for the frontend development and <a href="https://superananas.de/">superananas</a> for programming help.</p>
</div>

<div id="snackbar"></div>

<?php
    include 'assets/layout/footer.php'; ?>
