import styled from 'styled-components';
import Select from 'react-select';

export default styled(Select.Async)`
  height: 3.6rem;
  font-size: 1.4rem;

  & > .Select-control {
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);

    cursor: pointer;
    
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

    &:hover {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2),
                  0 6px 10px 0 rgba(0, 0, 0, 0.3);
    }

    .Select-arrow-zone {
      display: none;
    }

    .Select-clear-zone,
    .Select-loading-zone {
      padding-right: 0.5rem;
    }
  }

  & > .Select-menu-outer {
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
  }
`;
