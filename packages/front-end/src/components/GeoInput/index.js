import React from 'react';
import PropTypes from 'prop-types';

import updateStateByPath from 'utils/updateStateByPath';

import StyledAsyncSelect from './StyledAsyncSelect';

const getSuggestions = input => {
  if (!input) return { options: [] };

  return fetch(`https://mannie-faux-weathr.herokuapp.com/autocomplete/${input}`)
    .then(response => response.json())
    .then(data => ({
      options: data.predictions.map(prediction => ({
        value: prediction.description,
        label: prediction.description,
      })),
    }));
}

class GeoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  onChange = value => {
    updateStateByPath(this, 'value', value);
    if (this.props.onSelect) this.props.onSelect(value);
  }

  render() {
    return (
      <div>
        <StyledAsyncSelect
          value={this.state.value}
          onChange={this.onChange}
          loadOptions={getSuggestions}
          autoload={false}
          placeholder='Search for a location'
          loadingPlaceholder='Getting suggestions...'
        />
      </div>
    );
  }
}

GeoInput.propTypes = {
  onSelect: PropTypes.func,
};

export default GeoInput;
