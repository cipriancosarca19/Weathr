import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Rebass from 'rebass';

import WeathrLogoSun from 'assets/images/logo/weathr_sun.png';
import WeathrLogoText from 'assets/images/logo/weathr_text.png';

const AppContainer = styled(({children, dirty, ...rest}) => (
  <Rebass.Container {...rest}>
    <Rebass.Card id='app_container'>
      <div id='weathr_logo'>
        <img src={WeathrLogoSun} alt='Weathr Logo - Sun' />
        <br />
        <img src={WeathrLogoText} alt='Weathr Logo - Text' />
      </div>
      {!dirty ? <Rebass.Divider color='base' mb='2rem' /> : null}
      {children}
    </Rebass.Card>
  </Rebass.Container>
))`
  #app_container {
    width: ${({dirty}) => dirty ? '100%' : '42rem'};
    padding: 2.8rem;
    overflow: visible;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    ${({dirty}) => {
      if (!dirty) return `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      else return `
        position: static;
        margin-top: 14rem;
      `;
    }}

    #weathr_logo {
      text-align: center;

      img:first-of-type {
        width: 8rem;
      }

      img:last-of-type {
        width: 12rem;
      }

      ${({dirty}) => {
        if (dirty) return `
          position: absolute;
          top: 1rem;
          left: 50%;
          transform translateX(-50%);
        `;
      }}
    }
  }
`;

AppContainer.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default AppContainer;
