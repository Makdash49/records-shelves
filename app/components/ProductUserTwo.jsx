import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProductUserTwo extends React.Component {

  handlePlus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserTwo} = this.props;
    dispatch(actions.startIncrementProductUserTwo(id, counterUserTwo));
    }

  handleMinus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserTwo} = this.props;
    dispatch(actions.startDeincrementProduct(id, counterUserTwo));
    }



  render() {
    var {text, image, counterUserTwo, userTwoTotal} = this.props;
    console.log('CounterUserTwo:', counterUserTwo);

    var percentage = Math.round(counterUserTwo / userTwoTotal * 100);

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <button className="plusBox" onClick={this.handlePlus.bind(this)}>+</button>
            <button className="minusBox" onClick={this.handleMinus.bind(this)}>-</button>
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
