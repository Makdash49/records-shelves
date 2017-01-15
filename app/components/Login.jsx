import React from 'react';
import * as Redux from 'react-redux';
var openWeatherMap = require('openWeatherMap');
import {connect} from 'react-redux';
import Page from 'Page';

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
    for (var i = 1; i <= 10; i++) {
      openWeatherMap.getTemp(i).then(function (data) {
        var {dispatch} = that.props;
        // console.log('DATA:', data );
        dispatch(actions.addPage(data.page))
        dispatch(actions.nowLoaded())
      }, function (e) {
        // console.log('ERROR: ', e);
      });
    }
    // var {dispatch} = this.props;
  }

  render() {
    var {pages, isLoaded} = this.props
    // if (pages) {
    //   // console.log('Pages', pages);
    // } else {
    //   pages = [{name: "temp", number:101}, {name: "temp", number:102}]
    // }

    var renderShelves = () => {
      if (isLoaded){
        return pages.map((page) => {
          return (
            <Page key={page.number} {...page}/>
          )
        })
      } else {
        return "Loading........"
      }

    }
    return (
      <div>
        {renderShelves()}
      </div>
    );
  }
};

// export default Redux.connect()(Login);

export default connect(
  (state) => {
    return state;
  }
)(Login);
