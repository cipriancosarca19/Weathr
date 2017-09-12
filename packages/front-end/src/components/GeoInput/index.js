import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import updateStateByPath from 'utils/updateStateByPath';

import InfoText from './InfoText';

const getPlacesURL = input =>
  `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDjh11j9IJHALxDJd4z--VMuTLpAEbANyA&input=${input}`;

/**
 * Fetch geolocation input suggestions from
 * Google Map's Places API, and return them
 * for usage in selection suggestions.
 * 
 * @param   {string}  input
 * @return  {object}
 */
const getSuggestions = input =>
  fetch(getPlacesURL(input))
    .then(response => response.json())
    .then(data => ({
      options: data.predictions.map(prediction => ({
        value: prediction.description,
        label: prediction.description,
      })),
    }));

class GeoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
    };
  }

  onChange = value => {
    updateStateByPath(this, 'value', value);
    if (this.props.onSelect) this.props.onSelect(value);
  }

  render() {
    return (
      <div>
        <InfoText>Where would you like to assert your power as a climate god?</InfoText>
        <Select.Async
          value={this.state.value}
          onChange={this.onChange}
          loadOptions={getSuggestions}
          autoload={false}
          placeholder=''
          searchPromptText='Search for a place...'
        />
      </div>
    );
  }
}

GeoInput.propTypes = {
  onSelect: PropTypes.func,
};

export default GeoInput;
