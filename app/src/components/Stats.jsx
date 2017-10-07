import React, { Component } from 'react';
import axios from 'axios';
import Button from './../components/Button.jsx';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemperatureInCelsius: false,
    }
  }

  toggleCelsius = () => {
    this.setState({showTemperatureInCelsius: !this.state.showTemperatureInCelsius});
  }

  convertToCelsius = (temp) => ((temp - 32)/1.8); 

  render() {
    let tempSymbol = this.state.showTemperatureInCelsius ? '\xB0C' : '\xB0F';
    return (
      <div className='stats'>
        <div className='stats-row-header'>
          <div className='stats-column'></div>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>PROBE ID</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>TEMP HI/LO({tempSymbol})</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>SET TEMP({tempSymbol})</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>POWER %</p>
        </div>
        {this.props.herpStats.map(stat => {
          const maxTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.max_value) : stat.max_value;
          const minTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.min_value) : stat.min_value;
          const setTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.set_temp) : stat.set_temp;
          return (
              <div className='stats-row' key={stat.id}>
                <div className='stats-column'>
                  <Button 
                    onClick={(e) => this.props.togglePower(stat.id, stat.power_status)}
                    extraClasses={this.props.circuitBreakerOn ? `stats-button-${stat.power_status}` : 'stats-button-Off'}
                    text={this.props.circuitBreakerOn ? stat.power_status : "Off"}
                  />
                </div>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>#{stat.id}</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>{maxTemp.toFixed(1)} / {minTemp.toFixed(1)}{tempSymbol}</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>({setTemp.toFixed(1)}{tempSymbol})</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>{stat.power_percentage}%</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

Stats.defaultProps = {
  herpStats: [],
  circuitBreakerOn: true
}