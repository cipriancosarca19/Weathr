import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'rebass';

import colors from 'theme/colors'

const TemperatureText = styled(({high, low, children, ...rest}) => <Text {...rest}>{children}</Text>)`
  display: inline-block;
  position: relative;
  text-indent: -9999px;

  &::before {
    content: '';

    width: 0.8rem;
    height: 100%;

    position: absolute;
    top: 0;
    z-index: 0;

    transition: width 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &::after {
    content: '${({children}) => children}';

    display: inline-block;
    width: 100%;
    text-indent: 0;

    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 1;
  }

  ${({low}) => low ? `
    &::before {
      left: 0;

      background-color: ${colors.cyan};
    }
  ` : null}

  ${({high}) => high ? `
    &::before {
      right: 0;

      background-color: ${colors.red};
    }
  ` : null}

  &:hover {
    &::before {
      width: 100%;
    }
  }
`;

TemperatureText.propTypes = {
  high: PropTypes.bool,
  low: PropTypes.bool,
};

export default TemperatureText;
