import decimalAdjust from './decimalAdjust';

const fahrenheitToCelsius = (tempF) => decimalAdjust('round', (tempF - 32) * 5/9, -2);

export default fahrenheitToCelsius;
