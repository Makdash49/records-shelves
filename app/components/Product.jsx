import React from 'react';
import {connect} from 'react-redux';


export class Product extends React.Component {

  render() {
    var {text, image} = this.props;

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <p>{text}</p>
            <img src={image} alt={text}/>
          </div>
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
