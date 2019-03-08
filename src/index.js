import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import UserList from './components/user';
import UserEdit from './components/userEdit';
import TaskEdit from './components/taskEdit';

import TaskList from './components/task';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
	  <div>
		<div className="block">
			<UserList/>
		    <UserEdit/>
		</div>
		<div className="block">
			<TaskList />
		    <TaskEdit/>
		</div>
	  </div>
  </Provider>
  , document.querySelector('.container'));
