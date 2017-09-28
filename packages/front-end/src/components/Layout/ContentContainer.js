import styled, { keyframes } from 'styled-components';

const ShowContent = keyframes`
  from {
    transform: translateY(15%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ContentContainer = styled.section`
  margin-top: 1.2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
  
  position: relative;
  animation: ${ShowContent} 0.5s cubic-bezier(0.23, 1, 0.32, 1);
`;

export default ContentContainer;
