var expect = require('expect');
var df = require('deep-freeze-strict');
var uuid = require('node-uuid');
var moment = require('moment');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED',
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true)
    });
  });

  describe('todoReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'Walk the dog'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });
    it('should toggle a todo', () => {
      var action = {
        type: 'TOGGLE_TODO',
        id: 1
      };
      var testArray = [{
        id: 1,
        text: "Holy cow.",
        completed: true,
        createdAt: moment().unix(),
        completedAt: moment().unix()
      }]

      var res = reducers.todosReducer(testArray, action);

      expect(res[0].completed).toEqual(false);
      expect(res[0].completedAt).toNotExist();
    });
  });
});

// send int todos array as default.  Pass into a reducer a toggle todo action.
// Check that it has a completed status opposite of what you passed int.
// Define todos array with realistic todo item.
// Generate action with with id from thing.
// Check it toggled.
