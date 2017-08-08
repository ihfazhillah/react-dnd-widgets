import React from 'react';
import _ from 'lodash';
import ItemAvailable from './ItemAvailable';
import AreaAvailable from './AreaAvailable';
import ItemWithForm from './ItemWithForm';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


const itemAvailables = [
  {
    id: 1,
    title: 'Search Box'
  },
  {
    id: 2,
    title: 'Archive'
  },
  {
    id: 3,
    title: 'Custom HTML'
  }
]


class Container extends React.Component {
  constructor(props){
    super(props)

    this.addToWidgetArea = this.addToWidgetArea.bind(this);
    this.moveItem = this.moveItem.bind(this);

    this.state = {
      lastItemIndex: 3,
      itemAvailables: [],
      widgetAreas: [
        {
          id: 'sidebar',
          items: [
            {
              id: '1-sidebar',
              title: 'Search Box'
            },
            {
              id: '2-sidebar',
              title: 'Archives'
            }
          ]
        },
      ]
    }
  }

  componentWillMount(){
    this.setState({itemAvailables: itemAvailables})
  }

  moveItem(waId, itemA, itemB){
    this.setState(prevState => {
      let was = _.cloneDeep(prevState.widgetAreas);
      was = _.forEach(was, (wa, index) => {
        if (wa.id === waId) {
          let item = wa.items[itemA]
          wa.items.splice(itemA, 1)
          wa.items.splice(itemB, 0, item)
        }
      });

      return {widgetAreas: was}
    })
  }

  addToWidgetArea(id, item){
    this.setState(prevState => {
      let was;

      was = prevState.widgetAreas;
      was = _.forEach(was, (wa, index)=>{
        if (wa.id === id){
          wa.items.splice(wa.items.length, 0, {id: prevState.lastItemIndex+ '-' + id, title:item.title})
        }
      })

      return {widgetAreas: was, lastItemIndex: prevState.lastItemIndex+1}
    });
  }

  render(){
    let widgetAreas = this.state.widgetAreas;
    let itemAvailables = this.state.itemAvailables;
    let me = this;
    return (
        <div className="row">
          <div className="col-md-4">
            {
              _.map(widgetAreas, widget => (
                <AreaAvailable name={widget.id} id={widget.id}>
                  {
                    _.map(widget.items, (item, index) => (
                  <ItemWithForm item={item} key={index} waId={widget.id} moveItem={me.moveItem} index={index}/>
                  ))
                  }
                </AreaAvailable>
              ))
            }
          </div>

          <div className="col-md-4 push-md-4">
            <AreaAvailable title='Widget Availables'>
              {_.map(itemAvailables, (item, index) => (
                <ItemAvailable 
                  key={item.id} 
                  title={item.title}
                  addToWidgetArea={this.addToWidgetArea}
                />
              ))
              }
            </AreaAvailable>
          </div>
        </div>
    )

  }
}

Container = DragDropContext(HTML5Backend)(Container)
export default Container;
