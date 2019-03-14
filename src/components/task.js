import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class TaskList extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {getTask} = this.props;
    fetch('task/')
      .then(function(response){
        if (response.ok) {
          response.json()
          .then(v => getTask(v))
        }
        else {
          response.json()
          .then(data => alert(data.error));
        }
      })
  }
  
  createTaskList() {
    const {tasks, selectedTask, selectTask} = this.props;
    return  (
    	<table border = "1" >
    		<tbody>
    			<tr>
      			<th>Name</th>
      			<th>Description</th>
      			<th>Hardness</th>
     			</tr>
    				{ 	
    					tasks.map((task, index) => (<tr key = { task.ID}  className = {task.ID === selectedTask ? "selected" : ""} 
                onClick = {this.taskSelected(task.ID, selectTask)}>  
    					<td className = "name"> {task.NAME} </td>
    					<td className ="description"> {task.DESCRIPTION} </td>
    					<td className = "hardness"> {task.HARDNESS} </td>
    					</tr>))
    				}
    		</tbody>
    	</table>
    ) 
  }


  handleDelete(task) {
    const {getTask, getConformity} = this.props;
    fetch('task/', {
      method : "DELETE",
      body : JSON.stringify(user)
    })
    .then(function(response) {
      if (response.ok) {
          fetch('task/?USER_ID=' + + task.USER_ID)
          .then(response => response.json())
          .then(v => getTask(v));
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

  }

  taskEdit(props, button){
    props.getTaskEdit({}, props.USER_ID, false);
    if (button  != "edit" || props.selectedTask != undefined) {
      const task = props.tasks.find(v=>v.ID === props.selectedTask) || {};
      props.getTaskEdit(task, props.userID,true);
    }
    if (button == "add") {
      props.getTaskEdit({ USER_ID : props.userID }, props.userID, true);
    }
    if (button == "delete") {
      const task = props.tasks.find(v=>v.ID === props.selectedTask) || {};
      this.handleDelete(task);
      props.getTaskEdit({USER_ID : props.userID}, props.userID, false);
    }
  }
    
  taskSelected(ID, selectTask){
    this.props.getUserEdit({}, false);
    return () => {
      selectTask(ID);
    };  
  }

  render() {
    return(
      <div>
        {(this.props.selectedUser != -1) ? <h4>Tasks</h4>: ""}
        <div  className="taskList">
    		  {(this.props.tasks != undefined && this.props.tasks.length > 0) ? this.createTaskList() : ''} 
          <div>
            {(this.props.selectedUser != -1) ? (<button className="add" onClick={() =>this.taskEdit(this.props, "add")}>add</button> ): ""}
            {(this.props.tasks != undefined && this.props.tasks.length > 0) ?   
              <button className="edit" onClick={() =>this.taskEdit(this.props, "edit")}>edit</button> : ""} 
            {(this.props.tasks != undefined && this.props.tasks.length > 0) ?   
              <button className="delete" onClick={() =>this.taskEdit(this.props, "delete")}>delete</button>: ""} 
          </div>
        </div>
      </div>);
  }

}

const mapStateToProps = function(state){
  return {
    tasks: state.taskStore.tasks,
    selectedTask : state.taskStore.selectedTask,
    selectedUser : state.userStore.selectedUser,
    userID : state.taskStore.userID
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    getUserEdit : actionCreators.getUserEdit,
    getTaskEdit : actionCreators.getTaskEdit,
    getTask : actionCreators.getTask,
    selectTask : actionCreators.selectTask,
                getConformity : actionCreators.getConformity
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
