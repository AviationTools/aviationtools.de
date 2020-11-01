<?php
    require_once "../layout/database_sidstar.php";

    function degrees($radiant) {
        $summe = $radiant * (180 / pi());

        if ($summe < 0) {
            return (360 + $summe);
        } else {
            return $summe;
        }
    }

    function azimuth($lat1, $lon1, $lat2, $lon2) {
        $dlon = deg2rad($lon2) - deg2rad($lon1);
        $azimuth = atan2((sin($dlon) * cos(deg2rad($lat2))), (cos(deg2rad($lat1)) * sin(deg2rad($lat2)) - sin(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos($dlon)));

        return (abs(degrees($azimuth)));
    }

    function headings($track) {
        //print $track;
        if (($track > 337.5 && $track <= 360) || ($track >= 0 && $track < 22.5)) {
            return "North Departure";
        } else if ($track > 22.5 && $track < 67.5) {
            return "North East Departure";
        } else if ($track > 67.5 && $track < 112.5) {
            return "East Departure";
        } else if ($track > 112.5 && $track < 157.5) {
            return "South East Departure";
        } else if ($track > 157.5 && $track < 202.5) {
            return "South Departure";
        } else if ($track > 202.5 && $track < 247.5) {
            return "South West Departure";
        } else if ($track > 247.5 && $track < 292.5) {
            return "West Departure";
        } else if ($track > 292.5 && $track < 337.5) {
            return "North West Departure";
        } else {
            return "Not Valid Track!";
        }
    }

    function semiCircularRule($track) {
        if ($track >= 0 && $track <= 179) {
            return "odd";
        } else if ($track >= 180 && $track <= 360) {
            return "even";
        }
    }

    if (empty(getSidData($_GET["icao"], $_GET["runway"]))) {
        http_response_code(400);
    } else {
        header("Content-type: application/json");
        http_response_code(201);

        // $temp = getSidData("eddk", "14L");
        $temp = getSidData($_GET["icao"], $_GET["runway"]);

        echo json_encode($temp);
    }
