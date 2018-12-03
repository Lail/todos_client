import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../../styles';

//Components
import Tag from '../Tag'

const Wrapper = styled.div`
  padding: 0.85em 1em 1em;
  box-shadow: inset 0 -1px 0 0 ${styles.neutralMid};
  &:last-child {
    box-shadow: none;
  }
`;
const Title = styled.h2`
  font-size: 120%;
  font-weight: 300;
  line-height: 1.0;
  padding: 0;
  margin: 0;
`;
const TagList = styled.div`
  margin-top: 0.25em;
  line-height: 1.1;
`;

const Task = ({ title, tags }) => (
  <Wrapper>
    <Title>{ title }</Title>
    { tags && tags.length > 0 &&
      <TagList>
        { tags.map((tag, i) => (
          <Tag title={tag.title} key={`tag_${i}`} />
        )) }
      </TagList>
    }
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
