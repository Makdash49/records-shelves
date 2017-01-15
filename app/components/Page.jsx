import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';
import Record from 'Record';

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
    var {number, records} = this.props;

    // console.log('RECORDS!!!!!!!!!!!!!!!!', records);

    var renderRecords = () => {
      return records.map((record) => {
        // console.log('INSTANCEID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', record.instanceID);
        return (
          <Record key={record.instanceID} {...record}/>
        )
      })
    }



    return (
      <div>
        <div className="shelf">
          Shelf {number}
          {renderRecords()}
        </div>
      </div>
    )
  }
};

export default connect()(Page)
