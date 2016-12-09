import React from 'react';
import {connect} from 'react-redux';


export class Item extends React.Component {

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

export default connect()(Item);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
