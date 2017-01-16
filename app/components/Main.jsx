import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


var Main = (props) => {
  return (
    <div>
      <div className="row">
          {props.children}
      </div>
    </div>
  );
};


module.exports = DragDropContext(HTML5Backend)(Main);


// export default DragDropContext(HTML5Backend)(Main);
