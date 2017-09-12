import React from 'react';
import updateStateByPath from 'utils/updateStateByPath';

import AppContainer from './layout/AppContainer';
import Content from './layout/Content';
import Title from './layout/Title';
import GeoInput from './GeoInput';

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      data: {},
      isGeoInputDirty: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const currQuery = this.state.query;
    const nextQuery = nextState.query;

    if (nextQuery) {
      if (!this.state.isGeoInputDirty) updateStateByPath(this, 'isGeoInputDirty', true);
      if (nextQuery !== currQuery) this.getForecast(nextQuery);
    }
  }

  getForecast = query => {
    fetch(`https://mannie-faux-weathr.herokuapp.com/forecast/${query}`)
      .then(response => response.json())
      .then(data => updateStateByPath(this, 'data', data));
  }

  render() {
    return (
      <AppContainer>
        <Content>
          <Title>Weathr</Title>
          <GeoInput
            onSelect={newSelection => updateStateByPath(this, 'query', newSelection ? newSelection.value : '')}
            dirty={this.state.isGeoInputDirty}
          />
        </Content>
      </AppContainer>
    );
  }
}

export default Weathr;
