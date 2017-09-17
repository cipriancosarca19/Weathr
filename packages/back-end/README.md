# Weather :cloud:
A Node.js-based back-end for Weathr written with Hapi.js.

Live @ https://mannie-faux-weathr.herokuapp.com/

---

## Routes

### `GET` : `/forecast/{locationQuery}/{units?}`
#### Parameters
* `locationQuery`: address string to geocode and fetch forecast for
* `units` (optional): can be either `us` for imperial or `si` for standard (defaults to `us` when empty)

#### Response
```json
{
    "location": {
        "address": "",
        "lat": 0,
        "lng": 0
    },
    "weather": {
        "currently": {},
        "minutely": {},
        "hourly": {},
        "daily": {}
    }
}
```

`response.weather.currently` is a DarkSky API's [DataPoint](https://darksky.net/dev/docs#data-point) and the other three (`minutely`, `hourly`, and `daily`) are [DataBlocks](https://darksky.net/dev/docs#data-block).

---

Made possible thanks to:
* Google's [Maps API](https://developers.google.com/maps/documentation/geocoding/intro) as the geocoding service
* The [Dark Sky API](https://darksky.net/dev/) as the weather forecasat data provider
