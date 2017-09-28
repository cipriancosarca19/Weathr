import React from 'react';
import { injectGlobal } from 'styled-components';
import {
  Provider,
  Divider,
  Text,
} from 'rebass';
import 'normalize.css';
import 'react-select/dist/react-select.css';

import updateStateByPath from 'utils/updateStateByPath';
import convertForecastUnits from 'utils/convertForecastUnits';
import theme from 'theme';

import * as Layout from 'components/Layout';
import GeoInput from 'components/GeoInput';
import DayForecast from 'components/DayForecast';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Inconsolata|Open+Sans:400,700');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
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
      query: null,
      forecast: {
        isLoading: false,
        data: {
          location: null,
          us: null,
          si: null,
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
        color='black'
      />
    );
  }

  renderForecast = () => {
    return (
      <div>
        <Layout.ContentContainer>
          {this.state.forecast.data[this.state.units].daily.data.map(day => (
            <DayForecast key={day.time} forecast={day} units={this.state.units} />
          ))}
        </Layout.ContentContainer>
        <Layout.AppFooter>
          <Divider color='secondary' />
          <Text color='black' mb='0.2rem' is='a' target='_blank' href='https://darksky.net/poweredby/'>Powered by Dark Sky</Text>
          <br />
          <Text color='black' is='a' target='_blank' href='https://github.com/mannie-faux/weathr/'>GitHub</Text>
        </Layout.AppFooter>
      </div>
    );
  }

  render() {
    return (
      <Provider theme={theme}>
        <Layout.App>
          <Layout.AppContainer>
            {this.state.forecast.data.location ? this.renderUnitSwitch() : null}
            <Layout.AppHeader w={this.state.query ? '100%' : '42rem'}>
              <Layout.Logo.Sun />
              <Layout.Logo.Text>Weathr</Layout.Logo.Text>
              <GeoInput onSelect={selection => selection ? updateStateByPath(this, 'query', selection.value) : null} />
            </Layout.AppHeader>
            {this.state.forecast.data[this.state.units] ? this.renderForecast() : null}
          </Layout.AppContainer>
        </Layout.App>
      </Provider>
    );
  }
}

export default Weathr;
