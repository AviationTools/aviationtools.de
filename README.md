# Aviation Tools Website
> https://aviationtools.de

## Development Server
Uses the [builtin PHP webserver](https://www.php.net/manual/en/features.commandline.webserver.php) with a [custom router](./devserver/dev_router.php) that proxies the API endpoints to the live version.
Start the dev server with the [/devserver/start-dev-server.sh](devserver/start-devserver.sh) Script.

## TODO's
- Fuel Planner & Berechnungen
- Find alternative metar example 3
    - No available metar data for EGXX
- Fix handling and style of Help-box on ATC-Com
- Reset Highlight for vector sid entrys
    - e.g. KLAX PRCH3.07L
    - fixes itself on double-click
- Pilot Test Counter is in the back and gets covered by boxes
    - Red box in front
    - White text on white box
        - invert?
