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
      query: null,
      forecast: {
        isLoading: false,
        data: null,
      },
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const currQuery = this.state.query;
    const nextQuery = nextState.query;
    if (nextQuery && nextQuery !== currQuery) this.getForecast(nextQuery);
  }

  getForecast = query => {
    updateStateByPath(this, 'forecast', { isLoading: true, data: null });
    fetch(`https://mannie-faux-weathr.herokuapp.com/forecast/${query}`)
      .then(response => response.json())
      .then(data => updateStateByPath(this, 'forecast', { isLoading: false, data }));
  }

  renderForecast = () => {
    return <h1>Forecast, baby.</h1>;
  }

  render() {
    return (
      <AppContainer>
        <Content>
          <Title>Weathr</Title>
          <GeoInput
            onSelect={newSelection => updateStateByPath(this, 'query', newSelection ? newSelection.value : '')}
          />
          {this.state.forecast.data ? this.renderForecast() : null}
        </Content>
      </AppContainer>
    );
  }
}

export default Weathr;
