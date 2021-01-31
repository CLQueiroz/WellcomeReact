import React, { useState, useMemo } from 'react';
import Header from './Header';
import nextId from "react-id-generator";
import { ToastContainer, toast } from 'react-toastify';


import useLocalStorage from './hooks/useLocalStorage';
import './Todo.css';
import 'react-toastify/dist/ReactToastify.css';
export default function Todo() {

  const [task, setTask] = useLocalStorage('Tasks', []);
  const [value, setValue] = useState();
  const [filter, setFilter] = useState('all');

  const alertToastSuccess = (message) => {
    toast.success(message);
  }
  const alertToastWarn = (message) => {
    toast.warn(message);
  }
  const alertToastError = (message) => {
    toast.error(message)
  }
  const alertToastInfo = (message) => {
    toast.info(message)
  }

  function clearAll(){
    setTask([])
  }
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
      alertToastSuccess('Tarefa Inserida com sucesso !');
    }
    clearInput();
  }

  // deleta a task do array puxando pelo id
  function deleteTask(id){
    try {
      let newTask = task.filter(index => index.id === id);
      if(newTask[0].completed === false){
        alertToastWarn("Task não pode ser deleta, ainda não foi finalizada");
      }else{
        setTask(task.filter(index => index.id !== id));
        alertToastSuccess('Tarefa deletada com sucesso !');      
      }
    } catch (error) {
      alertToastError(error)
    }
  }

  // adiciona o check ao completed da task
  function handleChcked(id){

    try {
      const newTask = task.filter(item => item.id === id);
      newTask[0].completed = !newTask[0].completed;
      setTask([...task]);
      alertToastInfo('Tarefa completa !')
    } catch (error) {
      alertToastError(error)
    }
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
        <ToastContainer 
          autoClose={3000}
          closeOnClick
        />
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
                      filteredTodos.length > 0 && <span>Total {filteredTodos.length}</span>
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
                   {
                    filteredTodos.length > 0 && 
                    <button 
                      onClick={() => clearAll()}
                      className="clear-all"
                    >Clear ALL</button>
                  }
                </div>
              </div>
          </div>
        </div>
      </>
    );
}
