import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import classNames from 'classnames';

const bounceDuration = 50;

export default class Block extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
  }

  state = {
    animationClasses: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== 0 && prevProps.value * 2 === this.props.value) {
      this.doBounce();
    }
  }

  doBounce = () => {
    this.setState({ animationClasses: ['bounce-on'] });
    setTimeout(() => {
      this.setState(pState => ({
        animationClasses: pState.animationClasses.filter(c => c !== 'bounce-on'),
      }));
    }, bounceDuration);
  }

  render() {
    const { value } = this.props;
    const { animationClasses } = this.state;
    return (
      <div className={classNames('block', [...animationClasses])}>
        {value}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const styles = css`
  .block {
    display: inline-block;
    border: 1px solid black;
    height: 24%;
    width: 24%;
    background-color: #CB7054;
    border-radius: 4px;
    text-align: center;
    font-size: 40px;
    transition: all ${bounceDuration}ms ease-out;
  }
  .block.bounce-on {
    transform: scale(1.3);
  }
  .move-up {
    transform: translateY(-300px);
  }
`;
