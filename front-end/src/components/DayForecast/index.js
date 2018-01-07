import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  Divider,
  Text,
  Image,
} from 'rebass';

import getWeatherSummaryIcon from 'utils/getWeatherSummaryIcon';

import { InlineText } from 'components/Layout';
import TemperatureText from './TemperatureText';
import ForecastBox from './ForecastBox';

const DayForecast = (props) => {
  const time = moment(props.forecast.time * 1000);

  return (
    <ForecastBox w={[1, 1/2, 1/4]} pt='1.2rem'>
      <Text f='1.4rem'>{time.format('dddd')}</Text>
      <Text f='1rem' color='gray6'>{time.format('MMMM Do, YYYY')}</Text>
      <Divider w='97%' color='gray1' />
      <Image
        src={getWeatherSummaryIcon(props.forecast.icon)}
        alt={`Weather summary for ${time.format('MMMM Do, YYYY')} as an icon: ${props.forecast.icon}`}
        mx='auto'
      />
      <Divider w='97%' color='gray1' />
      <Box px='0.3rem'>
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
      </Box>
      <Divider w='97%' color='gray1' />
      <Box px='0.3rem' pb='0.8rem'>
        {
          props.forecast.precipProbability ? (
            <div>
              <InlineText
                w={1/2}
                py='0.6rem'
                f='1.4rem'
                center
              >
                {Math.round(props.forecast.precipProbability * 100)}%
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
            <Text
              py='0.6rem'
              f='1.4rem'
              center
            >
              No chance for precipitation
            </Text>
          )
        }
      </Box>
      <Divider mb={0} color='base' />
    </ForecastBox>
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
