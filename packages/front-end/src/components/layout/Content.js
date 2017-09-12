import styled from 'styled-components';
import media from 'styled-media-query';

const Content = styled.div`
  width: 100%;
  max-width: 117rem;
  margin: 0 auto;
  padding: 0 1.8rem;

  ${media.greaterThan('large')`
    padding: 0;
  `}
`;

export default Content;
