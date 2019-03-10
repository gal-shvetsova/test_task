import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export  class UserEdit extends Component {

  handleChange(field) {
    const {user, getUserEdit } = this.props;
        this.props.getTaskEdit({}, -1, false);
    return (event) => {
      const change = {};
      change[field] = event.target.value;
      getUserEdit(Object.assign({},user,change), true);
    };
  }

  handleSubmit() {
    const {user, getUser, getConformity} = this.props;
    const method = user.ID ?  "PUT" : "POST";
    fetch('user/', {
      method,
      body : JSON.stringify(user)})
      .then(()=>{
        fetch('user/' )
        .then(response => response.json())
        .then(v => getUser(v))})
        .then(()=>{
          fetch('/main')
          .then(response => response.json())
          .then(v => getConformity(v))
        }
    );
    this.hide();
  }

  hide() {
      this.props.getUserEdit({},false);
  }

  render() {
    const user = this.props.user;
      return (
      this.props.show ?
      <div className = "userEdit">
        <p>Name</p>
        <input  type="text"  value={user.FIRST_NAME || ""}  onChange={this.handleChange("FIRST_NAME")}></input> 
        <p>Last name</p>
        <input  type="text"  value={user.LAST_NAME || ""}  onChange={this.handleChange("LAST_NAME")}></input> 
        <p>Faculty</p>
        <input  type="text"  value={user.FACULTY || ""}  onChange={this.handleChange("FACULTY")}></input> 
        <p>Course</p>
        <input type="number"  value={user.COURSE || ""}  onChange={this.handleChange("COURSE")}></input> 
        <p></p>
        <button  type="text"   className="ok" onClick={this.handleSubmit.bind(this)}>ok</button> 
        <button className="cancel" onClick={this.hide.bind(this)}>cancel</button> 
      </div>
      : "");
  }
  
}



const mapStateToProps = function(state){
  return {
    user: state.userEditStore.user,
    show : state.userEditStore.show,
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    getUserEdit : actionCreators.getUserEdit,
    getTaskEdit : actionCreators.getTaskEdit,
    getUser : actionCreators.getUser,
        getConformity : actionCreators.getConformity
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
