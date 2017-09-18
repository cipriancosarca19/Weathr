import React from 'react';
import {
  Provider,
  Container,
  Text,
} from 'rebass';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'theme';
import './Weathr.css';

import WeathrSun from 'assets/images/logo/weathr_sun.png';
import WeathrText from 'assets/images/logo/weathr_text.png';

class Weathr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {
        search: {
          value: null,
          suggestions: null,
        },
        value: null,
      },
      forecast: {
        isLoading: false,
        data: null,
      },
      units: 'us',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const currQuery = this.state.query.value;
    const nextQuery = nextState.query.value;
    if (nextQuery && nextQuery !== currQuery) this.getForecast(nextQuery);
  }

  getForecast = query => {
    updateStateByPath(this, 'forecast', { isLoading: true, data: null });
    fetch(`https://mannie-faux-weathr.herokuapp.com/forecast/${query}`)
      .then(response => response.json())
      .then(data => updateStateByPath(this, 'forecast', { isLoading: false, data }));
  }

  render() {
    return (
      <Provider theme={theme}>
        <Container>
          <Text center>
            <img src={WeathrSun} alt="Weathr Sun" />
            <br />
            <img src={WeathrText} alt="Weathr Text" />
          </Text>
        </Container>
      </Provider>
    );
  }
}

export default Weathr;
