<?php
    $page = 'intercept';
    $title = 'Interception';
    include '../assets/layout/header.php'; ?>

<!-- Game Engine -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>

<script defer src="intercept/intercept.js"></script>

<div class="row">
    <div class="col">
        <div class="card">
            <h5 class="card-header"><i class="fas fa-info-circle"></i> &nbsp;Information</h5>
            <div class="card-body text-center">
                
                <h3><u>How to beginn</u></h3>
                <ul class="list-group">
                    <li class="list-group-item">1. Locate actual line of position</li>
                    <li class="list-group-item">2. Locate required line of position</li>
                    <li class="list-group-item">3. Calculate angle difference</li>
                    <li class="list-group-item">4. Determine interception method</li>
                    <li class="list-group-item">5. Determine interception heading</li>
                    <li class="list-group-item">6. Determine first turn</li>
                </ul>

                <br>

                <h3><u>Interception Methods</u></h3>
                <p>&#9642; <b>45</b>&deg;: max 30&deg; difference</p>
                <p>&#9642; <b>90&deg;/45&deg;</b>: 30&deg; - 70&deg; difference</p>
                <p>&#9642; <b>180&deg;/90&deg;/45&deg;</b>: differnce > 70&deg;</p>

                
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <h5 class="card-header"><i class="fas fa-gamepad"></i>&nbsp;Pilot Test</h5>
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <button id="RefreshBtn" type="reset" value="Reset" onclick="restartApp()" class="btn btn-secondary">
                        <i class="fas fa-sync-alt"></i> Start
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
