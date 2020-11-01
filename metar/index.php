<?php
    $page = 'metar';
    $title = 'METAR Decoder';
    include '../assets/layout/header.php'; ?>

<script src="/assets/js/metar.js"></script>

<div class="row">
    <div class="col-md-7">
        <h1>METAR Decoder</h1>
        <h3>Aviation Weather Report Translator</h3>

        <form name="encoded" class="py-3" id="metar-form">
            <div class="form-group">
                <label>Encoded METAR</label>
                <input type="text" id="icao" placeholder="Aerodome ICAO" name="report" class="form-control" autocomplete="off">
                <!--<textarea class="form-control" name="report" rows="3"></textarea>-->
            </div>

            <div class="form-group">
                <input class="btn btn-primary" value="Decode" name="decode" id="btn" type="button">
                <input class="btn btn-secondary" name="reset" value="Clear" onclick="this.form.report.value=''; this.form.decreport.value='';" type="button">

                <div class="btn-group">
                    <input class="btn btn-info" name="example1" value="Example 1" onclick="this.form.report.value='LEZL 150800Z VRB03KT 0700SW 6000E PRFG OVC009 13/13 Q1022 NOSIG'; metar_decode(this.form.report.value);" type="button">
                    <input class="btn btn-info" name="example2" value="Example 2" onclick="this.form.report.value='LEBB 160930Z 03008KT 3000 TSGRRA SCT015TCU BKN022CB 09/06 Q0993 NOSIG'; metar_decode(this.form.report.value);" type="button">
                    <input class="btn btn-info" name="example3" value="Example 3" onclick="this.form.report.value='EGXX 301220Z 14005KT 0450E R12/1000N DZ BCFG VV/// 08/07 Q1004 NOSIG'; metar_decode(this.form.report.value);" type="button">
                    <input class="btn btn-info" name="example4" value="Example 4" onclick="this.form.report.value='LEST 201230Z 21010G25KT 180V250 1200SW 6000NW R17/1300U R35/P1500 +SHRA FEW010CB SCT017 BKN027 12/07 Q1002 RETS WS RWY17 BECMG FM1300 23030G40KT 7000 NSW SKC'; metar_decode(this.form.report.value);" type="button">
                </div>
            </div>

            <div class="form-group">
                <label>Decoded report</label>
                <textarea class="form-control" name="decreport" rows="15"></textarea>
            </div>
        </form>
    </div>

    <div class="col-md-5 pb-4">
        <div class="card">
            <h3 class="card-header"><i class="fas fa-question-circle"></i> &nbsp;Help</h3>

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
                        <li><strong>should not</strong> be used to make critical decisions, as the tool could provide false information or conflight with the actual weather.</li>
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
