import React from 'react';
import TodoItem from './TodoItem';
import '../css/TodoList.css';
//(todos.length === 0) && 
const Todolist = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos && todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default Todolist;
