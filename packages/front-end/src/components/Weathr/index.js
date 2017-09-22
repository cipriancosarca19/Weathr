import React from 'react';
import { injectGlobal } from 'styled-components';
import * as Rebass from 'rebass';
import 'normalize.css';
import 'react-select/dist/react-select.css';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'theme';

import * as Layout from 'components/Layout';
import GeoInput from 'components/GeoInput';
import WeeklyForecast from 'components/WeeklyForecast';

import dummyForecast from './dummyForecast';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Inconsolata|Open+Sans:400,700');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    width: 100vw;
    min-height: 100vh;
    
    background: linear-gradient(-30deg, ${theme.colors.base}, ${theme.colors.secondary});
    background-attachment: fixed;

    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: 'Cincinnati, OH',
      forecast: {
        isLoading: false,
        data: dummyForecast,
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
        <WeeklyForecast
          location={this.state.forecast.data.location}
          forecast={this.state.forecast.data.weather.daily}
        />
      </div>
    );
  }

  render() {
    return (
      <Rebass.Provider theme={theme}>
        <Layout.StyledContainer>
          <Layout.Header w={this.state.query ? '100%' : '42rem'}>
            <Layout.Logo.Sun />
            <Layout.Logo.Text>Weathr</Layout.Logo.Text>
            <GeoInput onSelect={selection => selection ? updateStateByPath(this, 'query', selection.value) : null} />
          </Layout.Header>
          {this.state.forecast.isLoading === false && this.state.forecast.data ? this.renderForecast() : null}
        </Layout.StyledContainer>
      </Rebass.Provider>
    );
  }
}

export default Weathr;
