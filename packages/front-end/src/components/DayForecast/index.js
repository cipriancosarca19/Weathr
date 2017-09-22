import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Rebass from 'rebass';

import getWeatherSummaryIcon from 'utils/getWeatherSummaryIcon';

import { InlineText } from 'components/Layout';
import TemperatureText from './TemperatureText';
import StyledForecastBox from './StyledForecastBox';

const DayForecast = (props) => {
  const time = moment(props.forecast.time * 1000);

  return (
    <StyledForecastBox w={[1, 1/2, 1/4]} pt='1.2rem'>
      <Rebass.Text f='1.4rem'>{time.format('dddd')}</Rebass.Text>
      <Rebass.Text f='1rem' color='gray.6'>{time.format('MMMM Do, YYYY')}</Rebass.Text>
      <Rebass.Divider w='97%' color='gray.1' />
      <Rebass.Image
        src={getWeatherSummaryIcon(props.forecast.icon)}
        alt={`Weather summary for ${time.format('MMMM Do, YYYY')} as an icon: ${props.forecast.icon}`}
        mx='auto'
      />
      <Rebass.Divider w='97%' color='gray.1' />
      <Rebass.Box px='0.3rem'>
        <TemperatureText
          w={1/2}
          py='0.6rem'
          f='1.4rem'
          bold
          center
          low
        >
          {`\u25BC${props.forecast.temperatureLow} \u00B0${props.units === 'us' ? 'F' : 'C'}`}
        </TemperatureText>
        <TemperatureText
          w={1/2}
          py='0.6rem'
          f='1.4rem'
          bold
          center
          high
        >
          {`\u25B2${props.forecast.temperatureHigh} \u00B0${props.units === 'us' ? 'F' : 'C'}`}
        </TemperatureText>
      </Rebass.Box>
      <Rebass.Divider w='97%' color='gray.1' />
      <Rebass.Box px='0.3rem' pb='0.8rem'>
        {
          props.forecast.precipProbability ? (
            <div>
              <InlineText
                w={1/2}
                py='0.6rem'
                f='1.4rem'
                center
              >
                {props.forecast.precipProbability * 100}%
              </InlineText>
              <InlineText
                w={1/2}
                py='0.6rem'
                f='1.4rem'
                center
              >
                {`${props.forecast.precipType.charAt(0).toUpperCase()}${props.forecast.precipType.slice(1)}`}
              </InlineText>
            </div>
          ) : (
            <Rebass.Text
              py='0.6rem'
              f='1.4rem'
              center
            >
              No chance for precipitation
            </Rebass.Text>
          )
        }
      </Rebass.Box>
      <Rebass.Divider mb={0} color='base' />
    </StyledForecastBox>
  );
}

DayForecast.propTypes = {
  forecast: PropTypes.shape({
    time: PropTypes.number,

    icon: PropTypes.string,

    temperatureHigh: PropTypes.number,
    temperatureLow: PropTypes.number,

    precipProbability: PropTypes.number,
    precipType: PropTypes.string,
  }).isRequired,
  units: PropTypes.string.isRequired,
}

export default DayForecast;
