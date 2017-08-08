import React from 'react';
import Types from './ItemTypes';
import {DragSource} from 'react-dnd';


const collect = (connect, monitor) => ({
  connectDragToDom : connect.dragSource()
})

const dragSpec = {
  beginDrag(props, monitor, component){
    console.log(props)
    return {title: props.title}
  },

  endDrag(props, monitor, component){
    const {addToWidgetArea} = props
    const dropArea = monitor.getDropResult()
    const item = monitor.getItem()

    addToWidgetArea(dropArea.name, item)

  }
}


class ItemAvailable extends React.Component {
  render(){
    let {connectDragToDom} = this.props;
    return connectDragToDom(
      <div className="card card-inverse card-success mb-3 text-center">
        <div className="card-block">
          <h3 className="card-title">{ this.props.title }</h3>
        </div>
      </div>
    )
  }
}

ItemAvailable = DragSource(Types.ITEM, dragSpec, collect)(ItemAvailable)
export default ItemAvailable;
