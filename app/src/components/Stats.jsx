import React, { Component } from 'react';
import Button from './../components/Button.jsx';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemperatureInCelsius: false,
      herpStats: [
        {
          powerStatus: 'On',
          probeId: 1,
          currentTemp: 70,
          setTemp: 45.5,
          powerPercentage: 100
        },
        {
          powerStatus: 'Off',
          probeId: 2,
          currentTemp: 55,
          setTemp: 45.5,
          powerPercentage: 100
        },
      ]
    }
  }

  // componentDidMount() {
  //   axios.get(``).then(res => { // insert path to herpStats JSON here
  //     const stats = res.data.data.children.map(obj => obj.data);
  //     this.setState({ herpStats })
  //   }); 
  // }

  toggleCelsius = () => {
    this.setState({showTemperatureInCelsius: !this.state.showTemperatureInCelsius});
  }

  convertToCelsius = (temp) => ((temp - 32)/1.8); 

  render() {
    let tempSymbol = this.state.showTemperatureInCelsius ? '\xB0C' : '\xB0F';
    return (
      <div className='stats'>
        <div className='stats-row-header'>
          <div className='stats-column'></div> {/* This is a placeholder for the enable/disable button*/}
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>PROBE ID</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>CURRENT TEMP ({tempSymbol})</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>SET TEMP ({tempSymbol})</p>
          <p onClick={this.toggleCelsius} className='stats-column stats-column-header'>POWER %</p>
        </div>
        {this.state.herpStats.map(stat => {
          const currentTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.currentTemp) : stat.currentTemp;
          const setTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.setTemp) : stat.setTemp;
          return (
              <div className='stats-row' key={stat.probeId}>
                <div className='stats-column'>
                  <Button extraClasses={`stats-button-${stat.powerStatus}`} text={stat.powerStatus} />
                </div>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>#{stat.probeId}</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>{currentTemp.toFixed(1)}{tempSymbol}</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>({setTemp.toFixed(1)}{tempSymbol})</p>
                <p onClick={this.toggleCelsius} className='stats-column stats-column-copy'>{stat.powerPercentage}%</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}