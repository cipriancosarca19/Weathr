import styled, { keyframes } from 'styled-components';

const ShowWeeklyForecast = keyframes`
  from {
    transform: translateY(15%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const WeeklyForecastWrapper = styled.section`
  margin-top: 1.2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  
  position: relative;
  animation: ${ShowWeeklyForecast} 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

export default WeeklyForecastWrapper;
