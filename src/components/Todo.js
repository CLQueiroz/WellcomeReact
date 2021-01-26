import React, {useState} from 'react';
import Header from './Header';

import './Todo.css'
export default function Todo() {
  const [value, setValue] = useState();
  const [task, setTask] = useState([]);
  
  

  function handleTask(e){
    e.preventDefault();
    if(value){
      setTask([...task, value]);
    }else{
      alert("Valor obrigatório");
    }
  }

  function deleteTask(item){
    setTask(task.filter(index => index !== item));
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
                <li key={item}>
                  {item}
                  <button title="deletar" onClick={ e => deleteTask(item)}>X</button>
                </li>
              ))
            }
          </div>
        </div>
      </>
    );
}
