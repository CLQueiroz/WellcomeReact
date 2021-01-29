import React, { useEffect, useState } from 'react';
import Header from './Header';
import nextId from "react-id-generator";

import './Todo.css'
export default function Todo() {
  // const saveditems = localStorage.getItem('tasks');
  // const [task, setTask] = useState(saveditems || []);

  const [task, setTask] = useState([]);
  const [value, setValue] = useState('');
  
  // useEffect(() => {
  //   const newTasks = localStorage.setItem('tasks', JSON.stringify(task))
  //   if(newTasks){
  //     setTask([newTasks]);
  //   }
  // },[task])

  function clearInput(){
    setValue('');
  }

  function handleTaskActive(){
    console.log("clicked")
  }
  
  function handleTaskCompleted(){
    // const newTask = task.filter(item => item.completed === true);
    // setTask(newTask);
    console.log("clicked")
  }

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
              task.map(item => (
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
                    Total: 
                    {
                      task.length
                    }
                  </strong>
                <div className="details-nav">
                  <button className="all">All</button>
                  <button 
                    onClick={handleTaskCompleted}
                    className="complete">Completed</button>
                  <button 
                    onClick={handleTaskActive}
                    className="active"
                  >Active</button>
                </div>
              </div>
          </div>
        </div>
      </>
    );
}
