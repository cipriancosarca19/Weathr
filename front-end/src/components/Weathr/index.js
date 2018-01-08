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
      queryObj: null,
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

  componentWillMount() {
    if ('geolocation' in navigator) this.geolocate();
  }

  componentWillUpdate(nextProps, nextState) {
    const currQueryObj = this.state.queryObj;
    const nextQueryObj = nextState.queryObj;

    if (!nextQueryObj) return;
    if (currQueryObj && nextQueryObj.value === currQueryObj.value) return;
    this.getForecast(nextQueryObj.value);
  }

  geolocate = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const posStr = `${position.coords.latitude}, ${position.coords.longitude}`;
      updateStateByPath(this, 'queryObj', { value: posStr, label: posStr });
    }, err => console.error(err));
  }

  getForecast = (query=this.state.queryObj.value) => {
    updateStateByPath(this, 'forecast.isLoading', true);
    fetch(`https://intrnt-dolphin-weathr.herokuapp.com/forecast/${query}`)
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
        <Layout.ContentContainer w={['20rem', '40rem', 1]}>
          {this.state.forecast.data[this.state.units].daily.data.map(day => (
            <DayForecast key={day.time} forecast={day} units={this.state.units} />
          ))}
        </Layout.ContentContainer>
        <Layout.AppFooter>
          <Divider color='secondary' />
          <Text color='darkBase' mb='0.2rem' is='a' target='_blank' href='https://darksky.net/poweredby/'>Powered by Dark Sky</Text>
          <br />
          <Text color='darkBase' f='1.2rem' is='a' target='_blank' href='https://github.com/mannie-faux/weathr/'>mannie-faux/weathr @ GitHub</Text>
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
            <Layout.AppHeader w={this.state.queryObj ? '100%' : '42rem'}>
              <Layout.Logo />
              <GeoInput
                value={this.state.queryObj}
                onChange={newSelection => newSelection ? updateStateByPath(this, 'queryObj', newSelection) : null}
              />
            </Layout.AppHeader>
            {this.state.forecast.data[this.state.units] ? this.renderForecast() : null}
          </Layout.AppContainer>
        </Layout.App>
      </Provider>
    );
  }
}

export default Weathr;
