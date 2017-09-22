import React from 'react';
import PropTypes from 'prop-types';

import WeeklyForecastWrapper from './WeeklyForecastWrapper';
import DayForecastCard from './DayForecastCard';

const WeeklyForecast = (props) => {
  return (
    <WeeklyForecastWrapper>
      {props.forecast.data.map(day => <DayForecastCard key={day.time} forecast={day} />)}
    </WeeklyForecastWrapper>
  );
}

WeeklyForecast.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  forecast: PropTypes.shape({
    data: PropTypes.array,
    icon: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
};

export default WeeklyForecast;
