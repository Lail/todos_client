import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const wrapperRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;
const Wrapper = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  animation: ${wrapperRotate} 1.3s linear infinite;
`;
const spinnerRotate = keyframes`
  0% { stroke-dashoffset: 100; }
  50% {
    stroke-dashoffset: 50;
    transform: rotate(135deg);
  }
  85% {
    stroke-dashoffset: 100;
    transform: rotate(540deg);
  }
  100% {
    stroke-dashoffset: 100;
    transform: rotate(580deg);
  }
`;
const SpinnerSVG = styled.svg`
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${spinnerRotate} 1.3s ease-in-out infinite;
`;

const SpinnerPath = styled.circle``;

const Spinner = ({ color }) => (
  <Wrapper>
    <SpinnerSVG
      width='30'
      height='30'
      viewBox='0 0 30 30'
    >
      <SpinnerPath
        className="SpinnerPath"
        fill="none"
        stroke={color}
        strokeWidth='4'
        strokeLinecap="round"
        cx='15'
        cy='15'
        r='11px'
      />
    </SpinnerSVG>
  </Wrapper>
);

Spinner.defaultProps = {
  color: '#aaaaaa',
}

Spinner.propTypes = {
  color: PropTypes.string.isRequired,
}

export default Spinner;
