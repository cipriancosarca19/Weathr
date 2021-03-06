import styled from 'styled-components';
import { Box } from 'rebass';

import colors from 'theme/colors'

const ForecastBox = styled(Box)`
  width: auto;
  vertical-align: top;
  text-align: center;

  background-color: ${colors.white};
  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: ${colors.gray0};
  }
`;

export default ForecastBox;
