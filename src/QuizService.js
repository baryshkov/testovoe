export class QuizService {
  constructor(numberOfOptions, minMax) {
    this.numberOfOptions = numberOfOptions;
    this.minMax = minMax;
  }

  _getOperands(length = 2) {
    const generateNumber = () => Math.floor(Math.random() * this.minMax);
    const operands = [];
    for (let i = 0; i < length; i++) {
      operands.push(generateNumber());
    }
    return operands;
  }

  _getSign() {
    const signs = ['+', '-', '*', '/'];
    return signs[Math.floor(Math.random() * 4)];
  }

  _getAnswer(leftOperand, rightOperand, sign) {
    switch (sign) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '/':
        return leftOperand / rightOperand;
    }
  }

  _randomSort() {
    const random = Math.floor(Math.random() * 2);
    if (random) {
      return 1;
    } else {
      return -1;
    }
  }

  newQuiz() {
    const [leftOperand, rightOperand] = this._getOperands();
    const sign = this._getSign();
    const answer = this._getAnswer(leftOperand, rightOperand, sign);

    const quiz = {
      question: `${leftOperand} ${sign} ${rightOperand}`,
      answer,
      options: [answer, ...this._getOperands(3)].sort(this._randomSort),
    }

    return quiz;
  }
}
