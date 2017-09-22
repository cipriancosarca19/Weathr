import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

let SET_WIDTH = null;

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

const MaximizeHeader_Mobile = keyframes`
  0% {
    padding: 0 1.6rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  99% {
    padding: 0 1.6rem;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  100% {
    padding: 0;

    position: static;
    top: 0;
    left: 0;
    transform: none;
  }
`;

const MaximizeHeader = initialWidth => keyframes`
  0% {
    width: ${initialWidth};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  37% {
    width: ${initialWidth};

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  38% {
    width: ${initialWidth};

    position: relative;
    z-index: 3;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }

  63% {
    width: ${initialWidth};

    position: relative;
    z-index: 3;
    top: 0;
    left: 0;
    transform: none;
  }

  100% {
    width: 100%;

    position: relative;
    z-index: 3;
    top: 0;
    left: 0;
    transform: none;
  }
`;

const Header = styled.header`
  ${({w}) => {
    if (w !== '100%') {
      SET_WIDTH = w;

      return `
        width: 100%;
        padding: 0 1.6rem;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        animation: ${ShowHeader} 0.3s ease-in;

        @media screen and (min-device-width: ${SET_WIDTH}) {
          width: ${SET_WIDTH};
          padding: 0;
        }
      `;
    }

    return `
      width: 100%;
      position: relative;
      z-index: 3;

      animation: ${MaximizeHeader_Mobile} 0.3s cubic-bezier(0.23, 1, 0.32, 1);

      @media screen and (min-device-width: ${SET_WIDTH}) {
        margin: 0 auto;
        animation: ${MaximizeHeader(SET_WIDTH)} 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      }
    `;
  }}
`;

Header.propTypes = {
  w: PropTypes.string.isRequired,
}

export default Header;
