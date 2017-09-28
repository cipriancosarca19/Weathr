import React from 'react';
import styled from 'styled-components';

import GHLogo from 'assets/images/gh_logo.png';
import GHMark from 'assets/images/gh_mark.png';

const GitHubWrapper = styled.a`
  width: 4.2rem;
  height: 4.4rem;
  padding: 0.5rem;
  overflow: hidden;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 101;

  text-align: right;
  transition: width 0.3s 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &::before {
    content: '';

    display: block;
    width: 12rem;
    height: 4.2rem;
    border-radius: 0;

    position: absolute;
    top: -4.4rem;
    right: 0;
    z-index: -1; 

    background: white;
    box-shadow: 0 2px rgba(0, 0, 0, 0.37);

    transition: top 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    width: 12rem;

    &::before {
      top: 0;
    }
  }
`;

const GitHubMark = styled.img`
  display: inline-block;
  width: 3.2rem;
`;

const GitHubLogo = styled.img`
  display: inline-block;
  width: 7rem;

  position: absolute;
  top: 50%;
  right: 4.2rem;
  transform: translateY(-50%);
  z-index: 102;
`;

const GitHub = props => {
  return (
    <GitHubWrapper target="_blank" href="https://github.com/mannie-faux/weathr">
      <GitHubMark src={GHMark} />
      <GitHubLogo src={GHLogo} />
    </GitHubWrapper>
  );
};

export default GitHub;
