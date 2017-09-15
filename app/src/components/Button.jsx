import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a href="#" className={this.props.extraClasses ? `rc-button ${this.props.extraClasses}` : "rc-button"} onClick={this.props.onClick}>
            {this.props.text}
        </a>
    );
  }
}