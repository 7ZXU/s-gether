import React from 'react';
import TodoItem from './TodoItem';
import '../css/TodoList.css';

const Todolist = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default Todolist;
