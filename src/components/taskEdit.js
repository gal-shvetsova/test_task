import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export  class TaskEdit extends Component {

  handleChange(field) {
    const {task, getTaskEdit} = this.props;
    this.props.getUserEdit({}, false);
    return (event) => {
      const change = {};
      change[field] = event.target.value;
      getTaskEdit(Object.assign({},task,change), this.props.userID,true);
    };
  }

  handleSubmit() {
    const {task, getTask, getConformity} = this.props;
    var method = this.props.task.ID ?  "PUT" : "POST";
    if (!task) method = "POST";
    fetch('task/', {
      method,
      body : JSON.stringify(task)})
      .then(function(response) {
        if (response.ok) {
          fetch('task/?USER_ID='+ task.USER_ID)
          .then(function(response){ 
            if (response.ok){ 
              response.json()
              .then(v => getTask(v,task.USER_ID));
            } else {
              response.json()
              .then(data => alert(data.error));
            }
          })
        } else {
          response.json()
          .then(data => alert(data.error));
        }
      })
      .then(function(response){
        if (response.ok) {
          fetch('/main')
          .then(response => response.json())
          .then(v => getConformity(v));
        } else {
          response.json()
          .then(data => alert(data.error));
        }
      });
      this.hide();
  }

  hide() {
      this.props.getTaskEdit({}, -1, false);
  }

  render() {
    const task = this.props.task;
      return (
      this.props.show ? (
        <div className = "taskEdit">
          <p>Name</p>
          <input  type="text" value={task.NAME || ""}  onChange={this.handleChange("NAME")}></input>
          <p>Description</p>
          <input  type="text"  value={task.DESCRIPTION || ""}  onChange={this.handleChange("DESCRIPTION")}></input> 
          <p>Hardness</p>
          <input  type="text"  value={task.HARDNESS || ""}  onChange={this.handleChange("HARDNESS")}></input> 
          <p></p>
          <button  type="number"   className="ok" onClick={this.handleSubmit.bind(this)}>ok</button> 
          <button className="cancel" onClick={this.hide.bind(this)}>cancel</button> 
        </div>)
      : "" );
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
    getUserEdit : actionCreators.getUserEdit,
    getTask : actionCreators.getTask,
            getConformity : actionCreators.getConformity
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)
