import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import '../css/TodoItem.css';

const TodoItem = ({ todo }) => {
  const { id, text, checked } = todo; //{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 체크 안쓸듯
  return (
    <div className="TodoItem">
      <div className={'content ${checked ? "checked" : ""}'}>
        
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default TodoItem;
