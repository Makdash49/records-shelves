import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

export class Product extends React.Component {


  render() {
    var {text} = this.props;

    var myComponent = () => {
      return (
        <div>
          <p>{text}</p>
        </div>
      );
    };


    return (
      <div>
        {myComponent()}
      </div>
    )
  }
};

export default connect()(Product)
