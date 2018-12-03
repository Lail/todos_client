import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import styles from '../../styles';
import axios from 'axios';

const TagSelect = ({ inputValue="", handleSelectChange }) => {
  // const [currentValue, setCurrentValue] = useState(inputValue);
  const [defaultOptions, setDefaultOptions] = useState([]);

  const filterTags = (inputValue: string) => {
  if (inputValue) {
    return defaultOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
  }
  return defaultOptions;
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterTags(inputValue));
    }, 500);
  });

  // load all tags on mount
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tags')
    .then((res) => {
      const tags = res['data']['data'].map((tag) => (
        { label: tag.attributes.title, value: tag.attributes.title }
      ));
      setDefaultOptions(tags);
    })
    .catch((error) => { console.log(error);})
  }, []);

  // const handleInputChange = (newValue: string) => {
  //   setCurrentValue( newValue.replace(/\W/g, '') );
  //   return currentValue;
  // };


  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={promiseOptions}
      asyncOptions={handleSelectChange}
      theme={(theme) => {
          return (
            {
              ...theme,
              borderRadius: '3px',
              borderColor: styles.neutralMid,
              fontSize: '70%',
              colors: {
                ...theme.colors,
                primary25: styles.highlight,
                primary: styles.actionColor,
              }
            }
          );
        }
      }
    />
  );

}

export default TagSelect;
