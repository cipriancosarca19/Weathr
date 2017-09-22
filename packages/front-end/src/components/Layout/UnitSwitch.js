import styled, { keyframes } from 'styled-components';
import { Switch } from 'rebass';

const ShowUnitSwitch = keyframes`
from {
  top: -2.4rem;
}

to {
  top: 0;
}
`;

const UnitSwitch = styled(Switch)`
  position: absolute;
  z-index: 4;
  top: 0;
  right: 1.6rem;

  border: none;
  border-radius: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  animation: ${ShowUnitSwitch} 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &::after {
    z-index: 5;

    border-radius: 0;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
`;

export default UnitSwitch;
