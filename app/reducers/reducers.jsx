export var shelvesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SHELF':
      return [
        ...state,
        action.shelf
      ];
    case 'UPDATE_SHELF':
      return state.map((shelf) => {
        if (shelf.number === action.num) {
          return {
            ...action.shelf
          };
        } else {
          return shelf;
        }
      });
    case 'UPDATE_EDITABLE':
      return state.map((shelf) => {
        if (shelf.number === action.num) {
          return {
            ...shelf,
            editable: action.editable
          };
        } else {
          return shelf;
        }
      });
    case 'UPDATE_NAME':
      return state.map((shelf) => {
        if (shelf.number === action.num) {
          return {
            ...shelf,
            name: action.name
          };
        } else {
          return shelf;
        }
      });

    case 'DELETE_SHELF':
      for (var i = 0; i < state.length; i++) {
        if (state[i].number === action.number) {
          state.splice(i, 1);
        };
      };
      return [...state];
    case 'LOAD_SORTED_SHELVES':
        return action.newShelves;
    default:
      return state;
  }
}

export var isLoadedReducer = (state = false, action) => {
  switch (action.type) {
    case 'MAKE_TRUE':
      return true;
      default:
        return state;
  }
}

export var sortRecordsReducer = (state = false, action) => {
  switch (action.type) {
    case 'MAKE_SORTED':
      return action.prop;
      default:
        return state;
  }
}
