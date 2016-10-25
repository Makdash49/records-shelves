export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};


export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return action;
    default:
      return state;
  };
};


// showCompletedReducer.  State and Action. default state is false.
// Switch statement. TOGGLE_SHOW_COMPLETED - TRUE TO false
// default when not recognized.
