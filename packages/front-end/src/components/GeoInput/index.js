import React from 'react';
import PropTypes from 'prop-types';

import updateStateByPath from 'utils/updateStateByPath';

import StyledAsyncSelect from './StyledAsyncSelect';

const getSuggestions = input =>
  fetch(`https://mannie-faux-weathr.herokuapp.com/autocomplete/${input}`)
    .then(response => response.ok ? response.json() : response.text())
    .then(data => {
      if (typeof data === 'string') return;
      if (!Array.isArray(data.predictions) || !data.predictions.length) return;

      return ({
        options: data.predictions.map(prediction => ({
          value: prediction.description,
          label: prediction.description,
        })),
      });
    });

class GeoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      prevValue: null,
    };
  }

  onBlur = event => {
    if (!this.state.value) updateStateByPath(this, 'value', this.state.prevValue);
  }

  onChange = value => {
    this.setState((prevState, props) => ({
      value: value,
      prevValue: value,
    }));

    if (this.props.onSelect) this.props.onSelect(value);
  }

  render() {
    return (
      <div>
        <StyledAsyncSelect
          value={this.state.value}
          loadOptions={getSuggestions}
          onChange={this.onChange}
          onBlur={this.onBlur}

          autoload={false}

          placeholder='Search for a location'
          loadingPlaceholder='Getting suggestions...'
          noResultsText='Location not found'
        />
      </div>
    );
  }
}

GeoInput.propTypes = {
  onSelect: PropTypes.func,
};

export default GeoInput;
