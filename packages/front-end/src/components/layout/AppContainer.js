import styled from 'styled-components';

import BackgroundImage from 'images/background_tirza-van-dijk-302.jpg';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: auto;

  &:before {
    content: '';

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    background: no-repeat center center url(${BackgroundImage});
    background-size: cover;
    background-attachment: fixed;

    filter: blur(2px);
  }
`;

export default AppContainer;
