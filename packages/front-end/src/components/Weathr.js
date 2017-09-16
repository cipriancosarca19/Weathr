import React from 'react';
import {
  Provider,
  Heading,
  Divider,
} from 'rebass';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'utils/theme';

import AppContainer from './layout/AppContainer';
import HeroText from './layout/HeroText';
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
    return <h1>Forecast, baby. (WIP, sorry)</h1>;
  }

  render() {
    return (
      <Provider theme={theme}>
        <AppContainer
          pt='1.2rem'
          pb='2rem'
          bg='white'
        >
          <Heading
            is='h1'
            color='base'
            center
          >
            Weathr
          </Heading>
          <Divider color='secondary' />
          <HeroText
            py='0.8rem'
            f='2.2rem'
            center
          >
            Where would you like to assume your power as a climate god?
          </HeroText>
          <GeoInput onSelect={newSelection => updateStateByPath(this, 'query', newSelection ? newSelection.value : '')} />
          {this.state.forecast.data ? this.renderForecast() : null}
        </AppContainer>
      </Provider>
    );
  }
}

export default Weathr;
