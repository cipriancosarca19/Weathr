import styled from 'styled-components';

import LogoSun from 'assets/images/logo/weathr_sun.png';
import LogoText from 'assets/images/logo/weathr_text.png';
import LogoSun2X from 'assets/images/logo/weathr_sun@2X.png';
import LogoText2X from 'assets/images/logo/weathr_text@2X.png';

const Sun = styled.div`
  width: 8rem;
  height: 9.2rem;
  margin: 0 auto;
  padding-top: 1.2rem;

  background: url(${LogoSun}) 0 1.2rem/8rem no-repeat;

  @media screen and (min-device-pixel-ratio: 1.5) {
    background-image: url(${LogoSun2X});
  }
`;

const Text = styled.h1`
  width: 12rem;
  height: 4.8rem;
  margin: 0 auto;
  padding-bottom: 0.8rem;

  overflow: hidden;
  text-indent: -9999px;

  background: url(${LogoText}) 0 0/12rem 4rem no-repeat;

  @media screen and (min-device-pixel-ratio: 1.5) {
    background-image: url(${LogoText2X});
  }
`;

export {
  Sun,
  Text,
};
