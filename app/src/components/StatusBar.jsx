import React, { Component } from 'react';

export default class StatusBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.isConnected === false &&
          <div className='statusBar'>
            <p>Status: Disconnected</p>
          </div>
        }
        {this.props.isConnected === true &&
          <div className='statusBar'>
            <p>Status: Connected to {this.props.networkName}</p>
            <p>Refresh in {this.props.timeUntilRefresh} {this.props.timeUntilRefresh !== 1 ? 'seconds' : 'second'}</p>
          </div>
        }
      </div>
    );
  }
}