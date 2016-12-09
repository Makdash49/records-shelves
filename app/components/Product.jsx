import React from 'react';
import {connect} from 'react-redux';


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

export default connect()(Product);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
