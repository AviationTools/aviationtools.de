# Aviation Tools Website
> https://aviationtools.de

## Development Server
Uses the [builtin PHP webserver](https://www.php.net/manual/en/features.commandline.webserver.php) with a [custom router](./devserver/dev_router.php) that proxies the API endpoints to the live version.
Start the dev server with the [/devserver/start-dev-server.sh](devserver/start-devserver.sh) Script.

## TODO's
- Fuel Planner & Berechnungen
- Find alternative metar example 3
    - No available metar data for EGXX
- Do not use str.replace for iterating through get parameters
    - metar.js
