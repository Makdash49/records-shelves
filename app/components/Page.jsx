import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';
import Record from 'Record';
import { DropTarget } from 'react-dnd';

var ItemTypes =  {
  RECORD: 'record'
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()

  };
}

const pageTarget = {
  drop(props) {
    console.log('SOMETHING JUST HAPPENED!!!!!!');;
  }
};

export class Page extends React.Component {

  componentWillMount() {
    console.log('THIS.PROPS', this.props);
  }

  handleClick (e) {
    e.preventDefault();
    var {dispatch, id} = this.props;
    dispatch(actions.startDeleteTodo(id));
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch, id} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddEdit(id, todoText));
    } else {
      this.refs.todoText.focus();
    }
  }

  handleEdit (e) {
    e.preventDefault();
    var {dispatch, id, edit} = this.props;
    edit = !edit
    dispatch(actions.startToggleEdit(id, edit));
  }


  render() {
    var {number, records, connectDropTarget} = this.props;

    // console.log('RECORDS!!!!!!!!!!!!!!!!', records);

    var renderRecords = () => {
      return records.map((record) => {
        // console.log('INSTANCEID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', record.instanceID);
        return (
          <Record key={record.instanceID} {...record}/>
        )
      })
    }



    return connectDropTarget(
      <div>
        <div className="shelf">
          Shelf {number}
          {renderRecords()}
        </div>
      </div>
    )
  }
};

Page = DropTarget(ItemTypes.RECORD, pageTarget, collect)(Page)
export default connect()(Page)
// export default DropTarget(ItemTypes.RECORD, pageTarget, collect)(Page);
// export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
