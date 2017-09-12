import styled from 'styled-components';
import media from 'styled-media-query';

const InfoText = styled.div`
  margin-bottom: 0.8rem;

  text-align: center;
  font-family: 'Roboto';
  font-size: 1.8rem;
  color: white;

  ${media.greaterThan('large')`
    font-size: 2.4rem;
  `}
`;

export default InfoText;
