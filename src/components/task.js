import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class TaskList extends Component {

  constructor(props){
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount(){
    const getTask = this.props.getTask;
    fetch('http://localhost:80/task/')
      .then(response => response.json())
      .then(v => getTask(v));
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
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
    const {getTask} = this.props;
    fetch('http://localhost:80/task/', {
      method : "DELETE",
      body : JSON.stringify(task)
    }).then(()=>{
      fetch('http://localhost:80/task/?USER_ID=' + task.USER_ID)
      .then(response => response.json())
      .then(v => getTask(v));
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
    return () => {
      selectTask(ID);
    };  
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const taskEdit = document.getElementsByClassName("taskEdit")[0];
    const taskList = document.getElementsByClassName("taskList")[0];

    if (!event.path.includes(taskEdit) && !event.path.includes(taskList)) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.selectTask(-1);
        this.props.getTask(null, false);
        this.props.getTaskEdit({}, -1, false);
        this.props.userID = -1;
        this.props.selectedTask = -1;
      }
    }
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
    getTaskEdit : actionCreators.getTaskEdit,
    getTask : actionCreators.getTask,
    selectTask : actionCreators.selectTask,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
