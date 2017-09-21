import React from 'react';
import { injectGlobal } from 'styled-components';
import * as Rebass from 'rebass';
import 'normalize.css';
import 'react-select/dist/react-select.css';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'theme';

import StyledContainer from 'components/layout/StyledContainer';
import Header from 'components/layout/Header';
import * as Logo from 'components/layout/Logo';
import GeoInput from 'components/GeoInput';

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

  render() {
    return (
      <Rebass.Provider theme={theme}>
        <StyledContainer>
          <Header w={this.state.query ? '100%' : '42rem'}>
            <Logo.Sun />
            <Logo.Text>Weathr</Logo.Text>
            <GeoInput onSelect={selection => selection ? updateStateByPath(this, 'query', selection.value) : null} />
          </Header>
        </StyledContainer>
      </Rebass.Provider>
    );
  }
}

export default Weathr;
