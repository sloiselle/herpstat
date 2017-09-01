import React, { Component } from 'react';
import image from '../logo.png'

export default class Logo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className="logo-image" {...this.props} />
        <h1 className='logo-text'>herpstat admin</h1>
      </div>
    );
  }
}
Logo.propTypes = {
    src: React.PropTypes.string.isRequired
};
Logo.defaultProps = {
    src: image
};

