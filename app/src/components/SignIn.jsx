import React, { Component } from 'react';
import Button from './../components/Button.jsx';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const submitWiFiInfo = this.props.submitWiFiInfo;
    const handlePasswordChange = this.props.handlePasswordChange;
    const handleNetworkNameChange = this.props.handleNetworkNameChange;
    const handleSecurityOptionChange = this.props.handleSecurityOptionChange;
    const networkName = this.props.networkName;
    const securityOption = this.props.selectedOption;
    const password = this.props.password;

    return (
      <div className='signIn'>
        <header className='signIn-header'>
          <h3>Please Connect to WiFi</h3>
        </header>
        {this.props.showErrors &&
          <p className='signIn-error'>There was a problem connecting you to your network. Please check your settings and try again.</p>
        }
        <fieldset className='signIn-form'>
          <div className="signIn-form-group">
            <input
              placeholder="Network Name (SSID)"
              className="signIn-form-input"
              name="network_name"
              type="input"
              onChange={(e) => handleNetworkNameChange(e)}
            />
          </div>
          <div className="signIn-form-group">
            <select
              placeholder="Security"
              className="signIn-form-select"
              name="security"
              value={securityOption}
              onChange={(e) => handleSecurityOptionChange(e)}
            >
              <option value="None">None</option>
              <option value="WEP">WEP</option>
              <option value="WPA/WPA2 Personal">WPA/WPA2 Personal</option>
              <option value="WPA2 Personal">WPA2 Personal</option>
            </select>
          </div>
          {securityOption !== 'None' &&
            <div className="signIn-form-group">
              <input
                placeholder="Password"
                className="signIn-form-input"
                name="password"
                type="password"
                onChange={(e) => handlePasswordChange(e)}
                required
              />
            </div>
          }
          <div className="signIn-form-group">
            <Button text="Connect" onClick={submitWiFiInfo} />
          </div>
        </fieldset>
      </div>
    );
  }
}