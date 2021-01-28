import React, { useCallback, useState } from 'react';
import Header from './Header';
import nextId from "react-id-generator";

import './Todo.css'
export default function Todo() {
  const [task, setTask] = useState([]);
  const [value, setValue] = useState('');
  
  const clearInput = useCallback(() => {
    setValue('');
  }, [])

  function handleTask(e){
    e.preventDefault();
    const newTask = {
      id: nextId(),
      text: value,
      completed: false
    }
    if(newTask.text) {
      setTask([...task, newTask]);
    }
    clearInput();
  }

  function deleteTask(id){
    setTask(task.filter(index => index.id !== id));
  }

  function handleChcked(id){
    const newTask = task.filter(item => item.id === id);
    newTask[0].completed = !newTask[0].completed;
    setTask([...task]);
  }

  const handleValues = useCallback(e => {
    const { value } = e.target;
    if(!value) return;
      setValue(value);
   },[]) 

    return (
      <>
        <Header />
        <div className="content"> 
          <form onSubmit={handleTask}>
            <input
              autoFocus
              value={value}
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
                  <input 
                  defaultChecked={item.completed} 
                  type="checkbox" 
                  onClick={e => handleChcked(item.id) }/>
                  <strong className={item.completed ? "completed" : ""}>
                    {item.text}
                  </strong>
                  <button title="deletar" onClick={ e => deleteTask(item.id)}>X</button>
                </li>
              ))
            }
          </div>
        </div>
      </>
    );
}
