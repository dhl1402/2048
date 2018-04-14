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
      [8, 0, 0, 0],
    ];
    this.state = {
      blockValues: this.initGame(),
    };
    // this.logData();
  }

  initGame = () => {
    const blockValues = [];
    const randomIndex = getDistinctRandomInt(SIZE * SIZE, STARTING_BLOCK);
    for (let i = 0; i < SIZE; i++) {
      blockValues[i] = [];
      for (let j = 0; j < SIZE; j++) {
        const currIndex = (i * SIZE) + j;
        if (randomIndex.indexOf(currIndex) !== -1) {
          blockValues[i][j] = INIT_VALUES[getRandomInt(INIT_VALUES.length)];
        } else {
          blockValues[i][j] = 0;
        }
      }
    }
    return blockValues;
  }

  logData = () => {
    const { blockValues } = this.state;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        console.log(blockValues[i][j]);
      }
      console.log('\n');
    }
  }

  resetBlockValues = () => {
    this.setState({ blockValues: this.testValues });
  }

  renderBlocks = () => {
    const { blockValues } = this.state;
    const blocks = [];
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        blocks.push(<Block value={blockValues[i][j]} />);
      }
    }
    return blocks;
  }

  moveUp = () => {
    const { blockValues } = this.state;
    this.setState({ blockValues: Controller.moveUp(blockValues) });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.moveUp}>^</button>
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
