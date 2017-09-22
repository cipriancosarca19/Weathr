import fahrenheitToCelsius from './fahrenheitToCelsius';

export default (data) => ({
  currently: {
    time: data.currently.time,
    icon: data.currently.icon,
    temperature: data.currently.temperature,
    apparentTemperature: data.currently.apparentTemperature,
    humidity: data.currently.humidity,
    precipProbability: data.currently.precipProbability,
    precipType: data.currently.precipProbability ? data.currently.precipType : null,
  },
  daily: {
    data: data.daily.data.map(day => ({
      time: day.time,
      icon: day.icon,
      temperatureHigh: fahrenheitToCelsius(day.temperatureHigh),
      temperatureLow: fahrenheitToCelsius(day.temperatureLow),
      precipProbability: day.precipProbability,
      precipType: day.precipProbability ? day.precipType : null,
    })),
    icon: data.daily.icon,
    summary: data.daily.summary,
  },
});
