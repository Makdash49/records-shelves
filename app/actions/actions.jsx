import moment from 'moment';

export var addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page
  }
}

export var updatePage = (page, num) => {
  return {
    type: 'UPDATE_PAGE',
    page,
    num
  }
}

export var startRemoveRecordFromPage = (recordID, pageNum) => {
  return (dispatch, getState) => {
    var pages = getState().pages;
    for (var i = 0; i < pages.length; i++) {
      if (pageNum === pages[i].number) {
        var matchingPage = pages[i];
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
      number: pageNum,
      name: matchingPage.name,
      records: fewerRecords
    }
    dispatch(updatePage(updatedPage, pageNum));
  };
};

export var startAddRecordToPage = (record, pageNum) => {
  return (dispatch, getState) => {
    var pages = getState().pages;
    for (var i = 0; i < pages.length; i++) {
      if (pageNum.number === pages[i].number) {
        var matchingPage = pages[i];
        break;
      }
    }
    var updatedPage = {
      number: pages[i].number,
      name: pages[i].name,
      records: pages[i].records.concat(record)
    }
    dispatch(updatePage(updatedPage, pageNum.number))
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
