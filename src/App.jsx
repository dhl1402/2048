import React, { Component } from 'react';
import css from 'styled-jsx/css';

import Block from './Block';

import { SIZE, BLOCK_STATUS } from './constants';
import Controller from './Controller';

class App extends Component {
  constructor(props) {
    super(props);
    this.testValues = [
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
      [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
    ];
    this.state = {
      blockState: Controller.initGame(),
      score: 0,
      status: '',
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    const { blockState, score, status } = this.state;
    if (event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
      return;
    }
    if (status === 'win') {
      // dont allow to move blocks when displaying overlay
      return;
    }

    event.preventDefault();
    let newBlockState = null;
    switch (event.keyCode) {
      case 38: newBlockState = Controller.moveUp(blockState); break;
      case 37: newBlockState = Controller.moveLeft(blockState); break;
      case 39: newBlockState = Controller.moveRight(blockState); break;
      case 40: newBlockState = Controller.moveDown(blockState); break;
      default: break;
    }

    // check move and add new block
    newBlockState = this.addNewBlock(newBlockState);
    // calc score
    const newScore = this.calcScore(newBlockState, score);
    // update status
    const newStatus = this.updateStatus(newBlockState, status);

    this.setState({ blockState: newBlockState, score: newScore, status: newStatus });
  }

  addNewBlock = (blockState) => {
    const isMoved = blockState.reduce((sum, row) => sum + row.filter(block => block.status === BLOCK_STATUS.UNTOUCHED).length, 0) < SIZE * SIZE;
    if (!isMoved) {
      return blockState;
    }
    return Controller.addBlock(blockState, 2);
  }

  calcScore = (blockState, currentScore) => {
    const newScore = blockState.reduce((score, row) => score + row.reduce((rowSum, block) => {
      return block.status === BLOCK_STATUS.MERGED ? rowSum + block.value : rowSum;
    }, 0), currentScore);
    return newScore;
  }

  updateStatus = (blockState, currentStatus) => {
    if (currentStatus === 'keep-playing') {
      return currentStatus;
    }
    let isWin = false;
    blockState.forEach(row => row.forEach((block) => {
      if (block.value === 2048) {
        isWin = true;
      }
    }));
    return isWin ? 'win' : '';
  }

  resetGame = () => {
    this.setState({
      blockState: Controller.initGame(),
      score: 0,
      status: '',
    });
  }

  renderBlocks = () => {
    const { blockState } = this.state;
    const blocks = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        blocks.push(<Block key={(i * SIZE) + j} block={blockState[i][j]} />);
      }
    }
    return blocks;
  }

  renderOverlay = () => {
    const { status } = this.state;
    return (
      <div className="overlay">
        <h1 className="game-message">{status === 'win' ? 'You win!' : 'Game over!'}</h1>
        <div>
          <button className="btn" onClick={this.resetGame}>Try again</button>
          {status === 'win' && <button className="btn" onClick={() => this.setState({ status: 'keep-playing' })}>Keep playing</button>}
        </div>
        <style jsx>{overlayStyle}</style>
      </div>
    );
  }

  // TODO: save state, highscore, gameover

  render() {
    const { score, status } = this.state;
    return (
      <div className="app">
        <div className="header">
          <h1 className="title">2048</h1>
          <div className="scores">
            <div className="score">
              <div className="score-title">SCORE</div>
              <div className="score-value">{score}</div>
            </div>
            <div className="score">
              <div className="score-title">BEST</div>
              <div className="score-value">312312316</div>
            </div>
          </div>
        </div>
        <div className="meta">
          <div>Join the numbers and get to the <strong>2048 tile!</strong></div>
          <button className="restart-btn" onClick={this.resetGame}>New Game</button>
        </div>
        <div className="board">
          {this.renderBlocks()}
          {(status === 'win' || status === 'gameover') && this.renderOverlay()}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

// TODO: Responsive
const styles = css`
  .app {
    width: 500px;
    margin: 0 auto;
    padding: 50px 0;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  }
  .header {
    display: flex;
  }
  .title {
    font-size: 80px;
    font-weight: bold;
    color: #766E65;
    margin: 0;
  }
  .scores {
    flex: 1;
    text-align: right;
    margin-top: 10px;
  }
  .score {
    display: inline-block;
    background-color: #BBADA2;
    border-radius: 3px;
    padding: 6px 26px;
    text-align: center;
    margin-left: 5px;
  }
  .score-title {
    font-size: 13px;
    color: #EEE4DC;
    font-weight: bold;
  }
  .score-value {
    font-size: 25px;
    color: #FFFFFF;
    font-weight: bold;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 40px 0;
    color: #7B736A;
    font-size: 18px;
  }
  .restart-btn {
    background-color: #8D7968;
    color: #FFF;
    padding: 0 20px;
    font-size: 18px;
    line-height: 42px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
  }
  .board {
    padding: 5px;
    width: 500px; 
    height: 500px;
    background-color: #BBADA2;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
  }
`;

const overlayStyle = css`
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(238, 228, 218, 0.73);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .game-message {
    color: #766E65;
    font-size: 60px;
    margin: 0;
    margin-bottom: 10px
  }
  .btn {
    background-color: #8D7968;
    color: #FFF;
    padding: 0 20px;
    font-size: 18px;
    line-height: 42px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    margin: 0 5px;
  }
`;

export default App;
