<?php
    session_start(); ?>

<!DOCTYPE html>
<html lang="en" style="height: 100%;">
    <head>
        <!-- google analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115527911-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'UA-115527911-1');
        </script>

        <!-- meta -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- javascript -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <!-- Toggle Bootstrap -->
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
        <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

        <!-- css -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="/assets/css/custom.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

        <link rel="icon" href="/favicon.ico">

        <title><?php
                if (isset($title)) {
                    echo $title;
                } ?></title>
    </head>
    <body style="height: 100%;">
        <!-- navbar -->
        <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
            <a class="navbar-brand" href="/">
                <img src="/assets/img/radar.png" width="30px" height="30px" class="d-inline-block align-top">
                Aviation Tools
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item <?php
                        if ($page == 'home') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/">
                            <i class="fas fa-home"></i>&nbsp;Home
                        </a>
                    </li>
                    <li class="nav-item <?php
                        if ($page == 'sidstar') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/sidstar/">
                            <i class="fas fa-route"></i>&nbsp;SidStar
                        </a>
                    </li>
                    <li class="nav-item <?php
                        if ($page == 'atc') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/atc/">
                            <i class="fas fa-broadcast-tower"></i>&nbsp;ATC Comms
                        </a>
                    </li>
                    <li class="nav-item <?php
                        if ($page == 'runways') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/runways/">
                            <i class="fas fa-plane-departure"></i>&nbsp;Runways
                        </a>
                    </li>
                    <li class="nav-item <?php
                        if ($page == 'game') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/game/">
                            <i class="fas fa-gamepad"></i>&nbsp;Pilot Test
                            <small class="badge badge-warning">New</small>
                        </a>
                    </li>
                    <li class="nav-item dropdown <?php
                        if ($page == 'notams' || $page == 'metar') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-list-alt"></i>&nbsp;Decoder
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/metar/">
                                <i class="fas fa-cloud"></i>&nbsp;METAR Decoder
                            </a>
                            <a class="dropdown-item" href="/notams/">
                                <i class="fas fa-newspaper"></i>&nbsp;Notam Decoder
                                <small class="badge badge-warning">New</small>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item <?php
                        if ($page == 'about') {
                            echo 'active';
                        } ?>">
                        <a class="nav-link" href="/about/">
                            <i class="fas fa-comment"></i>&nbsp;About Us
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid py-2">
