import React from 'react';
import {
  Provider,
} from 'rebass';

import updateStateByPath from 'utils/updateStateByPath';
import theme from 'theme';
import './Weathr.css';

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
        <h1>Hello, Weathr!</h1>
      </Provider>
    );
  }
}

export default Weathr;
