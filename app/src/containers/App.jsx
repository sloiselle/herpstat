import React, { Component } from 'react';
import Logo from './../components/Logo.jsx'; //Component with props but no state
import SignIn from './../components/SignIn.jsx';
import StatusBar from './../components/StatusBar.jsx';
import Stats from './../components/Stats.jsx';
import Button from './../components/Button.jsx';
import axios from 'axios';

const apiHost = 'http://localhost:3004'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      networkName: null,
      securityOption: null,
      password: null,
      cloudAuthToken: null,
      showErrors: false,
      herpstats: [],
      circuitBreakerOn: false,
      showAreYouSureWiFiButton: false,
      showAreYouSureToggleButton: false
    }
  }

  componentDidMount() {
    this.getWifiInfo();
    this.getInfo();
  }

  togglePower = (id, powerStatus) => {
    const newPowerStatus = powerStatus === "On" ? "Off" : "On";
    const path = `${apiHost}/herpstats/${id}`;
    axios.patch(path, {
      power_status: newPowerStatus
    }).then(
    res => {
      this.getInfo();
    }).catch(
    error => {
      console.error(`There was an error with your request: ${error}`)
    });
  }

  submitWiFiInfo = () => {
    if (this.state.networkName === null || this.state.cloudAuthToken === null || (this.state.securityOption !== 'None' && this.state.securityOption !== null && !this.state.password)) {
      this.setState({showErrors: true})
    } else {
      axios.post(`${apiHost}/wifi`, {
        network_name: this.state.networkName,
        security_option: this.state.securityOption,
        password: this.state.password,
        cloud_auth_token: this.state.cloudAuthToken
      }).then(
      res => {
        this.setState({isConnected: true});
        this.getInfo();
      }).catch(
      error => {
        this.setState({showErrors: true})
      });
    }
  }

  resetWifiInfo = () => {
    this.setState({
      isConnected: false,
      networkName: null,
      securityOption: null,
      password: null,
      cloudAuthToken: null,
      showAreYouSureWiFiButton: false
    })
  }

  toggleCircuitBreaker = () => {
    axios.patch(`${apiHost}/circuitBreaker`, {
        enabled: !this.state.circuitBreakerOn
      }).then(
      res => {
        this.getInfo();
        this.setState({showAreYouSureToggleButton: false})
      }).catch(
      error => {
        console.error(`There was an error with your request: ${error}`);
      });
  }

  getInfo = () => {
    if (this.state.isConnected) {
      console.log('Refreshing Herpstat...');
      axios.get(`${apiHost}/circuitBreaker`).then(
        res => {
          const circuitBreakerOn = res.data.enabled;
          this.setState({circuitBreakerOn})
        }
      )
      axios.get(`${apiHost}/herpstats`).then(
        res => {
          const herpstats = res.data;
          this.setState({herpstats});
        }
      )
    }
  }

  getWifiInfo = () => {
    console.log('Getting Wifi...');
    axios.get(`${apiHost}/wifi`).then(
      res => {
        const wifiSettings = res.data;
        if (wifiSettings.network_name !== null && wifiSettings.cloud_auth_token !== null) {
          this.setState({
            isConnected: true,
            networkName: wifiSettings.network_name,
            password: wifiSettings.password,
            securityOption: wifiSettings.security_option,
            cloudAuthToken: wifiSettings.cloudAuthToken
          })
        }
      }
    );
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

  handleCloudAuthTokenChange = (e) => {
    this.setState({cloudAuthToken: e.target.value, showErrors: false})
  }

  showAreYouSureWiFiButton = () => {
    this.setState({showAreYouSureWiFiButton: true});
    setTimeout(() => this.setState({showAreYouSureWiFiButton: false}), 3000);
  }

  showAreYouSureToggleButton = () => {
    this.setState({showAreYouSureToggleButton: true});
    setTimeout(() => this.setState({showAreYouSureToggleButton: false}), 3000);
  }

  render() {
    return (
      <div className="app-container">
        <StatusBar
          networkName={this.state.networkName}
          isConnected={this.state.isConnected}
          timeUntilRefresh={this.state.timeUntilRefresh}
          isConnected={this.state.isConnected}
          getInfo={this.getInfo}
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
              handleCloudAuthTokenChange={this.handleCloudAuthTokenChange}
              selectedOption={this.state.securityOption}
            />
          </div>
        }
        {this.state.isConnected &&
          <div className="app-container-stats-wrapper">
            <Stats apiHost={apiHost} togglePower={this.togglePower} circuitBreakerOn={this.state.circuitBreakerOn} herpStats={this.state.herpstats}/>
            {this.state.showAreYouSureWiFiButton &&
              <Button
                extraClasses="fullWidth app-container-resetWifiButton"
                text="Are you sure you want to reset your WiFi settings?"
                onClick={this.resetWifiInfo}
              />
            }
            {this.state.showAreYouSureToggleButton &&
              <Button 
                extraClasses={`fullWidth app-container-killswitch stats-button-${!this.state.circuitBreakerOn ? "On" : "Off"}`}
                text={`Would you like to turn all probes ${!this.state.circuitBreakerOn ? 'on' : 'off'}?`}
                onClick={this.toggleCircuitBreaker}
              />
            }
            {!this.state.showAreYouSureToggleButton && !this.state.showAreYouSureWiFiButton &&
              <div className='app-container-buttonWrapper'>
                <Button
                  extraClasses="app-container-resetWifiButton"
                  text="Reset WiFi Settings"
                  onClick={this.showAreYouSureWiFiButton}
                />
                <Button 
                  extraClasses={`app-container-killswitch stats-button-${this.state.circuitBreakerOn ? "On" : "Off"}`}
                  text={`All ${this.state.circuitBreakerOn ? 'On' : 'Off'}`}
                  onClick={this.showAreYouSureToggleButton}
                />
              </div>
            }
          </div>
        }
      </div>
    );
    }
}