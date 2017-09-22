import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import * as Rebass from 'rebass';

import colors from 'theme/colors'
import getWeatherSummaryIcon from 'utils/getWeatherSummaryIcon';

const StyledForecastBox = styled(Rebass.Box)`
  display: inline-block;
  vertical-align: top;
  text-align: center;

  background-color: white;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: ${colors.gray[1]};
  }
`;

const StyledSVGIcon = styled(Rebass.Image)`
  font-size: 1.5rem;
`;

const DayForecastCard = (props) => {
  const time = moment(props.forecast.time * 1000);

  return (
    <StyledForecastBox
      w={[1, 1/2, 1/4]}
      pt='0.8rem'
    >
      <Rebass.Text f='1.4rem'>{time.format('dddd')}</Rebass.Text>
      <Rebass.Text f='1rem'>{time.format('MMMM Do, YYYY')}</Rebass.Text>
      <Rebass.Divider
        w='97%'
        color='base'
      />
      <StyledSVGIcon
        src={getWeatherSummaryIcon(props.forecast.icon)}
        alt={`Weather summary for ${time.format('MMMM Do, YYYY')} as an icon: ${props.forecast.icon}`}
        mx='auto'
      />
      <Rebass.Divider
        w='97%'
        color='base'
      />
    </StyledForecastBox>
  );
}

DayForecastCard.propTypes = {
  forecast: PropTypes.shape({
    time: PropTypes.number,

    icon: PropTypes.string,

    temperatureHigh: PropTypes.number,
    temperatureLow: PropTypes.number,

    humidity: PropTypes.number,

    precipProbability: PropTypes.number,
    precipType: PropTypes.string,
  }).isRequired,
}

export default DayForecastCard;
