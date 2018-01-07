import styled, { keyframes } from 'styled-components';
import { Switch } from 'rebass';

import colors from 'theme/colors';

const ShowUnitSwitch = keyframes`
from {
  top: -2.4rem;
}

to {
  top: 0;
}
`;

const UnitSwitch = styled(Switch)`
  border-radius: 0;

  position: absolute;
  z-index: 4;
  top: 0;
  right: 1.7rem;

  background-color: ${colors.white};
  box-shadow: 0 2px rgba(0, 0, 0, 0.37);

  animation: ${ShowUnitSwitch} 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  &::after {
    border-radius: 0rem;
    background-color: ${colors.base};
  }

  &::before {
    content: 'Units\00000A°F/°C';
    display: block;

    position: absolute;
    left: 50%;
    top: 2.7rem;
    transform: translateX(-50%);

    color: black;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
`;

export default UnitSwitch;
