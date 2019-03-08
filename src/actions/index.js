 export function getUser(users) {
    return {
        type: 'GET_USER',
        users
    }
}

export function selectUser(id){
    return {
        type: 'SELECT_USER',
        id
    }
}

export function selectTask(id){
    return {
        type: 'SELECT_TASK',
        id
    }
}

export function getUserEdit(user, show){
    return {
        type: 'GET_USER_EDIT',
        user, 
        show 
    }
}

export function getTaskEdit(task, userID, show){
    return {
        type: 'GET_TASK_EDIT',
        task, 
        userID, 
        show 
    }
}

export function getTask(tasks, userID) {
    return {
        type: 'GET_TASK',
        ...tasks,
        userID
    }
}
