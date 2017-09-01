import React, { Component } from 'react';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      herpStats: [
        {
          id: 1,
          temp: 70,
          humidity: 45.5,
          lighting: 100
        },
        {
          id: 2,
          temp: 55,
          humidity: 45.5,
          lighting: 100
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

  render() {
    return (
      <div className='stats'>
        <div className='stats-row-header'>
          <p className='stats-column'>ID</p>
          <p className='stats-column'>TEMP</p>
          <p className='stats-column'>HUMIDITY</p>
          <p className='stats-column'>LIGHTING</p>
        </div>
        {this.state.herpStats.map(stat => {
          return (
              <div className='stats-row' key={stat.id}>
                <p className='stats-column'>#{stat.id}</p>
                <p className='stats-column'>{stat.temp}</p>
                <p className='stats-column'>({stat.humidity})</p>
                <p className='stats-column'>{stat.lighting}%</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}