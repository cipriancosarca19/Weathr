import styled from 'styled-components';
import media from 'styled-media-query';

const Title = styled.h1`
  margin-bottom: 1.8rem;
  border-bottom: 1px solid black;

  text-align: center;
  font-family: 'Arbutus Slab';
  font-size: 3.2rem;
  font-weight: normal;
  color: black;

  ${media.greaterThan('large')`
    margin-bottom: 3.2rem;

    font-size: 4.2rem;
  `}
`;

export default Title;
