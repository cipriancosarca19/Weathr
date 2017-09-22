import React from 'react';
import { injectGlobal } from 'styled-components';
import * as Rebass from 'rebass';
import 'normalize.css';
import 'react-select/dist/react-select.css';

import updateStateByPath from 'utils/updateStateByPath';
import convertForecastUnits from 'utils/convertForecastUnits';
import theme from 'theme';

import * as Layout from 'components/Layout';
import GeoInput from 'components/GeoInput';
import DayForecast from 'components/DayForecast';

import dummyForecast from './dummyForecast'; // FIXME: Dummy data -- remove after local testing

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
      query: 'Cincinnati, OH, US', // FIXME: Remove dummy data after local testing
      forecast: {
        isLoading: false,
        data: {
          location: dummyForecast.location, // FIXME: Remove dummy data after local testing
          us: dummyForecast.weather, // FIXME: Remove dummy data after local testing
          si: convertForecastUnits(dummyForecast.weather), // FIXME: Remove dummy data after local testing
        },
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
      .then(data => updateStateByPath(this, 'forecast', {
        isLoading: false,
        data: {
          location: data.location,
          us: data.weather,
          si: convertForecastUnits(data.weather),
        },
      }));
  }

  renderUnitSwitch = () => {
    return (
      <Layout.UnitSwitch
        checked={this.state.units === 'us' ? false : true}
        onClick={e => updateStateByPath(this, 'units', this.state.units === 'us' ? 'si': 'us')}
      />
    );
  }

  renderForecast = () => {
    return (
      <div>
        <Layout.WeeklyForecastWrapper>
          {this.state.forecast.data[this.state.units].daily.data.map(day => (
            <DayForecast key={day.time} forecast={day} units={this.state.units} />
          ))}
        </Layout.WeeklyForecastWrapper>
      </div>
    );
  }

  render() {
    return (
      <Rebass.Provider theme={theme}>
        <Layout.StyledContainer>
          {this.state.forecast.data.location ? this.renderUnitSwitch() : null}
          <Layout.Header w={this.state.query ? '100%' : '42rem'}>
            <Layout.Logo.Sun />
            <Layout.Logo.Text>Weathr</Layout.Logo.Text>
            <GeoInput onSelect={selection => selection ? updateStateByPath(this, 'query', selection.value) : null} />
          </Layout.Header>
          {this.state.forecast.data.location ? this.renderForecast() : null}
        </Layout.StyledContainer>
      </Rebass.Provider>
    );
  }
}

export default Weathr;
