import React, { useState, useCallback, useMemo } from 'react';
import Header from './Header';
import nextId from "react-id-generator";

import useLocalStorage from './hooks/useLocalStorage'
import './Todo.css'
export default function Todo() {

  const [task, setTask] = useLocalStorage('Tasks', []);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    if(filter === 'all'){
      return task
    }else if(filter === 'completed'){
      return task.filter(item => item.completed)
    }else if(filter === 'not_completed'){
      return task.filter(item => !item.completed)
    }
  },[task, filter])
  // clear input
  function clearInput(){
    setValue('');
  }
  
  // adiciona task ao array de task
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

  // deleta a task do array puxando pelo id
  function deleteTask(id){
    setTask(task.filter(index => index.id !== id));
  }

  // adiciona o check ao completed da task
  function handleChcked(id){
    const newTask = task.filter(item => item.id === id);
    newTask[0].completed = !newTask[0].completed;
    setTask([...task]);
  }

  // grava no value o valor digitado do input
  function handleValues (e) {
    const { value } = e.target;
    if(!value) return;
      setValue(value);
   }

    return (
      <>
        <Header />
        <div className="content"> 
          <form onSubmit={handleTask}>
            <input
              autoFocus
              autoComplete="off"
              onChange={handleValues}
              value={value}
              name="task"
              type="text"
              placeholder="task..."
            />
          </form>
          <div className="itens">
            {
              filteredTodos.map(item => (
                <>
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
                </>
              ))
            }
              <hr />
              <div className="details">
                  <strong>
                    {
                      task.length > 0 && <span>Total {task.length}</span>
                    }
                  </strong>
                <div className="details-nav">
                  <button 
                    onClick={() => setFilter("all")}
                    className="all"
                  >All</button>
                  <button 
                    onClick={() => setFilter("completed")}
                    className="complete">Completed</button>
                  <button 
                    onClick={() => setFilter("not_completed")}
                    className="active"
                  >Active</button>
                </div>
              </div>
          </div>
        </div>
      </>
    );
}
