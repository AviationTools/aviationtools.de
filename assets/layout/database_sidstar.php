<?php
    $linkSidStar = mysqli_connect("10.35.47.13", "k69706_atccom", "a1h9k9@6", "k69706_atccom");

    if ($linkSidStar == null) {
        echo "Fehler: konnte nicht mit MySQL verbinden." . PHP_EOL;
        echo "Debug-Fehlernummer: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debug-Fehlermeldung: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }

    if ($mysqli->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }
    function queryDataBaseSidStar($query) {
        global $linkSidStar;
        $result = mysqli_query($linkSidStar, $query);

        if ($result) {
            $user_arr = [];

            // Cycle through results
            while ($row = $result->fetch_assoc()) {
                $user_arr[] = $row;
            }
            // Free result set
            $result->close();
            return $user_arr;
        } else {
            print("sql error");
            exit;
        }
    }

    // getSidData("eddk", "14L");
    function getSidData($icao, $runway) {
        global $linkSidStar;
        $sid = [];
        $sidData = queryDataBaseSidStar("SELECT icao, latitude, longitude, sidname, runways, sw.index, wypname FROM `sid_waypoint` sw JOIN `sid` s ON s.id = sw.sid WHERE `icao` = \"" . $icao . "\" AND `runways` = \"" . $runway . "\" ORDER BY `sidname`, `index`;");
        $coordinates = queryDataBaseSidStar("SELECT icao, lon, lat FROM `aerodome_coordinates` WHERE `icao` = \"" . $icao . "\" ");

        // print_r($coordinates[0]["lat"]);
        // Loops through the Query, filters out the correct Procedures.
        for ($i = 0; count($sidData) > $i; $i++) {
            // print_r($sid[$sidData[$i]["sidname"]]);

            if (empty($sid[$sidData[$i]["sidname"]])) {
                $sid[$sidData[$i]["sidname"]] = ['icao' => $sidData[$i]["icao"], 'aerodome' => ['lat' => $coordinates[0]["lon"], 'lon' => $coordinates[0]["lat"]], 'runways' => $sidData[$i]["runways"], 'waypoints' => [['wypname' => $sidData[$i]["wypname"], 'lat' => $sidData[$i]["latitude"], 'lon' => $sidData[$i]["longitude"]]]];
            } else {
                $sid[$sidData[$i]["sidname"]]["waypoints"][] = ['wypname' => $sidData[$i]["wypname"], 'lat' => $sidData[$i]["latitude"], 'lon' => $sidData[$i]["longitude"]];
            }

        }

        //Loops through the correct Procedures.
        foreach ($sid as $name => $info) {
            $counter2 = count($info["waypoints"]) - 1;
            $counterDefault = count($info["waypoints"]) - 2;
            $c = 2;

            if ($info["waypoints"][$counterDefault]["lat"] == "0") {
                $c++;
                $counter1 = count($info["waypoints"]) - $c;
            } else {
                $counter1 = count($info["waypoints"]) - 2;
            }

            $temp = round(azimuth($info["waypoints"][$counter1]["lat"], $info["waypoints"][$counter1]["lon"], $info["waypoints"][$counter2]["lat"], $info["waypoints"][$counter2]["lon"]));
            $sid[$name]["track"] = headings($temp);
            $sid[$name]["trackHdg"] = $temp;
            $sid[$name]["flevel"] = semiCircularRule($temp);

        }
        return $sid;

    }

    // print_r(getStarData("eham", ""));
    // getStarData("eddk", "14l");
    function getStarData($icao, $runway) {
        global $linkSidStar;
        $star = [];
        $testQuery = queryDataBaseSidStar("SELECT runways FROM `star_waypoint` sw JOIN `star` s ON s.id = sw.star WHERE `icao` = \"" . $icao . "\" LIMIT 1;");

        if ($testQuery[0]["runways"] == "All") {
            $starData = queryDataBaseSidStar("SELECT icao, latitude, longitude, starname, runways, sw.index, wypname, altitude FROM `star_waypoint` sw JOIN `star` s ON s.id = sw.star WHERE `icao` = \"" . $icao . "\" ORDER BY `starname`, `index`;");
        } else {
            $starData = queryDataBaseSidStar("SELECT icao, latitude, longitude, starname, runways, sw.index, wypname, altitude FROM `star_waypoint` sw JOIN `star` s ON s.id = sw.star WHERE `icao` = \"" . $icao . "\" AND `runways` = \"" . $runway . "\" ORDER BY `starname`, `index`;");
        }

        $coordinates = queryDataBaseSidStar("SELECT icao, lon, lat FROM `aerodome_coordinates` WHERE `icao` = \"" . $icao . "\" ");

        // Loops through the Query, filters out the correct Procedures.
        for ($i = 0; count($starData) > $i; $i++) {
            if (empty($star[$starData[$i]["starname"]])) {
                $star[$starData[$i]["starname"]] = ['icao' => $starData[$i]["icao"], 'aerodome' => ['lat' => $coordinates[0]["lon"], 'lon' => $coordinates[0]["lat"]], 'runways' => $starData[$i]["runways"], 'waypoints' => [['wypname' => $starData[$i]["wypname"], 'lat' => $starData[$i]["latitude"], 'lon' => $starData[$i]["longitude"], 'altitude' => $starData[$i]["altitude"]]]];
            } else {
                $star[$starData[$i]["starname"]]["waypoints"][] = ['wypname' => $starData[$i]["wypname"], 'lat' => $starData[$i]["latitude"], 'lon' => $starData[$i]["longitude"], 'altitude' => $starData[$i]["altitude"]];
            }

        }

        //Loops through the correct Procedures.
        foreach ($star as $name => $info) {
            $counter2 = count($info["waypoints"]) - 1;
            $counterDefault = count($info["waypoints"]) - 2;
            $c = 2;

            $temp = round(azimuth($info["waypoints"][0]["lat"], $info["waypoints"][0]["lon"], $info["waypoints"][1]["lat"], $info["waypoints"][1]["lon"]));
            $star[$name]["track"] = headings($temp);
            $star[$name]["trackHdg"] = $temp;
        }


        return $star;

    }

    // print_r(approach("eddk", "24"));
    // approach("eddk", "14L");
    function approach($icao, $runway) {
        $appr = [];
        $starApp = queryDataBaseSidStar("SELECT a.icao, latitude, longitude, a.name, `index`, type FROM `app_waypoint` aw  JOIN `approach` a ON a.id = aw.approach WHERE `icao` = \"" . $icao . "\" ");

        for ($i = 0; $i < count($starApp); $i++) {
            if (is_numeric(substr($starApp[$i]["name"], -1))) {
                if (substr($starApp[$i]["name"], -2) == $runway) {

                    if ($starApp[$i]["index"] == 0) {
                        $appr[$starApp[$i]["name"]] = ['icao' => $starApp[$i]["icao"], 'waypoints' => [['lat' => $starApp[$i]["latitude"], 'lon' => $starApp[$i]["longitude"], 'type' => $starApp[$i]["type"]]]];
                    } else {
                        $appr[$starApp[$i]["name"]]["waypoints"][] = ['lat' => $starApp[$i]["latitude"], 'lon' => $starApp[$i]["longitude"], 'type' => $starApp[$i]["type"]];
                    }


                }
            } else {
                if (substr($starApp[$i]["name"], -3) == $runway) {

                    if ($starApp[$i]["index"] == 0) {
                        $appr[$starApp[$i]["name"]] = ['icao' => $starApp[$i]["icao"], 'waypoints' => [['lat' => $starApp[$i]["latitude"], 'lon' => $starApp[$i]["longitude"], 'type' => $starApp[$i]["type"]]]];
                    } else {
                        $appr[$starApp[$i]["name"]]["waypoints"][] = ['lat' => $starApp[$i]["latitude"], 'lon' => $starApp[$i]["longitude"], 'type' => $starApp[$i]["type"]];
                    }


                }
            }
        }
        return $appr;
    }
