import React from 'react';

class Weathr extends React.Component {
  constructor() {
    super();

    this.state = {
      geoQuery: '',
    };
  }

  render() {
    return (
      <div>Hello, Weathr!</div>
    );
  }
}

export default Weathr;
