import ClearDay from 'assets/icons/summary/clear-day.svg';
import ClearNight from 'assets/icons/summary/clear-night.svg';
import Cloudy from 'assets/icons/summary/cloudy.svg';
import Fog from 'assets/icons/summary/fog.svg';
import Hail from 'assets/icons/summary/hail.svg';
import PartlyCloudDay from 'assets/icons/summary/partly-cloudy-day.svg';
import PartlyCloudNight from 'assets/icons/summary/partly-cloudy-night.svg';
import Rain from 'assets/icons/summary/rain.svg';
import Snow from 'assets/icons/summary/snow.svg';
import Thunderstorm from 'assets/icons/summary/thunderstorm.svg';
import Tornado from 'assets/icons/summary/tornado.svg';
import Wind from 'assets/icons/summary/wind.svg';

const iconMap = {
  'clear-day': ClearDay,
  'clear-night': ClearNight,
  cloudy: Cloudy,
  fog: Fog,
  hail: Hail,
  'partly-cloudy-day': PartlyCloudDay,
  'partly-cloudy-night': PartlyCloudNight,
  rain: Rain,
  snow: Snow,
  thunderstorm: Thunderstorm,
  tornado: Tornado,
  wind: Wind,
};

export default key => iconMap.hasOwnProperty(key) ? iconMap[key] : null;
