import React from 'react';
import PropTypes from 'prop-types';

import StyledAsyncSelect from './StyledAsyncSelect';

class GeoInput extends React.Component {
  getSuggestions = input =>
    fetch(`https://intrnt-dolphin-weathr.herokuapp.com/autocomplete/${input}`)
      .then(response => response.ok ? response.json() : response.status)
      .then(data => {
        if (typeof data === 'number') {
          switch (data) {
            case 403:
              return ({
                options: [{
                  value: null,
                  label: 'Query limit reached: Google Maps API\'s query limit has been reached',
                  disabled: true,
                }],
              });
            case 404:
              return ({
                options: [{
                  value: null,
                  label: `Location not found: the query ${input} yielded no results`,
                  disabled: true,
                }],
              });
            default:
              return ({
                options: [{
                  value: null,
                  label: 'Unknown server error: Google Maps API may be down or not functional',
                  disabled: true,
                }],
              });
          }
        }

        if (!Array.isArray(data.predictions) || !data.predictions.length) return;

        return ({
          options: data.predictions.map(prediction => ({
            value: prediction.description,
            label: prediction.description,
          })),
        });
      });

  render() {
    return (
      <div>
        <StyledAsyncSelect
          value={this.props.value}
          onChange={this.props.onChange}
          loadOptions={this.getSuggestions}

          placeholder='Search for a location'
          loadingPlaceholder='Getting suggestions...'
          noResultsText='Location not found'
        />
      </div>
    );
  }
}

GeoInput.propTypes = {
  value: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default GeoInput;
