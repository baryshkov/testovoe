import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

const Timer = ({ countDown, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(countDown);
  const getWidth = () => {
    return `${(timeLeft / countDown) * 100}vw`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft === 0) {
        clearTimeout(timer);
        onFinish();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="container">
      <div className="countdown">
        <div className="progress-bar" style={{ width: getWidth() }} >
          <div className="counter">{`${timeLeft} секунд`}</div>
        </div>
      </div>
    </div>
  );
};

Timer.propTypes = {
  countDown: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default Timer;
