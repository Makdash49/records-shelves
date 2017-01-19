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
    if (dropResult.number != props.shelfNum) {
      props.dispatch(actions.startRemoveRecordFromShelf(item.instanceID, props.shelfNum))
      props.dispatch(actions.startAddRecordToShelf(item, dropResult))
    }
  }
};

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
    var {dispatch, id, shelfNum, instanceID} = this.props;
    dispatch(actions.startRemoveRecordFromShelf(instanceID, shelfNum))

  }
  render() {
    var {instanceID, title, formats, artists, labels, year, isDragging, connectDragSource, dispatch} = this.props;

    return connectDragSource (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="record">
          <div className="record-text">{title}, {formats}, {artists}, {labels}, {year}</div>
          <div className="record-button" onClick={this.handleClick.bind(this)}>X</div>
        </div>
      </div>
    );
  }
};

Record.propTypes = propTypes;

Record = DragSource(ItemTypes.RECORD, recordSource, collect)(Record);
export default connect()(Record)
