# Weathr :cloud:
A React-based front-end for Weathr.

Live @ https://mannie-faux.github.io/weathr/

Check out [docs/create-react-app.md](docs/create-react-app.md) for Create React App's pre-generated `README.md` which contains helpful information regarding the boilerplate system and methods of extension and modification.

---

## Notes

### Application Behavioral & Usage Specification
#### ...on initial load:
1. Set application state (some of the state in the comment below is presentational, and may not be held in main application state but rather placed in their respective components)
```js
/**
 * The application state should effectively hold:
 * + Loading state information (isLoading/isWorking, message, progress)
 * + View background state (forecast-dependent, and neutral particle field if no forecast is loaded)
 * + Forecast query information (method [location API, input], isEditing [for suggestions, UI changes, etc.])
 * + Forecast data (back-end API's response, data display UI state [units, currently displayed view, etc.])
 */

this.state = {
    query: {
        search: {
            value,
            suggestions
        },
        value,
    },
    forecast: {
        isLoading,
        data
    },
    units
};
```
2. Display initial (no forecast data or location entered yet) view/CTA:
    - Praticle field backgroud
    - Large application title text
    - Display geoinput query methods:
        + Search/suggestion input field
        + Current location API

#### ...on search input change and submit:
1. Fetch location suggestions using Google Places API's Autocomplete system
2. Display query suggestion UI
3. Handle suggestion selection:
    - Arrow keys to select and `Enter` keydown to submit
    - `mousedown` on selection to submit
    - `Enter` keydown without arrow key interaction auto-selects/submits first entry in suggestions

#### ...on forecast query:
1. Set loading state
2. Make back-end API call
3. Clear loading state
4. Handle API response
    - On error:
        1. Display error information
    - On success:
        1. Pick appropriate view background
        2. Account for unit state (convert units)
        3. Display forecast UI

#### ...on unit change:
1. Transform (calculate) forecast data into selected units
2. Point UI to new/next data

---

Special thanks and a :thumbsup: to:

:point_right: [Brent Jackson](http://jxnblk.com/) for creating [`palx`](https://palx.jxnblk.com), [`rebass`](http://jxnblk.com/rebass/), and much more

:point_right: [Max Stoiber](https://mxstbr.blog/), [Glenn Maddern](https://github.com/geelen), and team for developing [`styled-components`](https://www.styled-components.com/)

:point_right: [Climacons](http://adamwhitcroft.com/climacons/) for tasty climate-related pictographs
