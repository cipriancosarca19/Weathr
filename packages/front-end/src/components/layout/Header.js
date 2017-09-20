import styled, { keyframes } from 'styled-components';

let SET_WIDTH = '42rem';

const ShowHeader = keyframes`
  from {
    transform: translate(-50%, -65%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const MaximizeHeader = keyframes`
  0% {
    width: ${SET_WIDTH};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  50% {
    width: ${SET_WIDTH};

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  79% {
    width: ${SET_WIDTH};

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  80% {
    width: ${SET_WIDTH};
    margin: 0 auto;

    position: static;
    transform: none;
  }

  100% {
    width: 100%;
    margin: 0 auto;

    position: static;
    transform: none;
  }
`;

const Header = styled.header`
  ${props => {
    if (props.w !== '100%') {
      SET_WIDTH = props.w;

      return `
        width: ${SET_WIDTH};

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;

        animation: ${ShowHeader} 0.3s ease-in;
      `;
    } else {
      return `
        width: 100%;

        animation: ${MaximizeHeader} 0.7s ease-in;
      `;
    }
  }}
`;

export default Header;
