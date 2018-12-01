import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../../styles';

const Wrapper = styled.span`
  display: inline-block;
  font-size: 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  max-width: 8em;
  background-color: ${styles.neutralMid};
  background-color: ${({color}) => color.bg};
  color: ${({color}) => color.text};
  padding: 0.3em 0.6em;
  margin-right: 0.3em;
  border-radius: 3px;
`;

const Tag = ({title, count}) => {
  const getColors = (str) => {
    let num = str.split('').map((chr) => (chr.charCodeAt(0) << 5)).join('');
    const h = (num.slice(0,-3) + 25) % 360; // 0 to 360
    const s = 50 + (num.slice(1,3)/2); // 50 to 100
    return {
      bg: `hsl(${h}, ${s}%, 85%)`,
      text: `hsl(${h}, ${s}%, 25%)`,
    }
  }

  return (
    <Wrapper color={getColors(title)}>{title}</Wrapper>
  );
}

Tag.defaultProps = {}

Tag.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
}

export default Tag;
