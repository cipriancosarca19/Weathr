import _ from 'lodash';

function set(obj, path, value) {
  if (typeof path === 'string') path = path.split('.');
  if (!obj || path.length === 0) return undefined;

  obj = _.cloneDeep(obj);
  const root = obj;

  for (let i = 0; i < path.length; i++) {
    if (!obj || !obj.hasOwnProperty(path[i])) obj[path[i]] = {};
    if (i === (path.length - 1)) obj[path[i]] = value;
    obj = obj[path[i]];
  }

  return rootObj;
}

export default set;
