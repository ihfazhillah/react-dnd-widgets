import React from 'react'


export default class ItemAvailable extends React.Component {
  render(){
    return (
      <div className="card card-inverse card-success mb-3 text-center">
        <div className="card-block">
          <h3 className="card-title">{ this.props.title }</h3>
        </div>
      </div>
    )
  }
}
