import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from 'utils/registerServiceWorker';

import Weathr from 'components/Weathr';
import 'index.css';

ReactDOM.render(<Weathr />, document.getElementById('root'));

registerServiceWorker();
