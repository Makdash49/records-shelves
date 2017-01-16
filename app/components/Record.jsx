// import React from 'react';
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

import {DragSource} from 'react-dnd';


var ItemTypes =  {
  RECORD: 'record'
};

const recordSource = {
  beginDrag(props) {
    return {
      instanceID: props.instanceID,
      title: props.title,
      formats: props.formats,
      artists: props.artists,
      labels: props.labels,
      year: props.year
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('ITEM', item);
    console.log('DROPRESULT', dropResult);
    // CardActions.moveCardToList(item.id, dropResult.listId);

  }
};


// const cardSource = {
//   beginDrag(props) {
//     // Return the data describing the dragged item
//     const item = { id: props.id };
//     return item;
//   },
//
  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //
  //   // When dropped on a compatible target, do something
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();
  //   CardActions.moveCardToList(item.id, dropResult.listId);
  // }
// };


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  instanceID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formats: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};


export class Record extends React.Component {
  render() {
    var {instanceID, title, formats, artists, labels, year, isDragging, connectDragSource} = this.props;

    return connectDragSource (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="record">
          {title}, {formats}, {artists}, {labels}, {year}
        </div>
      </div>
    );
  }
};

Record.propTypes = propTypes;

export default DragSource(ItemTypes.RECORD, recordSource, collect)(Record);


// export default DragSource(ItemTypes.RECORD, recordSource, connect => ({
//   connectDragSource: connect.dragSource()
// }))(Record)
