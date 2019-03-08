import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export  class TaskEdit extends Component {

  handleChange(field) {
    const {task, getTaskEdit} = this.props;
    return (event) => {
      const change = {};
      change[field] = event.target.value;
      getTaskEdit(Object.assign({},task,change), this.props.userID,true);
    };
  }

  handleSubmit() {
    const {task, getTask} = this.props;
    var method = this.props.task.ID ?  "PUT" : "POST";
    if (!task) method = "POST";
    fetch('http://localhost:80/task/', {
      method,
      body : JSON.stringify(task)})
      .then(()=>{
        fetch('http://localhost:80/task/?USER_ID='+ task.USER_ID )
        .then(response => response.json())
        .then(v => getTask(v,task.USER_ID));
      });
      this.hide();
  }

  hide() {
      this.props.getTaskEdit({}, -1, false);
  }

  render() {
    const task = this.props.task;
      return (
      this.props.show ?
      <table className = "taskEdit" border = "1">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Hardness</th>
            <th>Actions</th>  
          </tr>
          <tr>
            <td className = "name"> <input  type="text"  value={task.NAME || ""}  onChange={this.handleChange("NAME")}></input> </td>
            <td className = "description"> <input  type="text"  value={task.DESCRIPTION || ""}  onChange={this.handleChange("DESCRIPTION")}></input> </td>
            <td className = "hardness"> <input  type="text"  value={task.HARDNESS || ""}  onChange={this.handleChange("HARDNESS")}></input> </td>
            <td className = "button"> <button  type="number"   className="ok" onClick={this.handleSubmit.bind(this)}>ok</button> 
            <button className="cancel" onClick={this.hide.bind(this)}>cancel</button> </td>
          </tr>
        </tbody>
      </table> : "" );
  }
}

const mapStateToProps = function(state){
  return {
    task : state.taskEditStore.task,
    show : state.taskEditStore.show,
    userID : state.taskEditStore.userID,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    getTaskEdit : actionCreators.getTaskEdit,
    getTask : actionCreators.getTask
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
