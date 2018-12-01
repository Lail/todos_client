import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import styles from '../../styles';

//Components
import Tag from '../Tag'

const Wrapper = styled.div`
  padding: 0.85em 1em 1em;
  box-shadow: inset 0 -1px 0 0 ${styles.neutralMid};
`;
const Title = styled.h2`
  font-size: 120%;
  font-weight: 300;
  line-height: 1.0;
  padding: 0;
  margin: 0 0 0.25em 0;
`;
const TagList = styled.div`
  line-height: 1.1;
`;

const Task = ({ title, tags }) => (
  <Wrapper>
    <Title>{ title }</Title>
    <TagList>
      { tags && tags.map((tag, i) => (
        <Tag title={title} key={`tag_${i}`} />
      )) }
    </TagList>
  </Wrapper>
);

Task.defaultProps = {
  title: "Title missing",
  tags: [],
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
}

export default Task;
