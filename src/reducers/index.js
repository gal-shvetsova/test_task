import { combineReducers } from 'redux';


const userStore = (state={users : [], selectedUser : -1}, action) => {
  switch (action.type) {
    case 'GET_USER': 
      return {...state, ...action.users}
    case 'SELECT_USER':
      return {...state, selectedUser : action.id}
    default: return state
  }
}

const taskStore = (state={tasks : [], userID : -1}, action) => {
  switch (action.type) {
    case 'GET_TASK': 
      return {...state, tasks : action.tasks, userID : action.userID}
    case 'SELECT_TASK':
      return {...state, selectedTask : action.id}
    default: return state
  }
}

const taskEditStore = (state={task : {}, userID : -1, show : false}, action) => {
  switch (action.type) {
    case 'GET_TASK_EDIT': 
      return {...state, task : action.task, userID : action.userID, show : action.show}
    default: return state
  }
}

const userEditStore = (state={user : {}, show : false}, action) => {
    switch (action.type) {
      case 'GET_USER_EDIT':
        return {...state, user : action.user, show : action.show}
      default: return state
    }
}
const rootReducer = combineReducers({
    userStore, taskStore, userEditStore, taskEditStore
});

export default rootReducer;
