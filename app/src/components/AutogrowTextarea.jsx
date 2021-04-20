import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import FormControl from 'react-bootstrap/FormControl';

// Autogrow textarea component for writing posts and comments
export default function AutogrowTextarea({ message, bgColor, register, defaultValue }) {
  const textAreaRef = useRef();
  useEffect(() => {
    textAreaRef.current.style.height = '1px';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  });

  function handleChange() {
    textAreaRef.current.style.height = '1px';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  return (
    <FormControl
      as="textarea"
      name="textarea"
      rows={1}
      defaultValue={defaultValue}
      ref={(e) => {
        register(e, {
          required: true,
          pattern: {
            value: /.*\S.*/,
            message: 'Invalid pattern',
          },
        });
        textAreaRef.current = e;
      }}
      placeholder={message}
      className={`post-form__input mr-sm-2 bg-${bgColor} border-0 rounded-4`}
      onChange={handleChange}
    />
  );
}

AutogrowTextarea.defaultProps = {
  message: 'Here goes a placeholder',
  bgColor: 'transparent',
  defaultValue: '',
};

AutogrowTextarea.propTypes = {
  message: PropTypes.string,
  bgColor: PropTypes.string,
  defaultValue: PropTypes.string,
  register: PropTypes.func.isRequired,
};
