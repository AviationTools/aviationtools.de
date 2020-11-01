<?php
    $page = 'game';
    $title = 'Pilot Test';
    include '../assets/layout/header.php'; ?>

<!-- Game Engine -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
<!-- Firebase API -->
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
<script>
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCREOac6DBASV-6ryQPve_TSDtrY4p8ayo",
        authDomain: "atc-communication-generator.firebaseapp.com",
        databaseURL: "https://atc-communication-generator.firebaseio.com",
        projectId: "atc-communication-generator",
        storageBucket: "atc-communication-generator.appspot.com",
        messagingSenderId: "1059402190417"
    };
    firebase.initializeApp(config);
</script>
<script defer src="game.js"></script>

<div class="row">
    <div class="col">
        <div class="card">
            <h5 class="card-header"><i class="fas fa-star"></i> &nbsp;Highscore</h5>
            <div class="card-body">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="highScoreName"></td>
                        <td id="highScoreValue"></td>
                        <td id="highScoreDate"></td>
                    </tr>
                    </tbody>
                </table>

                <!-- <u><h2 class="card-text text-center" id="highScoreName"></h2></u>
                <h3 class="card-text text-center" id="highScoreValue"></h3> -->

                <div id="entryBox" style="display:none;">
                    <h2 class="text-warning text-center">Newest Highscore!</h2>
                    <div class="row d-flex justify-content-center">
                        <input type="text" id="highScoreUser" placeholder="Enter your Name!" class="form-control w-50">
                        <button id="submit" type="button" class="btn btn-success btn-sm">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <h5 class="card-header"><i class="fas fa-gamepad"></i>&nbsp;Pilot Test</h5>
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <button id="RefreshBtn" type="reset" value="Reset" onclick="restartApp()" class="btn btn-secondary">
                        <i class="fas fa-sync-alt"></i> Reset
                    </button>
                </div>
                <div id="game" class="mt-1"></div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <h5 class="card-header"><i class="fas fa-info-circle"></i> &nbsp;Information</h5>
            <div class="card-body">
                <p class="card-text text-center">This pilot test lets you test your <u>reaction & concentration</u> skills in a playful way.</p>
                <p class="card-text text-center">To start <u>"click"</u> on the <b class="text-danger">red box</b> and try dragging the box around without touching the other squares or the edge of the game.</p>
                <p class="card-text text-center">If you beat the highscore, make sure to enter your <b>"name" & submit</b> afterwards, <b class="text-success">Good Luck!</b></p>
            </div>
        </div>
    </div>
</div>

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
