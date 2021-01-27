import React, {useState} from 'react';
import Header from './Header';
import nextId from "react-id-generator";

import './Todo.css'
export default function Todo() {
  const [value, setValue] = useState();
  const [task, setTask] = useState([]);
  
  function handleTask(e){
    e.preventDefault();
    const newTask = {
      id: nextId(),
      text: value,
      completed: false 
    }
    if(newTask){
      setTask([...task, newTask]);
    }else{
      alert("Valor obrigatório");
    }
  }

  function deleteTask(id){
    setTask(task.filter(index => index.id !== id));
  }

  function handleValues(e) {
    const { name, value } = e.target;
    if (value) {
      setValue(value);
      return;
    }
  }

    return (
      <>
        <Header />
        <div className="content"> 
          <form onSubmit={handleTask}>
            <input
             autoComplete="off"
              onChange={handleValues}
              name="task"
              type="text"
              placeholder="Write your task"
            />
          </form>
          <div className="itens">
            {
              task.map(item => (
                <li key={item.id}>
                  <input type="checkbox" name="" id=""/>
                  {item.text}
                  <button title="deletar" onClick={ e => deleteTask(item.id)}>X</button>
                </li>
              ))
            }
          </div>
        </div>
      </>
    );
}
