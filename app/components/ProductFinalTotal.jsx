import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProductUserTwo extends React.Component {

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
    var {text, image, counterTotals, finalTotals} = this.props;
    // // console.log('CounterUserTwo:', counterUserTwo);

    var percentage = Math.round(counterTotals / finalTotals * 200);

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <p>{counterUserTwo}</p>
            <h4>{percentage}%</h4>
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

export default connect()(ProductUserTwo);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
