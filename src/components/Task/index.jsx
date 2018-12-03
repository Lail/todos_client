import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import posed from 'react-pose';
import styled from 'styled-components';
import styles from '../../styles';

//Components
import Tag from '../Tag';
import Check from '../Check';

const PosedWrapper = posed.div({
  here:  { opacity: 1 },
  going: { opacity: 0.25, height: 'auto' },
  gone:  { opacity: 0,    height: '0px', applyAtEnd: { display: 'none' } },
});
const Wrapper = styled(PosedWrapper)`
  position: relative;
  padding: 0;
  box-shadow: inset 0 -1px 0 0 ${styles.neutralMid};
  overflow: hidden;
  &:last-child {
    box-shadow: none;
  }
`;
const Clickable = styled.a`
  display: block;
  position: relative;
  padding: 0.85em 1em 1em;
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
  text-decoration: ${({checked}) => checked ? 'line-through' : 'none'};
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

const Task = ({ id, title, tags }) => {
  const [checked, setChecked] = useState(false);
  const [removed, setRemoved] = useState(false);

  const deleteTask = (id) => {
    setChecked(true);
    axios.delete(`http://localhost:3001/api/v1/tasks/${id}`)
    .then((res) => {
      setRemoved(true);
    })
    .catch((error) => { setChecked(false); })
  }

  const checkTask = (e) => {
    e.preventDefault();
    deleteTask(id);
  }

  const getPose = () => {
    if(removed) { return 'gone' };
    return checked ? 'going' : 'here';
  }

  return (
    <Wrapper pose={getPose()}>
      <Clickable href='#' onClick={checkTask} >
        <PositionedCheck checked={checked} />
        <Title checked={checked}>{ title }</Title>
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
}

export default Task;
