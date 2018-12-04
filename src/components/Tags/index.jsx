import React, { useState, useEffect } from 'react';
import axios from 'axios';
import posed from 'react-pose';
import styles from '../../styles';
import styled from 'styled-components';

// Formatters
import TagListFormatter from '../../formatters/TagListFormatter';

// Components
import Tag from '../Tag';
import Spinner from '../Spinner';

const FadeIn = posed.div({
  enter: { opacity: 1.0 },
  exit: { opacity: 0.1 }
});
const TagList = styled.div`
  position: absolute;
  top: 2em; right: 0; bottom: 0; left: 0;
  padding: 0.85em 1em 0.85em 1em;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-top: 1px solid ${styles.neutralMid};
    border-left: 1px solid ${styles.neutralMid};
    background-color: ${styles.neutralMid};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${styles.neutralBright};
    border-left: 1px solid ${styles.neutralMid};
    border-right: 0;
  }
`;
const ListError = styled.div`
  background-color: ${styles.errorHighlight};
  color: ${styles.errorText};
  font-size: 60%;
  border-radius: 3px;
  margin: 1em;
  padding: 0.5em;
`;
const CenterFloat = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EmptyMessage = styled.div`
  color: ${styles.neutralDark};
  padding: 1em;
  opacity: 0.5;
  font-size: 85%;
`;

const Tags = () => {
  const [tags, setTags] = useState(null);
  const [listBusy, setListBusy] = useState(false);
  const [listError, setListError] = useState(null);

  // load full list on mount
  useEffect(() => {
    setListBusy(true);
    axios.get('http://localhost:3001/api/v1/tags')
    .then((res) => {
      setTags(TagListFormatter(res.data));
    })
    .catch((error) => { console.log(error);setListError(`${error.message} 😧`) })
    .finally(() => { setListBusy(false) });
  }, []);

  return (
    <TagList>
      { !listBusy && tags &&
        <FadeIn pose='enter' initialPose='exit' >
          {tags.map((tag, i) => (
            <Tag
              title={tag.title}
              tags={tag.tags}
              id={tag.id}
              count={tag.count}
              data-key={`task_${i}`}
              key={`task_${i}`}
            />
          ))}
        </FadeIn>
      }
      { !listBusy && tags && tags.length < 1 &&
        <EmptyMessage>You haven't created any tags yet.</EmptyMessage>
      }
      { listBusy &&
        <CenterFloat>
          <Spinner />
        </CenterFloat>
      }
      { listError &&
        <ListError>{ listError }</ListError>
      }
    </TagList>
  )
}

export default Tags;
