import styled from 'styled-components';
import { Box } from 'rebass';

import colors from 'theme/colors'

const StyledForecastBox = styled(Box)`
  display: inline-block;
  vertical-align: top;
  text-align: center;

  background-color: white;
  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: ${colors.gray0};
  }
`;

export default StyledForecastBox;
