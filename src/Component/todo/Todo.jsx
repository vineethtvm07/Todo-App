import { useContext, useState } from 'react';
import './todo.scss'

export default function Todo({ text, todo, todos, setTodos,editTodo, setEditTodo}) {

    
    //Delete each todo//
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id))
  };

   //Complete & Line-through Todo//
  const completeHandler = () => {
    setTodos(todos.map(item => {
      if(item.id === todo.id) {
        return {
          ...item, Completed: !item.Completed
        }
      }
      return item;
    }))
  };

  return (
    <div className='todo'>
        <div className="todo-box">
      <li onClick={completeHandler} className={`todo-item ${todo.Completed ? 'todo-line-through' : ""}`}> {text} </li>
      </div>
      {
        editTodo && editTodo ? (
          <div className="buttons"></div>
        ) : (
          <div className="buttons">
      <button onClick={()=>setEditTodo({id:todo.id,
      text:todo.text,
      Complete:todo.Complete ? true : false
      })} 
      className='edit-btn'> <i className="fa-regular fa-pen-to-square"></i> </button>
      <button onClick={deleteHandler}className='trash-btn' > <i className="fa-solid fa-trash-can"></i> </button>  
      </div>
        )
      }
      
    </div>
  )
}
