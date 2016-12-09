import React from 'react';
import {connect} from 'react-redux';
import Product from 'Product';

// var Product = require('./Product')
import * as actions from 'actions';




export class Amazon extends React.Component {

  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddProduct(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }



  render() {
    var {products} = this.props;
    console.log("AMAZON COMPONENT:", products)

    var renderProducts = () => {
      return products.map((product) => {
        return (
          <Product key={product.id} {...product}/>
        );
      });
    }


    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <h1 className="page-title">Amazon!!!</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="What would you like to buy?"/>
          <button className="button expanded">Add Product</button>
        </form>


        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
            </div>
          </div>
        </div>
        {renderProducts()}
      </div>
    )
  }
};

// export default Redux.connect()(Amazon);

export default connect(
  (state) => {
    return state;
  }
)(Amazon);
