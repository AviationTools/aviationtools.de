<?php
    $page = 'speech';
    $title = 'Speech Recognition';
    include '../assets/layout/header.php'; ?>

<!-- Game Engine -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>

<script defer src="./speech/speech.js"></script>

<div class="row">

    <div>
        <h1>Speech Recognition</h1>
        
        <button id="start">Start Listening</button>
        <button id="stop">Stop Listening</button>

        <p class="hints"></p>

        <div>
            <p class="output"></p>
        </div>

    </div>

</div>

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
