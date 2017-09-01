import React, { Component } from 'react';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemperatureInCelsius: false,
      herpStats: [
        {
          probeId: 1,
          currentTemp: 70,
          setTemp: 45.5,
          powerPercentage: 100
        },
        {
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

  convertToCelsius = (temp) => ((temp - 32)/1.8).toFixed(2); 

  render() {
    let tempSymbol = this.state.showTemperatureInCelsius ? '\xB0C' : '\xB0F';
    return (
      <div className='stats' onClick={this.toggleCelsius}>
        <div className='stats-row-header'>
          <p className='stats-column'>PROBE ID</p>
          <p className='stats-column'>CURRENT TEMP({tempSymbol})</p>
          <p className='stats-column'>SET TEMP({tempSymbol})</p>
          <p className='stats-column'>POWER%</p>
        </div>
        {this.state.herpStats.map(stat => {
          const currentTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.currentTemp) : stat.currentTemp;
          const setTemp = this.state.showTemperatureInCelsius ? this.convertToCelsius(stat.setTemp) : stat.setTemp;
          return (
              <div className='stats-row' key={stat.probeId}>
                <p className='stats-column'>#{stat.probeId}</p>
                <p className='stats-column'>{currentTemp}{tempSymbol}</p>
                <p className='stats-column'>({setTemp}{tempSymbol})</p>
                <p className='stats-column'>{stat.powerPercentage}%</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}