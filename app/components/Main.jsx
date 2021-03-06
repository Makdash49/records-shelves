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
    var {dispatch, sortRecords} = this.props;
    var number;
    if (sortRecords) {
      number = '†' + moment().unix()
    } else {
      number = moment().unix()
    }

    var newShelf = {
      editable: false,
      number: number,
      name: "Your New Shelf",
      records: []
    }
    dispatch(actions.addShelf(newShelf));
  }

  handleChronologize (e) {
    var allShelves = this.props.shelves;

    var chronoHash = {};
    var chronoShelvesArray = [];

    for (var i = 0; i < allShelves.length; i++) {
      var shelfRecords = allShelves[i].records;
      for (var x = 0; x < shelfRecords.length; x++) {
        var year = shelfRecords[x].year.toString();
        var decade = year.slice(0,3) + '0';
        if (!chronoHash[decade]) {
          chronoHash[decade] = [shelfRecords[x]];
        } else {
          chronoHash[decade].push(shelfRecords[x])
        }
      }
    }

    for (var key in chronoHash) {
      var chronoRecords = chronoHash[key];
      chronoRecords.sort((a, b) => {
        if(a.year > b.year) {
          return -1;
        } else if (a.year < b.year) {
          return 1;
        } else {
          return 0
        }
      });

      var newShelf = {}
      newShelf["editable"] = false;
      newShelf["number"] = "chrono" + key;
      newShelf["name"] = "Shelf " + key + "s";
      newShelf["records"] = chronoRecords
      chronoShelvesArray.push(newShelf);
    }
    var {dispatch} = this.props;
    dispatch(actions.makeSortRecordsTrue("year"));
    dispatch(actions.loadSortedShelves(chronoShelvesArray));
  }

  handleAlphabetize (e) {
    var allShelves = this.props.shelves;

    var alphabetHash = {};
    var alphabetShelvesArray = [];

    for (var i = 0; i < allShelves.length; i++) {
      var shelfRecords = allShelves[i].records;
      for (var x = 0; x < shelfRecords.length; x++) {
        var firstLetterUppercase = shelfRecords[x].title[0].toUpperCase();

        if (!alphabetHash[firstLetterUppercase]) {
          alphabetHash[firstLetterUppercase] = [shelfRecords[x]]
        } else {
          alphabetHash[firstLetterUppercase].push(shelfRecords[x])
        }
      }
    }

    for (var key in alphabetHash) {
      var alphaRecords = alphabetHash[key]
      alphaRecords.sort((a, b) => {
        if(a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        } else {
          return 0
        }
      });

      var newShelf = {}
      newShelf["editable"] = false;
      newShelf["number"] = "alpha" + key;
      newShelf["name"] = "Shelf " + key;
      newShelf["records"] = alphaRecords
      alphabetShelvesArray.push(newShelf);
    }
    var {dispatch} = this.props;
    dispatch(actions.makeSortRecordsTrue("title"));
    dispatch(actions.loadSortedShelves(alphabetShelvesArray));
  }

  componentDidMount() {
    var that = this;

    var x = 1;

    setInterval(function() {

    if (x <= 4) {
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
    var {shelves, isLoaded, sortRecords} = this.props

    var pageTitle = () => {
      if (isLoaded) {
        return (
          <div className="page-title">
            <h1>Discogs - Blacklight Collection</h1>
            <h4>Shelves by Mark McQuillen</h4>
          </div>
        )
      }
    }

    var renderButtons = () => {
      if (isLoaded) {
        return (
          <div>
            <button className="top-buttons" onClick={this.handleAddShelf.bind(this)}>ADD NEW SHELF</button>
            <button className="top-buttons" onClick={this.handleAlphabetize.bind(this)}>ALPHABETIZE</button>
            <button className="top-buttons" onClick={this.handleChronologize.bind(this)}>CHRONOLOGIZE</button>
          </div>
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
              <Shelf key={shelf.number} sortRecords={sortRecords} {...shelf}/>
            )
          });
        } else {
          return shelves.map((shelf) => {
            return (
              <Shelf key={shelf.number} sortRecords={sortRecords} {...shelf}/>
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
        {pageTitle()}
        <div className="allButtons">
          {renderButtons()}
        </div>
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
