<?php
    $page = 'metar';
    $title = 'METAR Decoder';
    include '../assets/layout/header.php'; ?>

<script defer src="/metar/metar.js"></script>

<div class="row">
    <div class="col-md-7">
        <h1>METAR Decoder</h1>
        <h3>Aviation Weather Report Translator</h3>

        <div class="py-3">
            <div class="form-group">

            <!-- HTML to write -->
                <label for="icao">Encoded METAR</label>
                <input type="text" id="icao" placeholder="Aerodrome ICAO" class="form-control" autocomplete="off">
            </div>

            <div class="form-group">
                <button class="btn btn-primary" id="decode-button">Decode</button>
                <button class="btn btn-secondary" id="clear-button">Clear</button>
            </div>

            <div class="form-group">
                <label for="report-output">Metar report</label>
                <div id="report-output"></div>
            </div>
        </div>
        <div>
            <table class="table table-striped">
                <tbody id="metarTable"></tbody>
            </table>
        </div>
    </div>

    <div class="col-md-5 pb-4">
        <div class="card">
            <h3 class="card-header"><i class="fas fa-question-circle"></i>&nbsp;Help</h3>

            <div class="card-body">
                <p class="card-text">
                    This tool has been adapted from the original METAR Decoder JavaScript program from <a href="http://heras-gilsanz.com/manuel/index.html">Manuel Heras</a>.
                </p>

                <h5 class="card-title">Using this tool</h5>

                <p class="card-text">
                    You can enter an encoded METAR into the top text area. Click "Decode" to have the weather report translated into a human-readable format.
                </p>

                <p class="card-text">
                    Please note that METARs which are in the standard <strong>US format</strong> are <strong>not supported</strong>.
                </p>

                <p class="card-text">
                    The decoder doesn't convert <em>all</em> weather situations you will find in a METAR, but all basic weather parameters will be decoded.
                </p>

                <p class="card-text">
                    You can also use the example buttons 1-4 to see examples of how the decoder works.
                </p>

                <h5 class="card-title">Applying this tool</h5>

                <p class="card-text">
                    This tool will help you to understand the basic format of a METAR, however it:
                    <ul>
                        <li><strong>will not</strong> tell you the exact weather conditions at a specific location;</li>
                        <li><strong>does not</strong> decode TAFs (aviation forecasts).</li>
                        <li><strong>should not</strong> be used to make critical decisions, as the tool could provide false information or conflict with the actual weather.</li>
                    </ul>
                </p>

                <p class="card-text">
                    If you see something in a METAR which you do not understand, you should consult a key of METAR parameters, or ask someone who will know.<br>
                    Wikipedia provides basic <a href="https://en.wikipedia.org/wiki/METAR#International_METAR_codes">information on METAR parameters</a> which you can use.
                </p>
            </div>
        </div>
    </div>
</div>

<div id="snackbar"></div>

<?php
    include '../assets/layout/footer.php'; ?>
