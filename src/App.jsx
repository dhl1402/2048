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
    };
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

  addBlock = (blockState) => {
    const isMoved = blockState.reduce((sum, row) => sum + row.filter(block => block.status === BLOCK_STATUS.UNTOUCHED).length, 0) < SIZE * SIZE;
    if (!isMoved) {
      return blockState;
    }
    return Controller.addBlock(blockState, 2);
  }

  moveUp = () => {
    const { blockState } = this.state;
    const newBlockState = this.addBlock(Controller.moveUp(blockState));
    this.setState({ blockState: newBlockState });
  }

  moveDown = () => {
    const { blockState } = this.state;
    const newBlockState = this.addBlock(Controller.moveDown(blockState));
    this.setState({ blockState: newBlockState });
  }

  moveLeft = () => {
    const { blockState } = this.state;
    const newBlockState = this.addBlock(Controller.moveLeft(blockState));
    this.setState({ blockState: newBlockState });
  }

  moveRight = () => {
    const { blockState } = this.state;
    const newBlockState = this.addBlock(Controller.moveRight(blockState));
    this.setState({ blockState: newBlockState });
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

  // TODO: save state, score, highscore, reset game, gameover, win & replay

  render() {
    return (
      <div className="app">
        <button onClick={this.resetBlockValues}>RESET</button>
        <div className="board">
          {this.renderBlocks()}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

// TODO: Responsive
const styles = css`
  .app {
    background-color: #FAF8F0;
    height: 100%;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  }
  .board {
    margin: 0 auto;    
    padding: 5px;
    width: 400px; 
    height: 400px;
    background-color: #BBADA2;
    border-radius: 4px;
  }
`;

export default App;
