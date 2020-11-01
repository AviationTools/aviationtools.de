<?php
    $url = "http://pilotweb.nas.faa.gov/PilotWeb/notamRetrievalByICAOAction.do?reportType=RAW&method=displayByICAOs&actionType=notamRetrievalByICAOs&retrieveLocId=EDDK&formatType=ICAO";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 GTB5');
    $html = curl_exec($ch);
    var_dump($html);
