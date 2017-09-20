import React from 'react';
import * as Rebass from 'rebass';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'theme';
import './Weathr.css';

import AppContainer from 'components/layout/AppContainer';
import GeoInput from 'components/GeoInput';

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      forecast: {
        isLoading: false,
        data: null,
      },
      units: 'us',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const currQuery = this.state.query;
    const nextQuery = nextState.query;
    if (nextQuery && nextQuery !== currQuery) this.getForecast(nextQuery);
  }

  getForecast = query => {
    updateStateByPath(this, 'forecast.isLoading', true);
    fetch(`https://mannie-faux-weathr.herokuapp.com/forecast/${query}`)
      .then(response => response.json())
      .then(data => updateStateByPath(this, 'forecast', { isLoading: false, data }));
  }

  renderForecast = () => {
    return (
      <div>
        <Rebass.Divider color='base' my='2rem' />
        <h2>Hello, forecast!</h2>
      </div>
    );
  }

  render() {
    return (
      <Rebass.Provider theme={theme}>
        <AppContainer dirty={this.state.forecast.data ? true : false} is='section'>
          <Rebass.Text f='1.6rem' mb='0.6rem' center>Where would you like to assert your power as a climate god?</Rebass.Text>
          <GeoInput onSelect={selection => selection ? updateStateByPath(this, 'query', selection.value) : null} />
          {this.state.forecast.data ? this.renderForecast() : null}
        </AppContainer>
      </Rebass.Provider>
    );
  }
}

export default Weathr;
