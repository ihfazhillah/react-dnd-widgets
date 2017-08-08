import React from 'react';
import Types from './ItemTypes'
import { DropTarget } from 'react-dnd';


const dropTarget = {
  drop(props, monitor, component){
    return {name: props.name}
  },
}


const collect = (connect, monitor) => ({
  connectDropToDom: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});


class AreaAvailable extends React.Component {
  render(){
    return this.props.connectDropToDom(
      <div className="card text-center">
        <div className="card-header">
          {this.props.name}
        </div>

        <div className="card-block">
          {this.props.children}
        </div>
      </div>
    )
  }
}

AreaAvailable = DropTarget(Types.ITEM, dropTarget, collect)(AreaAvailable);
export default AreaAvailable
