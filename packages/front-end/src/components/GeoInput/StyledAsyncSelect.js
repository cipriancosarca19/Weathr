import styled from 'styled-components';
import Select from 'react-select';

export default styled(Select.Async)`
  font-size: 1.4rem;

  & > .Select-control {
    border: none;
    border-radius: 0;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .Select-arrow-zone {
      display: none;
    }

    .Select-clear-zone {
      padding-right: 0.5rem;
    }
  }

  & > .Select-menu-outer {
    border: none;
    border-radius: 0;
    
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
`;
