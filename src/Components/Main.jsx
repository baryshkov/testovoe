import React, { useState } from 'react';
import PropTypes from 'prop-types';
import User from './User';
import StyledText from './StyledText';
import Answers from './Answers';
import StyledButton from './StyledButton';
import { QuizService } from '../services/QuizService';
import Timer from './Timer';
import './Main.css';
import bridge from '@vkontakte/vk-bridge';

const MODES = {
  start: 1,
  active: 2,
  result: 3,
};
const COUNTDOWN = 30;
const NUMBER_OF_OPTIONS = 4;
const MIN_MAX = 999999;

// 31/10/20 16:20 - 18:20
// 1/11/20 10:00 - 13:20
// 1/11/20 15:20 - 16:13
// 1/11/20 16:40 - 17:33
// 2/11/20 22:30 - 23:17
// 4/11/20 15:51 - 16:40
const Main = ({ fetchedUser }) => {
  console.log(11111);
  const quizService = new QuizService(NUMBER_OF_OPTIONS, MIN_MAX);

  const [score, setScore] = useState(0);
  const [mode, setMode] = useState(MODES.start);
  const [quiz, setQuiz] = useState(quizService.newQuiz());

  let highScore = fetchedUser?.highscore;

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }
    setQuiz(quizService.newQuiz());
  }

  function restart() {
    setScore(0);
    setQuiz(quizService.newQuiz());
    setMode(MODES.active);
  }

  function share() {
    bridge.send('VKWebAppShowWallPostBox', {
      message: `Я набрал ${score} баллов!`,
      attachment: 'https://vk.com/app7646627_184922847',
    });
  }

  function setHighscore() {
    if (score > highScore) {
      bridge.send('VKWebAppCallAPIMethod', {
        method: 'storage.set',
        request_id: '32test',
        params: {
          v: '5.124',
          key: 'testQuizAppScore',
          value: score,
          access_token: fetchedUser?.token?.access_token,
        },
      });
    }
  }

  return (
    <main className="main">
      {mode === MODES.start && (
        <>
          <User
            avatar={
              fetchedUser?.photo_200 ||
              'https://lastfm.freetls.fastly.net/i/u/avatar170s/050f9e8b1b2f4fc3cf0c6d1a9e46350d.webp'
            }
            score={highScore}
            name={fetchedUser?.first_name || 'Default'}
          />
          <StyledButton
            title="играть"
            onClick={() => {
              setMode(MODES.active);
            }}
          />
        </>
      )}
      {mode === MODES.active && (
        <>
          <div>
            <StyledText value="Реши Пример" mode="alternative" />
            <div className="equation">{quiz.question}</div>
          </div>

          <div>
            <Answers quiz={quiz} onAnswer={(isCorrect) => handleAnswer(isCorrect)} />
          </div>

          <Timer
            className='timer'
            countDown={COUNTDOWN}
            onFinish={() => {
              setHighscore(score);
              setMode(MODES.result);
            }}
          />
        </>
      )}
      {mode === MODES.result && (
        <>
          <User
            avatar={
              fetchedUser?.photo_200
            }
            score={score}
            name={fetchedUser?.first_name || 'Default'}
          />
          <div className="retry" onClick={() => restart()}>
            <div className="retry-button-before" />
            <button className="retry-button">Еще раз</button>
            <div className="retry-button-after" />
          </div>
          <StyledButton title="Поделиться результатом" onClick={() => share()} />
        </>
      )}
    </main>
  );
};

Main.propTypes = {
  fetchedUser: PropTypes.object.isRequired,
};

export default Main;
