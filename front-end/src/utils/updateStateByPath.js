import { set } from 'utils/deep';

/**
 * Generic utility function to update a
 * component's state.
 * 
 * @param  {React.Component}  scope   Used in place of `this` to call `setState`
 * @param  {string}           path    Dot-notated path in state to target
 * @param  {any}              value   Value to set the target to
 */
const updateStateByPath = (scope, path, value) =>
  scope.setState((prevState, props) => set(prevState, path, value));

export default updateStateByPath;
