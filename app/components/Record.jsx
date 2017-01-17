// import React from 'react';
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

import {DragSource} from 'react-dnd';
// var store = require('configureStore').configure();


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
      year: props.year,
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    // console.log('ITEM', item);
    console.log('DROPRESULT', dropResult.number);
    console.log('props.pageNum', props.pageNum);
    if (dropResult.number != props.pageNum) {
      props.dispatch(actions.startRemoveRecordFromPage(item.instanceID, props.pageNum))
      props.dispatch(actions.startAddRecordToPage(item, dropResult))
    }
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
  connectDragSource: PropTypes.func.isRequired,
};


export class Record extends React.Component {
  handleClick (e) {
    e.preventDefault();
    var {dispatch, id, pageNum, instanceID} = this.props;
    // dispatch(actions.startDeleteTodo(id));
    dispatch(actions.startRemoveRecordFromPage(instanceID, pageNum))

  }
  render() {
    var {instanceID, title, formats, artists, labels, year, isDragging, connectDragSource, dispatch} = this.props;

    return connectDragSource (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="record">
          <div className="record-text">{title}, {formats}, {artists}, {labels}, {year}</div>
          <div className="record-red-button" onClick={this.handleClick.bind(this)}>x</div>
        </div>
      </div>
    );
  }
};

Record.propTypes = propTypes;

// export default DragSource(ItemTypes.RECORD, recordSource, collect)(Record);

Record = DragSource(ItemTypes.RECORD, recordSource, collect)(Record);
export default connect()(Record)
