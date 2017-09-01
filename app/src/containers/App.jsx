import React, { Component } from 'react';
import Logo from './../components/Logo.jsx'; //Component with props but no state
import SignIn from './../components/SignIn.jsx';
import StatusBar from './../components/StatusBar.jsx';
import Stats from './../components/Stats.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      networkName: null,
      securityOption: null,
      password: null,
      showErrors: false,
      timeUntilRefresh: 0,
      refreshDelay: 10
    }
  }

  componentDidMount() {
    this.getWifiInfo();
    this.refreshInfo();
  }

  submitWiFiInfo = () => {
    if (this.state.networkName === null || (this.state.securityOption !== 'None' && this.state.securityOption !== null && !this.state.password)) {
      this.setState({showErrors: true})
    } else {
      // TODO Insert POST here
      // On success, set this.state.isConnected: true
      this.setState({isConnected: true})
      // On fail, set this.state.showErrors: true
      console.log(`SSID: ${this.state.networkName} Security Option: ${this.state.securityOption} Password: ${this.state.password}`);
    }
  }

  getInfo = () => {
    console.log('Refreshing Herpstat...'); // TODO Get herpstat info
  }

  getWifiInfo = () => {
    console.log('Getting Wifi...'); // TODO Get wifi info
  }

  refreshInfo = () => {
    if (this.state.isConnected) {
      if (this.state.timeUntilRefresh > 1) {
        this.setState({timeUntilRefresh: this.state.timeUntilRefresh - 1})
      } else {
        this.getInfo();
        this.setState({timeUntilRefresh: this.state.refreshDelay});
      }
    }
    setTimeout(() => this.refreshInfo(), 1000);
  }

  handleNetworkNameChange = (e) => {
    this.setState({networkName: e.target.value, showErrors: false});
  }

  handleSecurityOptionChange = (e) => {
    this.setState({securityOption: e.target.value, showErrors: false})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value, showErrors: false})
  }

  render() {
    return (
      <div className="app-container">
        <StatusBar
          networkName={this.state.networkName}
          isConnected={this.state.isConnected}
          timeUntilRefresh={this.state.timeUntilRefresh}
        />
        {!this.state.isConnected &&
          <div style={{width: '100%'}}>
            <Logo />
            <SignIn
              showErrors={this.state.showErrors}
              submitWiFiInfo={this.submitWiFiInfo}
              handleNetworkNameChange={this.handleNetworkNameChange}
              handleSecurityOptionChange={this.handleSecurityOptionChange}
              handlePasswordChange={this.handlePasswordChange}
              selectedOption={this.state.securityOption}
            />
          </div>
        }
        {this.state.isConnected &&
          <Stats />
        }
      </div>
    );
    }
}