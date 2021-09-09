import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const url = 'http://localhost:3000/todos';
        const response = await fetch(url);
        if(response.ok){
            const todos = await response.json();
            return { todos }
        }
    }
)

export const addTodosAsync = createAsyncThunk(
    'todos/addTodosAsync',
    async (payload) => {
        const url = 'http://localhost:3000/todos';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: payload.title})
        }
        const response = await fetch(url, options);
        if(response.ok){
            const todo = await response.json();
            return { todo }
        }
    }
)

export const toggleTodoAsync = createAsyncThunk(
    'todos/toggleTodoAsync',
    async (payload) => {
        const url = `http://localhost:3000/todos/${payload.id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: payload.completed })
        }
        const response = await fetch(url, options);
        if(response.ok){
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed }
        }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const url = `http://localhost:3000/todos/${payload.id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options);
        if(response.ok){
            const todo = await response.json();
            return { id: todo.id }
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        { id: 1, title: 'todo1', completed: false },
		{ id: 2, title: 'todo2', completed: false },
		{ id: 3, title: 'todo3', completed: true },
		{ id: 4, title: 'todo4', completed: false },
		{ id: 5, title: 'todo5', completed: false },
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo);
        },
        toggleTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        // fulfilled: trạng thái đang xử lý
        [getTodosAsync.pending] : (state, action) => {
            console.log('Fetching Data.....');
        },
        // fulfilled: trạng thái hoàn thành 
        [getTodosAsync.fulfilled] : (state, action) => {
            console.log('Successfully');
            return action.payload.todos;
        },
        [addTodosAsync.fulfilled] : (state, action) => {
            state.push(action.payload.todo);
        },
        [toggleTodoAsync.fulfilled] : (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled] : (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;