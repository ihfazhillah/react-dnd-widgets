import React from 'react';
import _ from 'lodash';
import ItemAvailable from './ItemAvailable';
import AreaAvailable from './AreaAvailable';
import ItemWithForm from './ItemWithForm';

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


export default class Container extends React.Component {
  constructor(props){
    super(props)

    this.state = {
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

  render(){
    let widgetAreas = this.state.widgetAreas;
    let itemAvailables = this.state.itemAvailables;
    return (
        <div className="row">
          <div className="col-md-4">
            {
              _.map(widgetAreas, widget => (
                <AreaAvailable name={widget.id} id={widget.id}>
                  {
                    _.map(widget.items, item => (
                  <ItemWithForm item={item} key={item.id}/>
                  ))
                  }
                </AreaAvailable>
              ))
            }
          </div>

          <div className="col-md-4 push-md-4">
            <AreaAvailable title='Widget Availables'>
              {_.map(itemAvailables, (item, index) => (
                <ItemAvailable key={item.id} title={item.title}/>
              ))
              }
            </AreaAvailable>
          </div>
        </div>
    )

  }
}
