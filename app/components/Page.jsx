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
    // console.log('SOMETHING JUST HAPPENED!!!!!!');;
    // console.log('PROPS', props);

    return {
      number: props.number,
    };
  }
};

export class Page extends React.Component {

  toggleEditable (e) {
    e.preventDefault();
    var {dispatch, number, editable} = this.props;
    editable = !editable
    dispatch(actions.toggleShelfEditable(number, editable));
  }

  handleEditSubmit (e) {
    e.preventDefault();
    var {dispatch, number, editable} = this.props

    var shelfText = this.refs.shelfText.value;

    if (shelfText.length > 0) {
      this.refs.shelfText.value = '';
      dispatch(actions.changeShelfTitle(number, shelfText));
      editable = !editable
      dispatch(actions.toggleShelfEditable(number, editable));
    } else {
      this.refs.shelfText.focus();
    }
  }

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
    var {number, name, records, editable, connectDropTarget} = this.props;

    // console.log('RECORDS!!!!!!!!!!!!!!!!', records);

    var renderRecords = () => {
      return records.map((record) => {
        // console.log('INSTANCEID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', record.instanceID);
        return (
          <Record key={record.instanceID} pageNum={number} {...record}/>
        )
      })
    }

    var editComponent = () => {
      if (editable) {
        return (
          <div className="shelf">
              <form onSubmit={this.handleEditSubmit.bind(this)}>
                <input type="text" ref="shelfText" defaultValue={name}/>
              </form>
            <button className="my-green-button float-right" onClick={this.toggleEditable.bind(this)}>E</button>
            {renderRecords()}
          </div>
        )
      } else {
        return (
          <div className="shelf">
            {name}
            <button className="my-green-button float-right" onClick={this.toggleEditable.bind(this)}>E</button>
            {renderRecords()}
          </div>
        )
      }
    }


    return connectDropTarget(
      <div>
        {editComponent()}
      </div>
    )
  }
};

Page = DropTarget(ItemTypes.RECORD, pageTarget, collect)(Page)
export default connect()(Page)
// export default DropTarget(ItemTypes.RECORD, pageTarget, collect)(Page);
// export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
