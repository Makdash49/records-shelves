import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProductFinalTotal extends React.Component {

  // handlePlus (e) {
  //   e.preventDefault();
  //   var {dispatch, id, counterUserTwo} = this.props;
  //   dispatch(actions.startIncrementProductUserTwo(id, counterUserTwo));
  //   }
  //
  // handleMinus (e) {
  //   e.preventDefault();
  //   var {dispatch, id, counterUserTwo} = this.props;
  //   dispatch(actions.startDeincrementProductUserTwo(id, counterUserTwo));
  //   }



  render() {
    var {text, image, counterUserOne, userOneTotal, counterUserTwo, userTwoTotal} = this.props;
    // // // // // console.log('CounterUserTwo:', counterUserTwo);

    var percentageUserOne = Math.round(counterUserOne / userOneTotal * 100);
    isNaN(percentageUserOne) ? percentageUserOne = 0 : percentageUserOne = percentageUserOne;

    var percentageUserTwo = Math.round(counterUserTwo / userTwoTotal * 100);
    isNaN(percentageUserTwo) ? percentageUserTwo = 0 : percentageUserTwo = percentageUserTwo;

    var finalPercentage = percentageUserOne + percentageUserTwo;


    var myComponent = () => {



      return (
        <div>
          <div className="productImage">
            <div className="increments">
            </div>
            <div className="photo">
              <img className="thePhoto" src={image} alt={text}/>
            </div>
            <div className="percentage">
              <h4>{finalPercentage}%</h4>
            </div>
            <div>
              <p className="product-description">{text}</p>
            </div>
          </div>
        </div>
      )








    };


    return (
      <div>
        {myComponent()}
      </div>
    )
  }
};

export default connect()(ProductFinalTotal);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
