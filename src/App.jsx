import React, { Component } from 'react';
import css from 'styled-jsx/css';

import Block from './Block';

import { SIZE, STARTING_BLOCK, INIT_VALUES } from './constants';
import { getRandomInt, getDistinctRandomInt } from './utils';
import Controller from './Controller';

class App extends Component {
  constructor(props) {
    super(props);
    this.testValues = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.state = {
      blockState: this.initGame(),
    };
    // this.logData();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = ({ keyCode }) => {
    switch (keyCode) {
      case 38: this.moveUp(); break;
      case 37: this.moveLeft(); break;
      case 39: this.moveRight(); break;
      case 40: this.moveDown(); break;
      default: break;
    }
  }

  initGame = () => {
    const blockState = [];
    const randomIndex = getDistinctRandomInt(SIZE * SIZE, STARTING_BLOCK);
    for (let i = 0; i < SIZE; i++) {
      blockState[i] = [];
      for (let j = 0; j < SIZE; j++) {
        const currIndex = (i * SIZE) + j;
        if (randomIndex.indexOf(currIndex) !== -1) {
          blockState[i][j] = INIT_VALUES[getRandomInt(INIT_VALUES.length)];
        } else {
          blockState[i][j] = 0;
        }
      }
    }
    return blockState;
  }

  logData = () => {
    const { blockState } = this.state;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        console.log(blockState[i][j]);
      }
      console.log('\n');
    }
  }

  resetBlockValues = () => {
    this.setState({ blockState: this.testValues });
  }

  renderBlocks = () => {
    const { blockState } = this.state;
    const blocks = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        blocks.push(<Block value={blockState[i][j]} />);
      }
    }
    return blocks;
  }

  moveUp = () => {
    const { blockState } = this.state;
    let newBlockState = Controller.moveUp(blockState);
    newBlockState = Controller.addBlock(newBlockState, 2);
    this.setState({ blockState: newBlockState });
  }

  moveDown = () => {
    const { blockState } = this.state;
    let newBlockState = Controller.moveDown(blockState);
    newBlockState = Controller.addBlock(newBlockState, 2);
    this.setState({ blockState: newBlockState });
  }

  moveLeft = () => {
    const { blockState } = this.state;
    let newBlockState = Controller.moveLeft(blockState);
    newBlockState = Controller.addBlock(newBlockState, 2);
    this.setState({ blockState: newBlockState });
  }

  moveRight = () => {
    const { blockState } = this.state;
    let newBlockState = Controller.moveRight(blockState);
    newBlockState = Controller.addBlock(newBlockState, 2);
    this.setState({ blockState: newBlockState });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBlockValues}>RESET</button>
        <div className="board">
          {this.renderBlocks()}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const styles = css`
  .board {
    border: 1px solid black;
    width: 400px; 
    height: 400px;
  }
`;

export default App;
