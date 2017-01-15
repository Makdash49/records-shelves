import React from 'react';
import * as Redux from 'react-redux';
var openWeatherMap = require('openWeatherMap');

import * as actions from 'actions';

export class Login extends React.Component {

  constructor (props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    var {dispatch} = this.props;
    this.refs.btn.setAttribute("disabled", "disabled");
    dispatch(actions.startLogin());
  }

  componentDidMount() {
    var that = this;
    console.log('WILL THE COMPONENT MOUNT??????');
    for (var i = 1; i < 11; i++) {
      openWeatherMap.getTemp(i).then(function (data) {
        var {dispatch} = that.props;
        console.log('DATA:', data );
        dispatch(actions.addPage(data.page))
      }, function (e) {
        console.log('ERROR: ', e);
      });
    }
  //   setTimeout(function(){
  //     for (var i = 11; i < 21; i++) {
  //       openWeatherMap.getTemp(i).then(function (data) {
  //         var {dispatch} = that.props;
  //         console.log('DATA:', data );
  //         dispatch(actions.addPage(data.page))
  //       }, function (e) {
  //         console.log('ERROR: ', e);
  //       });
  //     }
  //   }, 10000);
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h1>GiftVote</h1>
              <button className="button" ref="btn" onClick={this.onLogin}>Click to Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Redux.connect()(Login);
