import React from 'react';
import {findDOMNode} from 'react-dom';
import Types from './ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';
import _ from 'lodash';


const dragSource = {
  beginDrag(props, monitor, component){
    return {
      item: props.item,
      index: props.index
    }
  },
}

const dropTarget = {
  hover(props, monitor, component){
    let dragItem = monitor.getItem();
    let hoverItem = props;

    if (hoverItem.index === dragItem.index) {
      return
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragItem.index < hoverItem.index && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragItem.index > hoverItem.index && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem(props.waId, dragItem.index, hoverItem.index)

    monitor.getItem().index = hoverItem.index

  },
}


const collectDrag = (connect, monitor) => ({
  connectDragToDom: connect.dragSource()
});

const collectDrop = (connect, monitor) => ({
  connectDropToDom: connect.dropTarget()
});


class ItemWithForm extends React.Component {
  render(){
    let item = this.props.item
    return this.props.connectDropToDom(this.props.connectDragToDom(
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
    ))
  }
}

ItemWithForm = _.flow(
  DropTarget(Types.ITEMSIDEBAR, dropTarget, collectDrop),
  DragSource(Types.ITEMSIDEBAR, dragSource, collectDrag)
)(ItemWithForm)
export default ItemWithForm;
