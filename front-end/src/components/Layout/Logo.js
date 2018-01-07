import React from 'react';
import styled from 'styled-components';

import LogoSun from 'assets/images/logo/weathr_sun.svg';
import LogoText from 'assets/images/logo/weathr_text.svg';

const Sun = styled.div`
  width: 8rem;
  height: 9.2rem;
  margin: 0 auto;
  padding-top: 1.2rem;

  background: url(${LogoSun}) 0 1.2rem/8rem no-repeat;
`;

const Text = styled.h1`
  width: 12rem;
  height: 4rem;
  margin: 0 auto 0.8rem;

  overflow: hidden;
  text-indent: -9999px;

  background: url(${LogoText}) center/12rem 4rem no-repeat;
`;

const Logo = props => (
  <div>
    <Sun />
    <Text>Weathr</Text>
  </div>
);

export default Logo;
