import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';

export class UserList extends Component {

  constructor(props) {
    super(props);
    const getUser = this.props.getUser;
    fetch('user/')
    .then(response => response.json())
    .then(v => getUser(v));
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  createUserList() {
    const {users, selectedUser} = this.props; 
    return users ?
    (
      <table border = "1">
    	  <tbody>
    			<tr>
      			<th>Name</th>
      			<th>Last name</th>
      			<th>Faculty</th>
      			<th>Course</th>
     			</tr>
    				{ 
    					users.map((user) => (
                <tr key = {user.ID} className = {user.ID === selectedUser ? "selected" : ""}  
                  onClick = {this.userSelected(user.ID)}>  
    					    <td className = "name"> {user.FIRST_NAME} </td>
    					    <td className ="lastname"> {user.LAST_NAME} </td>
    					    <td className = "faculty"> {user.FACULTY} </td>
    					    <td className = "course"> {user.COURSE} </td>
    					  </tr>))
    				  }
    	  </tbody>
    	</table>
    ) : "Empty user's list";
  }

  handleDelete(user) {
    const {getUser} = this.props;
    fetch('user/', {
      method : "DELETE",
      body : JSON.stringify(user)
    })
    .then(() => {
      fetch('user/' )
      .then(response => response.json())
      .then(v => getUser(v));
    });
  }

  userEdit(props,button){
    props.getUserEdit({}, false);
    if (button  != "edit" || props.selectedUser != -1){
      const user = props.users.find(v=>v.ID === props.selectedUser) || {};
      props.getUserEdit(user, true);
    }
    if (button == "add") {
      props.getUserEdit({}, true);
    }
    if (button == "delete") {
      const user = props.users.find(v=>v.ID === props.selectedUser) || {};
      this.handleDelete(user);
      props.getUserEdit({}, false);
    }
  }

  userSelected(USER_ID){
    const row = document.getElementsByClassName(USER_ID)[0];
    const getTaskEdit = this.props.getTaskEdit;
    const getTask = this.props.getTask;

    return () => {
      this.props.getUserEdit({}, false);
      this.props.selectUser(USER_ID);
      fetch('task/?USER_ID='+USER_ID)
        .then(response => response.json())
        .then(v => getTask(v, USER_ID));
      getTaskEdit({USER_ID : USER_ID}, -1, false);
    };  
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const taskList = document.getElementsByClassName("taskList")[0];
    const taskEdit = document.getElementsByClassName("taskEdit")[0];
    const userEdit = document.getElementsByClassName("userEdit")[0];
      
    if (!event.path.includes(taskList) && !event.path.includes(taskEdit) && !event.path.includes(userEdit)) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.selectUser(-1);
        this.props.getTask({}, -1, false);
        this.props.getUserEdit({}, false);
        this.props.getTaskEdit({}, -1, false);
      }
    }
  }

  render() {
    return (
      <div className="User" ref={this.setWrapperRef}>
        <h4>Users</h4>
  			{this.createUserList()}
        <button className="add" onClick={() => this.userEdit(this.props, "add")}>add</button>
        <button className="edit" onClick={() => this.userEdit(this.props, "edit")}>edit</button>
        <button className="delete" onClick={() => this.userEdit(this.props, "delete")}>delete</button> 
      </div>
    );
  }
}


const mapStateToProps = function(state){
  return {
    users: state.userStore.users,
    selectedUser : state.userStore.selectedUser
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    uploadUserEdit : actionCreators.uploadUserEdit,
    getUserEdit : actionCreators.getUserEdit,
    getUser : actionCreators.getUser,
    getTask : actionCreators.getTask,
    getTaskEdit : actionCreators.getTaskEdit,
    selectUser : actionCreators.selectUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
