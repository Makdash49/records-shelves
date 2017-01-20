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

const shelfTarget = {
  drop(props) {
    return {
      number: props.number,
    };
  }
};

export class Shelf extends React.Component {

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

  handleDeleteShelf (e) {
    e.preventDefault();
    var {dispatch, number} = this.props

    dispatch(actions.deleteShelf(number));
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
      this.refs.shelfText.focus();
    }
  }

  handleEdit (e) {
    e.preventDefault();
    var {dispatch, id, edit} = this.props;
    edit = !edit
    dispatch(actions.startToggleEdit(id, edit));
  }


  render() {
    var {number, name, records, editable, connectDropTarget, sortRecords} = this.props;

    var renderRecords = () => {

      // if (sortRecords) {
      //   records.sort((a, b) => {
      //     if(a[sortRecords] > b[sortRecords]) {
      //       return -1;
      //     } else if (a[sortRecords] < b[sortRecords]) {
      //       return 1;
      //     } else {
      //       return 0
      //     }
      //   });
      // }

      return records.map((record) => {
        return (
          <Record key={record.instanceID} shelfNum={number} {...record}/>
        )
      })
    }

    var editComponent = () => {
      if (editable) {
        return (
          <div className="shelf">
            <div className="shelf-brown-bar">
              <div className="shelf-title">
                <form onSubmit={this.handleEditSubmit.bind(this)}>
                  <input type="text" ref="shelfText" defaultValue={name}/>
                </form>
              </div>
              <div className="buttons">
                <button className="shelf-buttons" onClick={this.toggleEditable.bind(this)}>Edit Shelf Title</button>
                <button className="shelf-buttons" onClick={this.handleDeleteShelf.bind(this)}>Delete Shelf</button>
              </div>
            </div>
            {renderRecords()}
          </div>
        )
      } else {
        return (
          <div className="shelf">
            <div className="shelf-brown-bar">
              <div className="shelf-title">
                <h3>{name}</h3>
              </div>
              <div className="buttons">
                <button className="shelf-buttons" onClick={this.toggleEditable.bind(this)}>Edit Shelf Title</button>
                <button className="shelf-buttons" onClick={this.handleDeleteShelf.bind(this)}>Delete Shelf</button>
              </div>
            </div>
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

Shelf = DropTarget(ItemTypes.RECORD, shelfTarget, collect)(Shelf)
export default connect()(Shelf)
