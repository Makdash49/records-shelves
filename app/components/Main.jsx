import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import * as Redux from 'react-redux';
var discogsAPI = require('discogsAPI');
import {connect} from 'react-redux';
import Shelf from 'Shelf';
var $ = require('jquery');

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import moment from 'moment';

import * as actions from 'actions';

export class Main extends React.Component {

  handleAddShelf (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var newShelf = {
      editable: false,
      number: moment().unix(),
      name: "New Shelf",
      records: []
    }
    dispatch(actions.addShelf(newShelf));
  }

  onLogin() {
    var {dispatch} = this.props;
    this.refs.btn.setAttribute("disabled", "disabled");
    dispatch(actions.startLogin());
  }

  componentDidMount() {
    var that = this;

    var x = 1;

    setInterval(function() {

    if (x <= 3) {
      discogsAPI.getShelf(x).then(function (data) {
        var {dispatch} = that.props;
        dispatch(actions.addShelf(data.shelf))
        dispatch(actions.nowLoaded())
      }, function (e) {
        });
      }
      else return;
      x++;
    }, 2000);

    var {dispatch} = this.props;
  }

  render() {
    var {shelves, isLoaded} = this.props

    var renderButton = () => {
      if (isLoaded) {
        return (
          <button className="add-shelf" onClick={this.handleAddShelf.bind(this)}>Add a New Shelf!</button>
        )
      }
    }

    var renderShelves = () => {
      if (isLoaded){
        if (shelves.length > 1) {
          shelves.sort((a, b) => {
            if(a.number > b.number) {
              return -1;
            } else if (a.number < b.number) {
              return 1;
            } else {
              return 0
            }
          });
          return shelves.map((shelf) => {
            return (
              <Shelf key={shelf.number} {...shelf}/>
            )
          });
        } else {
          return shelves.map((shelf) => {
            return (
              <Shelf key={shelf.number} {...shelf}/>
            )
          })
        }
      } else {
        return (
          <div className="loading">
            <img src="http://i.imgur.com/8YsAmq3.gif" alt="Loading"/>
            <h1>LOADING...</h1>
          </div>
        )
      }

    }
    return (
      <div className="main">
        <p></p>
        {renderButton()}
        {renderShelves()}
      </div>
    );
  }
};

Main = DragDropContext(HTML5Backend)(Main);
export default connect(
  (state) => {
    return state;
  }
)(Main);
