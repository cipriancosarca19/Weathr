# Weathr
A fancy-schmancy weather forecast application.

Create React App's pre-generated [`README.md`](docs/create-react-app.md)

## Notes
* Geocode location query using Google Maps
* Get forecast from geocoded location using Dark Sky
* Display forecast information

* Create query input
  * Bind basic input field
  * Geocode location on submit
    * Display error information on failure (opt.)
      * Too many API calls
      * Location doesn't exist
      * Service down
  * Pass geocoded long/lat information to forecast look-up (???, need to figure out architecture first)


## Technology Used
* Create React App
* DarkSky Forecast API
* Google Maps Geolocation API
* Google Places Autocomplete API
