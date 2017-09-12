import React from 'react';
import updateStateByPath from 'utils/updateStateByPath';

import GeoInput from './GeoInput';

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      data: {},
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const currQuery = this.state.query;
    const nextQuery = nextState.query;

    if (nextQuery && nextQuery !== currQuery) this.getForecast(nextQuery);
  }

  getForecast = query => {
    fetch(`https://mannie-faux-weathr.herokuapp.com/forecast/${query}`)
      .then(response => response.json())
      .then(data => updateStateByPath(this, 'data', data));
  }

  render() {
    return (
      <div>
        <GeoInput
          onSelect={newSelection => updateStateByPath(this, 'query', newSelection ? newSelection.value : '')}
        />
      </div>
    );
  }
}

export default Weathr;
