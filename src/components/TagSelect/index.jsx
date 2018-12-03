import React, { useState, useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
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

const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: styles.highlight,
      primary: styles.actionColor,
    },
    spacing: {
      baseUnit: 2,
    },
  });

const customStyles = ({
    control: (selectStyles, { isFocused }) => ({
      ...selectStyles,
      background: "white",
      width: "100% !important",
      padding: "0.35em 0.35em",
      fontSize: '70%',
      borderColor: styles.neutralMid,
      borderRadius: '3px',
      margin: '1.0em 0',

      ...selectStyles.control,
    }),
    option: (selectStyles) => ({
      ...selectStyles,
      fontSize: '70%',
      color: styles.neutralDark,
      padding: "0.35em 0.35em",
      ...selectStyles.option,
    })
  });

  return (
    <AsyncCreatableSelect
      cacheOptions
      isClearable
      isMulti
      defaultOptions={defaultOptions}
      loadOptions={promiseOptions}
      onChange={handleSelectChange}
      placeholder="Add Tags..."
      styles={customStyles}
      theme={customTheme}
    />
  );

}

export default TagSelect;
