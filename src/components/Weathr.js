import React from 'react';
import * as deep from 'utils/deep';

class Weathr extends React.Component {
  updateStateByPath = (path, value) => this.setState((prevState, props) => deep.set(prevState, path, value));

  render() {
    return (
      <div>Hello, Weathr!</div>
    );
  }
}

export default Weathr;
