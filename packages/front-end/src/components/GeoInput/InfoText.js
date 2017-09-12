import styled from 'styled-components';
import media from 'styled-media-query';

import colors from 'utils/colors';

const InfoText = styled.p`
  position: relative;
  margin: 0 auto 0.8rem;
  padding: 0 1.2rem;

  text-align: center;
  font-family: 'Indie Flower';
  font-size: 1.8rem;
  color: white;

  ${media.greaterThan('large')`
    width: 68rem;
    font-size: 2.4rem;
  `}

  &:before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 5%;
    left: 0;

    width: 100%;
    height: 90%;

    background-color: ${colors.green};
    opacity: 0.7;

    ${media.greaterThan('medium')`
      top: 20%;
      height: 60%;
    `}
  }
`;

export default InfoText;
