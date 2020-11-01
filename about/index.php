<?php
    $page = 'about';
    $title = 'About Us';
    include '../assets/layout/header.php';

    if (isset($_POST['submit'])) {
        $type = $_POST['type'];
        $sect = $_POST['sect'];
        $subj = $_POST['subject'];
        $msg = $_POST['msg'];
        $name = $_POST['name'];
        $email = $_POST['email'];

        $to = 'werbungbnc@web.de';
        $from = 'atccomteam.de';

        if ($type == 'b') {
            $subject = '[NEW BUG REPORT]: ' . $subj;
        } else {
            if ($type == 's') {
                $subject = '[NEW SUGGESTION]: ' . $subj;
            }
        }

        if ($name != '' && $email != '') {
            $headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
            $msg .= "\n Sender: " . $name . "\n Email: " . $email . "\n Section: " . $sect;
        } else {
            $headers = 'From: ' . $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
        }

        $sent = mail($to, $subject, $msg, $headers);
    }
?>

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
<script defer src="/assets/js/contact.js"></script>

<div class="bg-light">
    <div class="container py-5">
        <div class="row h-100 align-items-center py-5">
            <div class="col-lg-6">
                <h1 class="display-4">About us</h1>
                <p class="lead text-muted mb-0">I started ATC-COM because I thought the aviation sector wasn´t beginner friendly.
                    Anybody who wanted to learn more about flying or controlling did not really have the chance. Many information sources on the internet are not easy to understand or to find. With ATC-COM any aviation enthusiast has an oppurtunity too learn. All the tools I developed should help anyone have an easier way of accessing the vast amount of knowledge which comes with aviation.
                    Along the way I have learned a lot about the aviation community and met people who realy understand the dynamics of being part of the flying industry. This helped me develop this website to the point where we are now.
                    I want to help those in the aviation community with these tools so they can have a better experience and an easier way of undertanding the matter.
                </p>
            </div>
            <div class="col-lg-6 d-none d-lg-block"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt="" class="img-fluid"></div>
        </div>
    </div>
</div>

<div class="bg-white py-5">
    <div class="container py-5">
        <div class="row align-items-center mb-5">
            <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                <h2 class="font-weight-light">Disclaimer</h2>
                <p class="font-italic text-muted mb-4">The information provided by ATC-COM on https://atccom.de/ is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
                    INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p><a href="https://atccom.de/privacy/" class="btn btn-light px-5 rounded-pill shadow-sm">Privacy Policy</a>
            </div>
            <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg" alt="" class="img-fluid mb-4 mb-lg-0"></div>
        </div>

        <div class="row align-items-center">
            <div class="col-lg-5 px-5 mx-auto"><img src="https://pure1housecleaningservices.com/wp-content/uploads/2018/11/pozycjonowanie-stron-chicago.png" alt="" class="img-fluid mb-4 mb-lg-0"></div>
            <div class="col-lg-6">
                <h2 class="font-weight-light">Information</h2>
                <p class="font-italic text-muted mb-4">All of the information provided on this website come from the <b>FAA</b></p><a href="https://www.faa.gov/" class="btn btn-light px-5 rounded-pill shadow-sm">FAA</a>
            </div>
        </div>
    </div>
</div>

<div class="bg-light py-5">
    <div class="container py-5">
        <div class="row mb-4">
            <div class="col-lg-5">
                <h2 class="display-4 font-weight-light">The team</h2>
                <p class="font-italic text-muted"></p>
            </div>
        </div>

        <div class="row text-center">
            <!-- Team item-->
            <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="../assets/img/alex.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                    <h5 class="mb-0">Alexander</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                    <p class="text-center">werbungbnc@web.de</p>
                </div>
            </div>
            <!-- End-->
        </div>
    </div>
</div>

<?php
    include '../assets/layout/footer.php'; ?>
