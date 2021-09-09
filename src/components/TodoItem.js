import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, toggleTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {

	const dispatch = useDispatch();

	const onHandleToggle = () => {
		// const action = toggleTodo({
		// 	id: id, completed: !completed
		// });

		const action = toggleTodoAsync({
			id: id, completed: !completed
		});
		dispatch(action);
	}

	const onHandleDelete = () => {
		// const action = deleteTodo({
		// 	id: id
		// });

		const action = deleteTodoAsync({
			id: id
		});
		dispatch(action);
	}

	return (
		<li className={`list-group-item ${completed ? 'list-group-item-success' : ''}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={onHandleToggle}/>
					{title}
				</span>
				<button className='btn btn-danger' onClick={onHandleDelete}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
