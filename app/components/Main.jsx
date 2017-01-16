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


// module.exports = Main;

Login = DragDropContext(HTML5Backend)(Login);
export default connect(
  (state) => {
    return state;
  }
)(Main);
