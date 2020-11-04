import React from 'react';
import PropTypes from 'prop-types';
import StyledText from './StyledText';
import './User.css';

const User = ({ name, avatar, score }) => {
  return (
    <div>
      <img src={avatar} className="avatar" alt="user avatar" />
      <StyledText fz={36} value={name} />
      <StyledText fz={24} value={score || '0'} />
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
  avatar: PropTypes.string,
};

export default User;
