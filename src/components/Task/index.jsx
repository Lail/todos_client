import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../../styles';

//Components
import Tag from '../Tag';
import Check from '../Check';

const Wrapper = styled.div`
  position: relative;
  padding: 0;
  box-shadow: inset 0 -1px 0 0 ${styles.neutralMid};
  overflow: hidden;
  opacity: ${({ status }) => status === 'active' ? 1 : 0.25};
  display: ${({ status }) => status === 'gone' ? 'none' : 'block'};
  &:last-child {
    box-shadow: none;
  }
`;
const Clickable = styled.a`
  display: block;
  position: relative;
  padding: 0.85em 1em 0.85em 1em;
  color: ${styles.neutralDark};
  text-decoration: none;
  &:hover {
    background-color: ${styles.highlight};
  }
`;
const Title = styled.h2`
  font-size: 120%;
  font-weight: 300;
  line-height: 1.0;
  padding: 0;
  margin: 0 0 0 1.25em;
  text-decoration: ${({status}) => status === 'active' ? 'none' : 'line-through' };
`;
const TagList = styled.div`
  margin: 0.25em 0 0 1.5em;
  line-height: 1.1;
`;
const PositionedCheck = styled(Check)`
  position: absolute;
  top: 1em;
  left: 1em;
  width: 0.9em;
`;

const Task = ({ id, title, status, tags, deleteTask }) => {

  const handleClick = (e) => {
    e.preventDefault();
    deleteTask(id);
  }

  return (
    <Wrapper status={status} id={`Task_${id}`}>
      <Clickable href='#' onClick={handleClick} >
        <PositionedCheck status={status} />
        <Title status={status}>{ title }</Title>
        { tags && tags.length > 0 &&
          <TagList>
            { tags.map((tag, i) => (
              <Tag title={tag.title} key={`tag_${i}`} />
            )) }
          </TagList>
        }
      </Clickable>
    </Wrapper>
  );
};

Task.defaultProps = {
  title: "Title missing",
  tags: [],
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

export default Task;
