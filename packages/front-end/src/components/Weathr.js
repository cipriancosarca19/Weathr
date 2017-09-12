import React from 'react';
import updateStateByPath from 'utils/updateStateByPath';

import GeoInput from './GeoInput';

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      forecast: {},
    };
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
