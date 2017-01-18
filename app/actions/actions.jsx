import moment from 'moment';

export var addPage = (shelf) => {
  return {
    type: 'ADD_SHELF',
    shelf
  }
}

export var updatePage = (shelf, num) => {
  return {
    type: 'UPDATE_SHELF',
    shelf,
    num
  }
}

export var startRemoveRecordFromPage = (recordID, shelfNum) => {
  return (dispatch, getState) => {
    var shelves = getState().shelves;
    for (var i = 0; i < shelves.length; i++) {
      if (shelfNum === shelves[i].number) {
        var matchingPage = shelves[i];
        break;
      }
    }
    var records = matchingPage.records;
    for (var x = 0; x < records.length; x++) {
      if (recordID === records[x].instanceID) {
        var index = x;
        break;
      }
    }
    var r1 = records.slice(0,index);
    var r2 = records.slice(index + 1);
    var fewerRecords = r1.concat(r2)
    var updatedPage = {
      number: shelfNum,
      name: matchingPage.name,
      records: fewerRecords
    }
    dispatch(updatePage(updatedPage, shelfNum));
  };
};

export var startAddRecordToPage = (record, shelfNum) => {
  return (dispatch, getState) => {
    var shelves = getState().shelves;
    for (var i = 0; i < shelves.length; i++) {
      if (shelfNum.number === shelves[i].number) {
        var matchingPage = shelves[i];
        break;
      }
    }
    var updatedPage = {
      number: shelves[i].number,
      name: shelves[i].name,
      records: shelves[i].records.concat(record)
    }
    dispatch(updatePage(updatedPage, shelfNum.number))
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
