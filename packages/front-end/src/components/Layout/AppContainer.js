import styled from 'styled-components';
import { Container } from 'rebass';

const AppContainer = styled(Container).attrs({ is: 'section' })`
  min-height: 100vh;
  position: relative;
`;

export default AppContainer;
