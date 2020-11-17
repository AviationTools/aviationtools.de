        </div>

        <?php // show "we moved" modal only on atccom.de
        if (strcasecmp(explode(":", $_SERVER["HTTP_HOST"])[0], "atccom.de") == 0) {?>
            <div class="modal fade show" data-backdrop="static" data-keyboard="false" id="move-popup" tabindex="-1" role="dialog" aria-labelledby="move-popup-title" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="move-popup-title">We moved to  <a href="https://aviationtools.de/">aviationtools.de</a>!</h3>
                        </div>
                        <div class="modal-body">
                            <p>
                                All tools that were provided on <a href="https://atccom.de/">atccom.de</a> are now available there.
                            </p>
                            <p>
                                Please change any existing bookmarks and other references over to <a href="https://aviationtools.de/">aviationtools.de</a> before the domain expires.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <a class="btn btn-primary" href="https://aviationtools.de/">Go to aviationtools.de</a>
                        </div>
                    </div>
                </div>
            </div>
            <script>$('#move-popup').modal('show');</script>
        <?php } ?>

        <!-- footer -->
        <div class="fixed-bottom bg-primary p-3">
            <span class="text-white">
                &copy; Aviation Tools <?php
                    echo date("Y"); ?> &middot; <a class="footer-link" href="/privacy/">Privacy Policy</a>
            </span>
        </div>
    </body>
</html>
