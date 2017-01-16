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

// var cardSource = {
//   beginDrag: function (props) {
//     return {
//       text: props.text
//     };
//   }
// }

// instanceID, title, formats, artists, labels, year


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
  connectDragSource: PropTypes.func.isRequired
};


export class Record extends React.Component {
  render() {
    var {instanceID, title, formats, artists, labels, year, isDragging, connectDragSource} = this.props;
    // const { isDragging, connectDragSource } = this.props;

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
