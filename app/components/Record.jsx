// import React from 'react';
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

import {DragSource} from 'react-dnd';
// import { ItemTypes } from 'Constants';


var ItemTypes =  {
  RECORD: 'record'
};




const recordSource = {
  beginDrag(props) {
    return {
    };
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

// const propTypes = {
//   text: PropTypes.string.isRequired,
//
//   // Injected by React DnD:
//   isDragging: PropTypes.bool.isRequired,
//   connectDragSource: PropTypes.func.isRequired
// };


export class Record extends React.Component {

  static propTypes = {

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  }

  render() {
    var {instanceID, title, formats, artists, labels, year} = this.props;
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource (
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="record">
          {title}, {formats}, {artists}, {labels}, {year}
        </div>
      </div>
    );
  }
};

// Record.propTypes = propTypes;

// Record.propTypes = {
//   text: PropTypes.string.isRequired,
//
//   // Injected by React DnD:
//   isDragging: PropTypes.bool.isRequired,
//   connectDragSource: PropTypes.func.isRequired
// };


// export default DragSource(ItemTypes.RECORD, recordSource, connect => ({
//   connectDragSource: connect.dragSource()
// }))(Record)

export default DragSource(ItemTypes.RECORD, recordSource, collect)(Record);
