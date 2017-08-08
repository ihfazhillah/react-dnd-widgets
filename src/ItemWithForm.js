import React from 'react';

export default class ItemWithForm extends React.Component {
  render(){
    let item = this.props.item
    return (
      <div className="card">
        <div className="card-header">
          {item.title}
          <button className="btn btn-md" data-toggle="collapse" data-target={"#" + item.id} aria-expanded="false" aria-controls={"#" + item.id}>+</button>
        </div>


        <div className="collapse" id={item.id}>
        <div className="card-block text-left">
          <div className="form-group">
            <label htmlFor="label">Label</label>
            <input type="text" className="form-control" id="label" placeholder="Widget Label"/>
            <small id="labelHelp" className="form-text text-muted">Enter the widget Label</small>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
