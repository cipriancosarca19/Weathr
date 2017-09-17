# Weathr :cloud:
Just another fancy-schmancy weather-forecast-as-a-portfolio-piece application.

Live @ https://mannie-faux.github.io/weathr/

Check out [packages/front-end](packages/front-end) and [packages/back-end](packages/back-end) for the respective source codes.

---

## Technology Used

### General
Technology | Usage
--- | ---
[Lerna][lerna] | Multi-package management
[Google Maps API][google-maps-api] | Location geocoding
[Google Places API][google-places-api] | Location input autocompletion
[Dark Sky API][dark-sky-api] | Weather forecast data

[lerna]: https://lernajs.io/
[google-maps-api]: https://developers.google.com/maps/
[google-places-api]: https://developers.google.com/places/
[dark-sky-api]: https://darksky.net/dev

### Front-End
Technology | Usage
--- | ---
[Create React App][create-react-app] | Boilerplate (testing, livereload, etc.)
[Rebass][rebass] | UI component library
[Palx][palx] | Color palette generation
[Styled Components][styled-components] | React component styling architecture

[create-react-app]: https://github.com/facebookincubator/create-react-app
[rebass]: http://jxnblk.com/rebass/
[palx]: https://palx.jxnblk.com
[styled-components]: https://www.styled-components.com/

### Back-End
Technology | Usage
--- | ---
[Hapi.js][hapi-js] | Server framework
[Axios][axios] | Promse-based HTTP-client library
[Heroku][heroku] | Cloud application hosting service

[hapi-js]: https://hapijs.com/
[axios]: https://github.com/mzabriskie/axios
[heroku]: https://www.heroku.com/home

Checkout `packages/{front-end,back-end}/package.json` for the rest.
