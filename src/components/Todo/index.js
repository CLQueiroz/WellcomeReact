import React, { useState, useMemo, useEffect } from 'react';
import Header from '../Header';
import { ToastContainer } from 'react-toastify';
import api from '../../services/api';
import { alertToastWarn, alertToastSuccess, alertToastError } from '../alerts/ToastAlert'

import './Todo.css';
import 'react-toastify/dist/ReactToastify.css';
export default function Todo() {

  const [task, setTask] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState('all'); 
  const [reset, setReset] = useState(true);


  // Refeito lógica para buscar dados da API
  useEffect(() => {
      api
        .get("/tasks")
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => {
          alertToastError("Ocorreu um erro ao buscar os items");
        });
    }, [reset]);


  function clearAll() {
    setTask([])
  }

  // filstrar as tasks para as actions
  const filteredTodos = useMemo(() => {
    if (filter === 'all') {
      return task
    } else if (filter === 'completed') {
      return task.filter(item => item.completed)
    } else if (filter === 'not_completed') {
      return task.filter(item => !item.completed)
    }
  }, [task, filter])

  // clear input
  function clearInput() {
    setValue('');
  }

  // adiciona task ao array de task
  async function handleTask(e) {
    e.preventDefault();
    const newTask = {
      task: value,
    }
    if (newTask.task) {
      await api.post('/tasks', newTask);
      setReset(!reset);
      alertToastSuccess('😀 Task Inserida com sucesso!');
      clearInput();
    } else {
      alertToastWarn("✋ Task não preenchida, obrigatório!")
    }
  }

  // deleta a task do array puxando pelo id
  async function deleteTask(id) {
    try {
      let newTask = await task.filter(index => index._id === id);
      if (newTask[0].completed === false) {
        alertToastWarn("😕 Task não pode ser deleta, ainda não foi finalizada!");
        return;
      }
      await api.delete(`/tasks/${id}`)
      setReset(!reset);
      alertToastSuccess('😀 Task deletada com sucesso!');
    } catch (error) {
      alertToastError('Internal Error Server"');
    }
  }

  // adiciona o check ao completed da task
  async function handleChcked(id) {
    const taskId = await task.filter(item => item._id === id);
    if (taskId[0].completed) {
      alertToastWarn("Tarefa finalizada não pode ser reativada");
      return
    }
    const newTask = !task.completed;
    try {
      await api.patch(`/tasks/${id}`, {
        completed: newTask
      })
      setReset(!reset);
      alertToastSuccess("Tarefa completa com sucesso");
    } catch (error) {
      alertToastError("Internal Error Server")
    }

  }

  // grava no value o valor digitado do input
  function handleValues(e) {
    const { value } = e.target;
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
              <li key={item._id}>
                <input
                  type="checkbox"
                  onChange={e => handleChcked(item._id)}
                  defaultChecked={false}
                  checked={item.completed}
                />
                <strong
                  key={item.id}
                  className={item.completed ? "completed" : ""}>
                    {item.task}
                </strong>
                <button title="deletar" onClick={e => deleteTask(item._id)}>X</button>
              </li>
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
