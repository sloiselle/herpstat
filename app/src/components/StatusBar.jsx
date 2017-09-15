import React, { Component } from 'react';

export default class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeUntilRefresh: 0,
      refreshDelay: 10
    }
  }
  componentDidMount() {
    this.refreshInfo();
  }
  
  refreshInfo = () => {
    if (this.props.isConnected) {
      if (this.state.timeUntilRefresh > 1) {
        this.setState({timeUntilRefresh: this.state.timeUntilRefresh - 1})
      } else {
        this.props.getInfo();
        this.setState({timeUntilRefresh: this.state.refreshDelay});
      }
    }
    setTimeout(() => this.refreshInfo(), 1000);
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
            <p>Refresh in {this.state.timeUntilRefresh} {this.state.timeUntilRefresh !== 1 ? 'seconds' : 'second'}</p>
          </div>
        }
      </div>
    );
  }
}