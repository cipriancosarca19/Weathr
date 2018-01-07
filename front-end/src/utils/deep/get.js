import _ from 'lodash';

function get(obj, path) {
  if (typeof path === 'string') path = path.split('.');
  if (!obj || path.length === 0) return undefined;

  obj = _.cloneDeep(obj);

  for (let i = 0; i < path.length; i++) {
    if (!obj || !obj.hasOwnProperty(path[i])) return undefined;
    else obj = obj[path[i]];
  }

  return obj;
}

export default get;
