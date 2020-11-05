import React from 'react';
import PropTypes from 'prop-types';
import './StyledButton.css';

const StyledButton = ({ title, onClick }) => {
  return (
    <button className="styled-button" onClick={onClick}>
      {title}
    </button>
  );
};

StyledButton.propTypes = {
  title: PropTypes.string,
};

export default StyledButton;
