import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, addTodosAsync } from '../redux/todoSlice';

const AddTodoForm = () => {

	const [value, setValue] = useState('');
	
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		
		// const action = addTodo({
		// 	title: value
		// });

		const action = addTodosAsync({
			title: value
		});
		dispatch(action);
	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<input type='text' className='form-control mb-2 mr-sm-2' placeholder='Add todo' value={value} onChange={(event) => setValue(event.target.value)}></input>
			<button type='submit' className='btn btn-primary mb-2'>Submit</button>
		</form>
	);
};

export default AddTodoForm;
