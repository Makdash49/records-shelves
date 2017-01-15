import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

export class Record extends React.Component {

  render() {
    var {instanceID, title, formats, artists, labels, year} = this.props;

    return (
      <div>
        <div className="record">
          {title}, {formats}, {artists}, {labels}, {year}
        </div>
      </div>
    )
  }
};

export default connect()(Record)
