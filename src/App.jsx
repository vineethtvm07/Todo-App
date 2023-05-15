import React, { useContext, useEffect, useState } from 'react'
import './App.scss'
import { Header } from './Component/header/Header'
import { Form } from './Component/form/Form'
import { TodoList } from './Component/todoList/TodoList'

//Get data from LocalStorage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
      return [];
  }
}
const App = () => {

  const [inputText, setInputText] = useState("") //Input value//
  const [todosCount, setTodosCount] = useState(1)
  const [todos, setTodos] = useState(getLocalItems()) //Tddos Storage//
  const [status, setStatus] = useState("all") //DropDrown select//
  const [editTodo, setEditTodo] = useState('') //Edit specific Todo//
  const [filteredTodos, setFilteredTodos] = useState([]) //All,Complete,Uncomplete -Filter//
  
  //All Filtered Status Rendering//
  useEffect(() => {
    filteredHandler();
  },[todos,status]);

//Filter Complete , Uncomplete Items//
  const filteredHandler = () => {
    switch (status) {
       case "completed":
        setFilteredTodos(todos.filter((todo )=> todo.Completed === true));
        break;
        case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.Completed === false));
        break; 
        default: setFilteredTodos(todos);
        break; 
    }
  };
    
  //Local Storage//
    useEffect(() => {
      localStorage.setItem('lists', JSON.stringify(todos))
    },[todos]);
  
  return (
    <div className='app-container'>
     <Header />
     <Form inputText={inputText} setInputText={setInputText} 
           todos={todos} setTodos={setTodos} setFilteredTodos={setFilteredTodos}  
           setStatus={setStatus} editTodo={editTodo} setEditTodo={setEditTodo} 
           todosCount={todosCount} setTodosCount={setTodosCount} 
           />
           
      <TodoList todos={todos} setTodos={setTodos} 
               filteredTodos={filteredTodos} 
               setInputText={setInputText} 
               setEditTodo={setEditTodo} editTodo={editTodo}/> 
    </div>
  )
}

export default App
