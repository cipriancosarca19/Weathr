import styled from 'styled-components';
import media from 'styled-media-query';

import colors from 'utils/colors';

const Title = styled.h1`
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 0.2rem dashed ${colors.darkCyan};

  text-align: center;
  font-family: 'Open Sans Condensed';
  font-size: 3.2rem;
  font-weight: 700;

  color: ${colors.green};
  text-shadow:  2px -2px white,
                -2px -2px white,
                -2px 2px white,
                -2px -2px white,
                2px -1px white,
                -2px -1px white,
                -1px 2px white,
                -1px -2px white,
                2px 0px white,
                -2px 0px white,
                0px 2px white,
                0px -2px white,
                2px 1px white,
                -2px 1px white,
                1px 2px white,
                1px -2px white,
                2px 2px white,
                -2px 2px white,
                2px 2px white,
                2px -2px white,
                3px -3px ${colors.cyan},
                -3px -3px ${colors.cyan},
                -3px 3px ${colors.cyan},
                -3px -3px ${colors.cyan},
                3px -2px ${colors.cyan},
                -3px -2px ${colors.cyan},
                -2px 3px ${colors.cyan},
                -2px -3px ${colors.cyan},
                3px -1px ${colors.cyan},
                -3px -1px ${colors.cyan},
                -1px 3px ${colors.cyan},
                -1px -3px ${colors.cyan},
                3px 0px ${colors.cyan},
                -3px 0px ${colors.cyan},
                0px 3px ${colors.cyan},
                0px -3px ${colors.cyan},
                3px 1px ${colors.cyan},
                -3px 1px ${colors.cyan},
                1px 3px ${colors.cyan},
                1px -3px ${colors.cyan},
                3px 2px ${colors.cyan},
                -3px 2px ${colors.cyan},
                2px 3px ${colors.cyan},
                2px -3px ${colors.cyan},
                3px 3px ${colors.cyan},
                -3px 3px ${colors.cyan},
                3px 3px ${colors.cyan},
                3px -3px ${colors.cyan};

  ${media.greaterThan('large')`
    margin-bottom: 3.2rem;

    font-size: 4.2rem;
  `}
`;

export default Title;
