import React from 'react';


export default class AreaAvailable extends React.Component {
  render(){
    return (
      <div className="card text-center">
        <div className="card-header">
          Available Widgets
        </div>

        <div className="card-block">
          {this.props.children}
        </div>
      </div>
    )
  }
}
