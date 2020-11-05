import React from 'react';
import PropTypes from 'prop-types';
import './StyledText.css';


const StyledText = ({ value, mode, fz }) => {
  return <h3 className={`${mode ? mode : 'styled-text'}`} style={{'fontSize': fz}}>{value}</h3>;
};

StyledText.propTypes = {
  value: PropTypes.string.isRequired,
};

export default StyledText;
