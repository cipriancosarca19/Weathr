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

  animation: ${ShowUnitSwitch} 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

export default UnitSwitch;