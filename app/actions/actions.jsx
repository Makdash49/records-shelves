import moment from 'moment';

export var addShelf = (shelf) => {
  return {
    type: 'ADD_SHELF',
    shelf
  }
}

export var updateShelf = (shelf, num) => {
  return {
    type: 'UPDATE_SHELF',
    shelf,
    num
  }
}

export var loadSortedShelves = (newShelves) => {
  return {
    type: 'LOAD_SORTED_SHELVES',
    newShelves
  }
}

export var startRemoveRecordFromShelf = (recordID, shelfNum) => {
  return (dispatch, getState) => {
    var shelves = getState().shelves;
    for (var i = 0; i < shelves.length; i++) {
      if (shelfNum === shelves[i].number) {
        var matchingShelf = shelves[i];
        break;
      }
    }
    var records = matchingShelf.records;
    for (var x = 0; x < records.length; x++) {
      if (recordID === records[x].instanceID) {
        var index = x;
        break;
      }
    }
    var r1 = records.slice(0,index);
    var r2 = records.slice(index + 1);
    var fewerRecords = r1.concat(r2)
    var updatedShelf = {
      number: shelfNum,
      name: matchingShelf.name,
      records: fewerRecords
    }
    dispatch(updateShelf(updatedShelf, shelfNum));
  };
};

export var startAddRecordToShelf = (record, shelfNum) => {
  return (dispatch, getState) => {
    var shelves = getState().shelves;
    for (var i = 0; i < shelves.length; i++) {
      if (shelfNum.number === shelves[i].number) {
        var matchingShelf = shelves[i];
        break;
      }
    }
    var updatedShelf = {
      number: shelves[i].number,
      name: shelves[i].name,
      records: shelves[i].records.concat(record)
    }
    dispatch(updateShelf(updatedShelf, shelfNum.number))
  };
};


export var changeShelfTitle = (num, name) => {
  return {
    type: 'UPDATE_NAME',
    num,
    name
  };
};


export var deleteShelf = (number) => {
  return {
    type: 'DELETE_SHELF',
    number
  };
};

export var toggleShelfEditable = (num, editable) => {
  return {
    type: 'UPDATE_EDITABLE',
    num,
    editable
  }
}

export var nowLoaded = () => {
  return {
    type: 'MAKE_TRUE',
  };
};

export var makeSortRecordsTrue = (prop) => {
  return {
    type: 'MAKE_SORTED',
    prop
  };
};
