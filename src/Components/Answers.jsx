import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Answers.css';

const Answers = ({ quiz, onAnswer }) => {
  const [answered, setAnswered] = useState(null);

  function getClassName(option) {
    if (!!answered && option === quiz.answer) {
      return 'answer answer-correct';
    }
    if (!!answered && option !== quiz.answer && option === answered) {
      return 'answer answer-incorrect';
    }
    return 'answer';
  }

  return (
    <div className="answers">
      {quiz.options.map((option) => (
        <button
          key={option}
          className={getClassName(option)}
          disabled={answered !== null}
          onClick={() => {
            setAnswered(option);
            setTimeout(() => {
              setAnswered(null);
              onAnswer(option === quiz.answer);
            }, 1000);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

Answers.propTypes = {
  quiz: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Answers;
