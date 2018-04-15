import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SIZE, BLOCK_STATUS, BLOCK_COLOR } from './constants';

const { NEW, MERGED, MOVED } = BLOCK_STATUS;
const animDuration = 100;

// TODO: Split animation css to another file

export default class Block extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
  }

  computeAnimClass = () => {
    const { block } = this.props;
    const animClass = [];
    switch (block.status) {
      case MERGED: animClass.push(`merge-${block.meta.direction}`); break;
      case NEW: animClass.push('new'); break;
      case MOVED: animClass.push(`move-${block.meta.direction}`); break;
      default: break;
    }
    return animClass;
  }

  render() {
    const { block } = this.props;
    const { distance } = block.meta || {};
    const animClass = this.computeAnimClass();

    return (
      <div className="block">
        <div className="block-placeholder">
          <div className={classNames('block-content', [...animClass])} style={{ ...BLOCK_COLOR[block.value] }}>
            {block.value || ''}
          </div>
        </div>
        <style jsx>{`
          .block {
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            padding: 5px;
            height: ${100 / SIZE}%;
            width:  ${100 / SIZE}%;
          }
          .block-placeholder {
            height: 100%;
            width: 100%;
            background-color: #C8BCB3;
            border-radius: 4px;            
          }
          .block-content { 
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            border-radius: 4px;
            font-size: 40px;    
            color: #797068;
            font-weight: bold;
          }
      `}</style>
        <style jsx>{`
          .block-content.new {
            animation: add-block-anim ${animDuration}ms ease-out;
          }
          .block-content.merge-up {
            animation: merge-up-anim ${animDuration}ms ease-out;
          }
          .block-content.merge-down {
            animation: merge-down-anim ${animDuration}ms ease-out;
          }
          .block-content.merge-right {
            animation: merge-right-anim ${animDuration}ms ease-out;
          }
          .block-content.merge-left {
            animation: merge-left-anim ${animDuration}ms ease-out;
          }
          .block-content.move-up {
            animation: move-up-anim ${animDuration}ms ease-out;
          }
          .block-content.move-down {
            animation: move-down-anim ${animDuration}ms ease-out;
          }
          .block-content.move-right {
            animation: move-right-anim ${animDuration}ms ease-out;
          }
          .block-content.move-left {
            animation: move-left-anim ${animDuration}ms ease-out;
          }
          @keyframes add-block-anim {
            from {transform: scale(0);}
            to {transform: scale(1);}
          }
          @keyframes merge-up-anim {
            0% {transform: scale(1) translateY(${distance * 100}%);}
            50% {transform: scale(1.2);}
            100% {transform: scale(1) translateY(0);}
          }
          @keyframes merge-down-anim {
            0% {transform: scale(1) translateY(-${distance * 100}%);}
            50% {transform: scale(1.2);}
            100% {transform: scale(1) translateY(0);}
          }
          @keyframes merge-right-anim {
            0% {transform: scale(1) translateX(${-distance * 100}%);}
            50% {transform: scale(1.2);}
            100% {transform: scale(1) translateX(0);}
          }
          @keyframes merge-left-anim {
            0% {transform: scale(1) translateX(${distance * 100}%);}
            50% {transform: scale(1.2);}
            100% {transform: scale(1) translateX(0);}
          }
          @keyframes move-up-anim {
            from {transform: translateY(${distance * 100}%)}
            to {transform: translateY(0)}
          }
          @keyframes move-down-anim {
            from {transform: translateY(-${distance * 100}%)}
            to {transform: translateY(0)}
          }
          @keyframes move-right-anim {
            from {transform: translateX(-${distance * 100}%)}
            to {transform: translateX(0)}
          }
          @keyframes move-left-anim {
            from {transform: translateX(${distance * 100}%)}
            to {transform: translateX(0)}
          }
      `}</style>
      </div>
    );
  }
}
