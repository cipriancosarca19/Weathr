import palx from 'palx';

const palette = palx('#FDA6C4');

const flattened = Object.keys(palette)
  .reduce((a, key) => {
    const value = palette[key];

    if (Array.isArray(value)) {
      a[key] = value[5];

      value.forEach((val, i) => {
        a[key + i] = val;
      });
    } else {
      a[key] = value;
    }

    return a;
  }, {});

export default Object.assign({}, flattened, {
  black: '#1F1F1F',
  white: '#FFFFFF',

  darkBase: '#B0627D',
  accent: '#FF0041',
  secondary: '#FAC9B5',
});
