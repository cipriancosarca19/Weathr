import styled from 'styled-components';

import colors from 'theme/colors';

const App = styled.div`
  width: 100vw;
  min-height: 100vh;
  
  background: linear-gradient(-30deg, ${colors.base}, ${colors.secondary});
  background-attachment: fixed;
`;

export default App;
