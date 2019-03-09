import React, { Component } from 'react';
import * as actionCreators from '../actions/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export  class UserEdit extends Component {

  handleChange(field) {
    const {user, getUserEdit } = this.props;
    return (event) => {
      const change = {};
      change[field] = event.target.value;
      getUserEdit(Object.assign({},user,change), true);
    };
  }

  handleSubmit() {
    const {user, getUser} = this.props;
    const method = user.ID ?  "PUT" : "POST";
    fetch('user/', {
      method,
      body : JSON.stringify(user)})
      .then(()=>{
        fetch('user/' )
        .then(response => response.json())
        .then(v => getUser(v));
    });
    this.hide();
  }

  hide() {
      this.props.getUserEdit({},false);
  }

  render() {
    const user = this.props.user;
      return (
      this.props.show ?
      <table border = "1" className = "userEdit">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Faculty</th>
            <th>Course</th>
            <th>Actions</th>  
          </tr>
          <tr>
            <td className = "name"> <input  type="text"  value={user.FIRST_NAME || ""}  onChange={this.handleChange("FIRST_NAME")}></input> </td>
            <td className = "lastname"> <input  type="text"  value={user.LAST_NAME || ""}  onChange={this.handleChange("LAST_NAME")}></input> </td>
            <td className = "faculty"> <input  type="text"  value={user.FACULTY || ""}  onChange={this.handleChange("FACULTY")}></input> </td>
            <td className = "course"> <input type="number"  value={user.COURSE || ""}  onChange={this.handleChange("COURSE")}></input> </td>
            <td className = "button"> 
              <button  type="text"   className="ok" onClick={this.handleSubmit.bind(this)}>ok</button> 
              <button className="cancel" onClick={this.hide.bind(this)}>cancel</button> 
            </td>
          </tr>
        </tbody>
      </table> : "");
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
    getUser : actionCreators.getUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
