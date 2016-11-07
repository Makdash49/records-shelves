var $ = require('jquery');

module.exports = {
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();
      searchText === null ? searchText = '' : searchText = searchText;
      return searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1;
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if(!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};

// filter method
// Call filter on filteredTodos.
// check for search text. If search text is empty always return true
// so you return every todo item.
// If there is search text you, see if it is in each todo.
// Use "string".indexOf('').  If it's in there it returns the index. Not returns
// -1.
// First convert the text to lowercase on the todo.
